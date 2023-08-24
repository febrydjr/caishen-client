import { Flex, Image, Spacer, Text, useToast } from "@chakra-ui/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import customColors from "../../../themes/customColors";
import Counter from "./Counter";
import { deleteCartItem } from "../../../api/cart";
import { v4 as uuidv4 } from "uuid";
import getImage from "../../../api/getImage";
import { useState } from "react";

const mainOptions = {
    w: "full",
    bgColor: customColors.secondary,
    borderRadius: "8px",
    overflow: "hidden",
};

const containerOptions = {
    alignItems: "center",
    px: "12px",
    w: "full",
    gap: 3,
    cursor: "pointer",
};

const logoOptions = {
    bgColor: customColors.warning,
    alignItems: "center",
    justifyContent: "center",
    p: "16px",
    h: "full",
    cursor: "pointer",
};

const imageOptions = {
    w: "64px",
    h: "64px",
    my: "4px",
    objectFit: "cover",
    borderRadius: "8px",
};

const titleOptions = {
    noOfLines: 1,
    textOverflow: "ellipsis",
    display: {
        base: "none",
        lg: "block",
    },
};

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

function CartCards({ cart, setUpdateCarts }) {
    const [deleteToggle, setDeleteToggle] = useState(false);
    const toast = useToast();

    async function deleteItem(id_cart) {
        await deleteCartItem(toast, id_cart);
        setTimeout(() => {
            // setDeleteToggle(false)
            setUpdateCarts(uuidv4());
        }, 300);
    }

    return (
        <Flex {...mainOptions}>
            {deleteToggle && (
                <Flex {...logoOptions} onClick={() => deleteItem(cart["id"])}>
                    <RiDeleteBin5Fill />
                </Flex>
            )}
            <Flex
                {...containerOptions}
                onClick={() => setDeleteToggle(!deleteToggle)}
            >
                <Image
                    {...imageOptions}
                    src={getImage(cart["product"]["image"])}
                />
                <Text {...titleOptions}>{cart["product"]["name"]}</Text>
                <Spacer />
                <Text>
                    {priceFormater(cart["qty"] * cart["product"]["price"])}
                </Text>
                <Counter
                    cart={cart}
                    counter={cart["qty"]}
                    setUpdateCarts={setUpdateCarts}
                />
            </Flex>
        </Flex>
    );
}

export default CartCards;
