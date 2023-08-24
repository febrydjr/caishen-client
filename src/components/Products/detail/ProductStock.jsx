import { Flex, Text } from "@chakra-ui/react";
import customColors from "../../../themes/customColors";

function options(stock) {
    return {
        bgColor: stock > 0 ? customColors.textSecondary : customColors.warning,
        color: stock > 0 ? customColors.primary : customColors.textPrimary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        w: "fit-content",
        minW: "24px",
        px: "4px",
        py: "2px",
        pos: "absolute",
        top: "4px",
        right: "4px",
    };
}

function ProductStock({ stock }) {
    return (
        <Flex opacity={"80%"}{...options(stock)}>
            <Text opacity={"100%"}>{stock}</Text>
        </Flex>
    );
}

export default ProductStock;
