import { Divider, Flex, HStack, Text } from "@chakra-ui/react";
import CartCards from "./CartCards";
import { getCartItems } from "../../../api/cart";
import { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import ResetButton from "./ResetButton";

const options = {
    direction: "column",
    gap: 3,
    overflowY: "scoll",
    css: {
        "&::-webkit-scrollbar": { display: "none" },
    },
};

const textOptions = {
    fontSize: "1.2em",
    alignItems: "center",
};

function Cart({ updateCarts, setUpdateCarts }) {
    const [carts, setCarts] = useState([]);

    async function fetchCarts() {
        const { data } = await getCartItems();
        setCarts(data);
    }

    useEffect(() => {
        fetchCarts();
    }, [updateCarts]);

    return (
        <>
            <HStack {...textOptions}>
                <TiShoppingCart size={"1.4rem"} />
                <Text>Carts</Text>
                <Divider />
                <ResetButton setUpdateCarts={setUpdateCarts}/>
            </HStack>
            <Flex {...options}>
                <CartCards carts={carts} setUpdateCarts={setUpdateCarts} />
            </Flex>
        </>
    );
}

export default Cart;
