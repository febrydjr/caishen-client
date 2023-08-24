import { Flex, Spacer, Text } from "@chakra-ui/react";
import customColors from "../../../themes/customColors";
import { getCartTotal } from "../../../api/cart";
import { useEffect, useState } from "react";
import CheckoutButton from "./CheckoutButton";

const mainOptions = {
    bgColor: customColors.secondary,
    direction: "column",
    borderRadius: "8px",
    gap: 4,
    flexGrow: 1,
    flexBasis: "fit-content",
    p: "12px",
};

const textOptions = {
    fontSize: "1.2em",
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

function Checkout({ updateCarts, setUpdateCarts, setCompletedOrder }) {

    const [total, setTotal] = useState(0);

    async function getTotal() {
        const { data } = await getCartTotal();
        setTotal(data["total"]);
    }

    useEffect(() => {
        getTotal();
    }, [updateCarts]);

    return (
        <Flex {...mainOptions}>
            <Flex {...textOptions}>
                <Text>Total</Text>
                <Spacer />
                <Text>{priceFormater(total)}</Text>
            </Flex>
            <Spacer />
            <CheckoutButton setUpdateCarts={setUpdateCarts} total={total} setCompletedOrder={setCompletedOrder}/>
        </Flex>
    );
}

export default Checkout;
