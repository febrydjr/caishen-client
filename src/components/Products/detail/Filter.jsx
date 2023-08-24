import { Flex } from "@chakra-ui/react";
import FilterSelection from "./FilterSelection";
import customColors from "../../../themes/customColors";
import { BsFilterRight } from "react-icons/bs";
import FilterOrder from "./FilterOrder";

const options = {
    color: customColors.textPrimary,
    fontFamily: "Fira Code",
    fontWeight: "semibold",
    gap: 2,
    alignItems: "center",
};

function Filter({ order, setOrder, setFilter, setPage }) {
    return (
        <Flex {...options}>
            <BsFilterRight size={"28px"} />
            <FilterSelection setFilter={setFilter} setPage={setPage} />
            <FilterOrder order={order} setOrder={setOrder} setPage={setPage} />
        </Flex>
    );
}

export default Filter;
