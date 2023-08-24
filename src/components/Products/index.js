import { Divider, Grid, HStack, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../api/product";
import ProductCards from "./detail/ProductCards";
import Filter from "./detail/Filter";
import customColors from "../../themes/customColors";

const fontOptions = {
    color: customColors.textPrimary,
    fontFamily: "Fira Code",
    fontWeight: "semibold",
};

const options = {
    w: "fit-content",
    maxW: "100%",
    gap: 4,
    autoFlow: "column",
    templateRows: "repeat(2, 1fr)",
    overflowX: "scroll",
    css: {
        "&::-webkit-scrollbar": { display: "none" },
    },
};

const titleOptions = {
    fontSize: "1.2em",
};

function Products({
    category = 0,
    page = 0,
    title = "",
    completedOrder,
    updateProduct,
    setPage,
    setUpdateCarts,
    setUpdateProduct,
    isEdit = false,
}) {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState("ASC");
    const [filter, setFilter] = useState("name");
    const [maxPage, setMaxPage] = useState(1);

    const productsRef = useRef();

    function onProductsScroll() {
        function checkAxisX() {
            const { scrollLeft, scrollWidth, clientWidth } =
                productsRef.current;
            return scrollLeft + clientWidth === scrollWidth && page < maxPage;
        }

        if (productsRef.current) {
            if (checkAxisX()) setPage(page + 1);
        }
    }

    async function fetchProducts() {
        const queries = {
            title,
            order_by: filter,
            order,
            page,
        };
        if (category !== 0) queries["id_category"] = category;
        const { data } = await getProducts(queries);
        setMaxPage(data["pages"]);
        setProducts(
            page <= 1 ? data["products"] : [...products, ...data["products"]]
        );
        onProductsScroll();
    }

    useEffect(() => {
        fetchProducts();
    }, [title, category, filter, order, page, completedOrder, updateProduct]);

    return (
        <>
            <HStack {...fontOptions}>
                <Text {...titleOptions}>Products</Text>
                <Divider />
                <Filter
                    order={order}
                    setOrder={setOrder}
                    setFilter={setFilter}
                    setPage={setPage}
                />
            </HStack>
            <Grid
                id="container-product"
                {...options}
                {...fontOptions}
                onScroll={onProductsScroll}
                ref={productsRef}
            >
                <ProductCards
                    products={products}
                    setUpdateCarts={setUpdateCarts}
                    setUpdateProduct={setUpdateProduct}
                    setPage={setPage}
                    isEdit={isEdit}
                />
            </Grid>
        </>
    );
}

export default Products;
