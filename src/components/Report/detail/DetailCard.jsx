import { Divider, Flex, Spacer, Text } from "@chakra-ui/react";

const detailOptions = {
    direction: "column",
    mt: 2,
    gap: 2,
};

const productOptions = {
    gap: 2,
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

function DetailCard({ transaction_items }) {
    return (
        <Flex {...detailOptions}>
            {/* ProductImage ProductName ProductQty ProductPrice */}
            <Divider />
            {transaction_items.map((transaction, index) => (
                <Flex {...productOptions} key={index}>
                    <Text>{transaction["qty"]}</Text>
                    <Text>{transaction["product"]["name"]}</Text>
                    <Spacer/>
                    <Text>{priceFormater(transaction["qty"] * transaction["price"])}</Text>
                </Flex>
            ))}
        </Flex>
    );
}

export default DetailCard;
