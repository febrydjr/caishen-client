import { Collapse, Flex, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import customColors from "../../../themes/customColors";
import DetailCard from "./DetailCard";

const reportOptions = {
    direction: "column",
    color: customColors.textPrimary,
    bgColor: customColors.primary,
    borderRadius: "8px",
    border: "1px",
    borderColor: customColors.textSecondary,
    w: "full",
    px: "12px",
    py: "8px",
};

const baseOptions = {
    direction: "row",
    gap: 2,
    alignItems: "center",
};

const usernameOptions = {
    fontSize: "0.8em",
    color: customColors.textSecondary,
};

const detailOptions = {};

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

function dateFormater(date) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    date = new Date(date);
    return date.toLocaleDateString("en-GB", options);
}

function ReportCard({ report }) {
    const { isOpen, onToggle } = useDisclosure();
    const { user, transaction_items } = report;
    return (
        <Flex {...reportOptions}>
            <Flex {...baseOptions}>
                <Flex direction={"column"}>
                    <Text>{dateFormater(report["date"])}</Text>
                    <Text {...usernameOptions}>{user["username"]}</Text>
                </Flex>
                <Spacer />
                <Text>{priceFormater(report["total_price"])}</Text>
                <Text
                    cursor={"pointer"}
                    onClick={() => onToggle()}
                >
                    {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </Text>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <DetailCard transaction_items={transaction_items} />
            </Collapse>
        </Flex>
    );
}

export default ReportCard;
