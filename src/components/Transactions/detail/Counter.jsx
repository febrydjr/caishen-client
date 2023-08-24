import { Flex, Text, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import customColors from "../../../themes/customColors";
import { editCartItem } from "../../../api/cart";

const mainOptions = {
    gap: 1,
};

const counterOptions = {
    bgColor: customColors.textSecondary,
    color: customColors.primary,
    minW: "2em",
    w: "fit-content",
    h: "2em",
    borderRadius: "8px",
    alignItems: "center",
    justifyContent: "center",
    fontSize: {
        md: "1em",
        lg: "0.8em",
    },
};

const changeColor = {
    color: customColors.textPrimary,
    fontWeight: "bold",
    cursor: "pointer",
};

function Counter({ cart, counter = 1, setUpdateCarts }) {
    const toast = useToast()

    async function handleCounter(event, isAdd) {
        event.stopPropagation();
        const qty = counter + (isAdd ? 1 : -1);
        await editCartItem(toast, cart["id"], cart["product"]["id"], qty);
        setUpdateCarts(uuidv4());
    }

    return (
        <Flex {...mainOptions}>
            <Flex
                {...counterOptions}
                {...changeColor}
                bgColor={customColors.warning}
                onClick={(event) => handleCounter(event, false)}
            >
                <Text>-</Text>
            </Flex>
            <Flex {...counterOptions}>
                <Text>{counter}</Text>
            </Flex>
            <Flex
                {...counterOptions}
                {...changeColor}
                bgColor={"green"}
                onClick={(event) => handleCounter(event, true)}
            >
                <Text>+</Text>
            </Flex>
        </Flex>
    );
}

export default Counter;
