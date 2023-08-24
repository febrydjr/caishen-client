import { Flex, Text, useToast } from "@chakra-ui/react";
import { resetCart } from "../../../api/cart";
import { v4 as uuidv4 } from "uuid";
import customColors from "../../../themes/customColors";

const resetOptions = {
    bgColor: customColors.warning,
    px: "8px",
    py: "2px",
    borderRadius: "8px",
    fontSize: "0.8em",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
};

function ResetButton({ setUpdateCarts }) {
    const toast = useToast();

    async function onReset() {
        await resetCart(toast);
        setUpdateCarts(uuidv4());
    }

    return (
        <Flex {...resetOptions} onClick={onReset}>
            <Text>Reset</Text>
        </Flex>
    );
}

export default ResetButton;
