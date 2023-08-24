import { Divider, Grid, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CategoryCards from "./detail/CategoryCards";
import { getCategories } from "../../api/product";
import customColors from "../../themes/customColors";

const fontOptions = {
    color: customColors.textPrimary,
    fontFamily: "Fira Code",
    fontWeight: "semibold",
}

const options = {
    w: "fit-content",
    maxW: "full",
    gap: 4,
    overflowX: "scroll",
    css: {
        "&::-webkit-scrollbar": { display: "none" },
    },
};

const titleOptions = {
    fontSize: "1.2em",
};

function setOptions(editCategory) {
    if (editCategory) options["templateColumns"] = "repeat(6, 1fr)";
    else options["templateRows"] = "repeat(2, 1fr)";
    options["autoFlow"] = editCategory ? "row" : "column";
}

function Categories({ isEdit = false, setCategory, setPage, updateCategory, setUpdateCategory }) {
    const [categories, setCategories] = useState([{ id: 0, name: "All" }]);

    async function fetchCategories() {
        const { data } = await getCategories();
        setCategories(isEdit ? data : [...categories, ...data]);
    }

    setOptions(isEdit);

    useEffect(() => {
        fetchCategories(setCategories);
    }, [updateCategory]);

    return (
        <>
            <HStack>
                <Text {...titleOptions} {...fontOptions}>Categories</Text>
                <Divider />
            </HStack>
            <Grid {...options} {...fontOptions}>
                <CategoryCards
                    categories={categories}
                    setCategory={setCategory}
                    setPage={setPage}
                    isEdit={isEdit}
                    setUpdateCategory={setUpdateCategory}
                />
            </Grid>
        </>
    );
}

export default Categories;
