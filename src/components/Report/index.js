import { Flex } from "@chakra-ui/react";
import customColors from "../../themes/customColors";
import ReportChart from "./detail/ReportChart";
import ReportFilter from "./detail/ReportFilter";
import ReportTransactions from "./detail/ReportTransactions";
import { getTransactions } from "../../api/transaction";
import { useEffect, useState } from "react";

const mainOptions = {
    fontFamily: "Fira Code",
    fontWeight: "semibold",
    color: customColors.textPrimary,
    direction: "column",
    gap: 4,
    w: "calc(100vw - 250px)",
};

function Report() {
    const [reports, setReports] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    async function fetchTransaction() {
        if (startDate <= endDate) {
            const queries = {
                start_date: startDate,
                end_date: endDate,
            };
            const { data } = await getTransactions(queries);
            setReports(data);
        }
    }

    useEffect(() => {
        fetchTransaction();
    }, [startDate, endDate]);

    return (
        <Flex {...mainOptions}>
            <ReportChart startDate={startDate} endDate={endDate} />
            <ReportFilter setStartDate={setStartDate} setEndDate={setEndDate} />
            <ReportTransactions reports={reports} />
        </Flex>
    );
}

export default Report;
