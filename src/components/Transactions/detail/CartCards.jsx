import { Flex, Text } from "@chakra-ui/react";
import { BiGame } from "react-icons/bi";
import CartCard from "./CartCard";

const noItemOptions = {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
};

function CartCards({ carts, setUpdateCarts }) {
    if (carts.length === 0)
        return (
            <Flex {...noItemOptions}>
                <BiGame size={"1.6em"} />
                <Text>No Item Selected</Text>
            </Flex>
        );
    return carts.map((cart, index) => (
        <CartCard cart={cart} setUpdateCarts={setUpdateCarts} key={index} />
    ));
}

export default CartCards;
