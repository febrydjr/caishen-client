import React, { useState, useEffect } from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Flex,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { addTransaction } from "../../../api/transaction";
import Notification from "../../../api/Notification";

function priceFormater(price) {
    let formatted = "";
    price = String(price);
    while (price.length > 0) {
        formatted = price.slice(-3) + formatted;
        if (price.length > 3) formatted = "." + formatted;
        price = price.slice(0, -3);
    }
    return formatted;
}

const CheckoutModal = ({
    isOpen,
    onClose,
    setUpdateCarts,
    setCompletedOrder,
    total,
}) => {
    const toast = useToast();
    const [money, setMoney] = useState("");
    const [change, setChange] = useState(total);

    const handleChange = (event) => {
        setMoney(Number(event.target.value));
    };

    useEffect(() => {
        setChange(money - total);
    }, [money]);

    const handleSubmit = async () => {
        if (money >= total) {
            await addTransaction(toast);
            setUpdateCarts(uuidv4());
            setCompletedOrder(uuidv4());
        } else {
            Notification(toast, {
                title: "Uang kurang",
                status: 400,
            });
        }
    };

    function handleClose() {
        setChange(0);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent fontFamily={"Fira Code"}>
                <ModalHeader>Checkout!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        justifyContent={"center"}
                        direction={"column"}
                        alignItems={"flex-end"}
                    >
                        <Text mb={1} alignSelf={"left"}>
                            Total: {priceFormater(total)}
                        </Text>
                        <Input
                            id="customer-money"
                            type="number"
                            placeholder="Input Customer Money"
                            onChange={handleChange}
                        />
                        <Text alignSelf={"center"} mt={4}>
                            Change:
                        </Text>
                        <Text alignSelf={"center"} fontSize={"40px"}>
                            {!change || change < 0 ? 0 : priceFormater(change)}
                        </Text>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} variant="outline">
                        Cancel
                    </Button>
                    <Button
                        _hover={{ color: "black", bgColor: "gray.100" }}
                        bgColor={"green"}
                        color={"white"}
                        ml={3}
                        onClick={handleSubmit}
                    >
                        Checkout
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CheckoutModal;
