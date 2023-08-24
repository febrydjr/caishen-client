import { Flex, Input, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const containerOptions = {
    direction: "row",
    alignItems: "center",
    gap: 4,
};

function defaultDate(end=false) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = end ? now.getDate() : 1;
    return `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
    }`;
}

function ReportFilter({ setStartDate, setEndDate }) {
    function setDefault() {
        const start = defaultDate();
        const end = defaultDate(true)
        document.getElementById("start_date").value = start;
        document.getElementById("end_date").value = end;
        setStartDate(start);
        setEndDate(end);
    }

    function handleChange(event, setDate) {
        const { value } = event.target;
        setDate(value);
    }

    useEffect(() => {
        setDefault();
    }, []);

    return (
        <Flex {...containerOptions}>
            <Input
                id="start_date"
                type="date"
                onChange={(event) => handleChange(event, setStartDate)}
            />
            <Text>-</Text>
            <Input
                id="end_date"
                type="date"
                onChange={(event) => handleChange(event, setEndDate)}
            />
        </Flex>
    );
}

export default ReportFilter;
