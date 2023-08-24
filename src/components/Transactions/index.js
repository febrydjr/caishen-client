import { Flex } from "@chakra-ui/react";
import Cart from "./detail/Cart";
import Checkout from "./detail/Checkout";
import customColors from "../../themes/customColors";

const fontOptions = {
    color: customColors.textPrimary,
    fontFamily: "Fira Code",
    fontWeight: "semibold",
};

const containerOptions = {
    flexGrow: 1,
    direction: "column",
    gap: 4,
};

function Transactions({ updateCarts, setUpdateCarts, setCompletedOrder }) {
    return (
        <Flex {...containerOptions} {...fontOptions}>
            <Cart updateCarts={updateCarts} setUpdateCarts={setUpdateCarts} />
            <Checkout updateCarts={updateCarts} setUpdateCarts={setUpdateCarts} setCompletedOrder={setCompletedOrder}/>
        </Flex>
    );
}

export default Transactions;
