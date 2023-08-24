import { Flex } from "@chakra-ui/react";
import ReportCards from "./ReportCards";

const containerOptions = {
    direction: "column",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center"
};

function ReportTransactions({ reports }) {
    return (
        <Flex {...containerOptions}>
            <ReportCards reports={reports} />
        </Flex>
    );
}

export default ReportTransactions;
