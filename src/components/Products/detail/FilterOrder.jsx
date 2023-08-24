import { BsSortAlphaDownAlt, BsSortAlphaUp } from "react-icons/bs";

const options = {
    size: "24px",
    cursor: "pointer",
};

function FilterOrder({ order, setOrder, setPage }) {

    function handleChange(orderChange){
        setOrder(orderChange)
        setPage(0);
    }

    if (order === "ASC") return <BsSortAlphaUp {...options} onClick={() => handleChange("DESC")} />;
    return <BsSortAlphaDownAlt {...options} onClick={() => handleChange("ASC")} />;
}

export default FilterOrder;
