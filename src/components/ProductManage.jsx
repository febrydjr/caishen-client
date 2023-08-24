import { Box, Flex, Link, useDisclosure } from "@chakra-ui/react";
import Products from "./Products";
import { BiAddToQueue } from "react-icons/bi";
import AddProductModal from "../components/Products/detail/AddProductModal";
import Categories from "./Categories";
import { useState } from "react";

function ProductManage({ searchQuery = "" }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [page, setPage] = useState(0);
    const [category, setCategory] = useState(0);
    const [updateProduct, setUpdateProduct] = useState("");

    return (
        <Flex w={"100%"}>
            <Flex direction={"column"} gap={4} w={"100%"}>
                <Categories setCategory={setCategory} setPage={setPage} />
                <Products
                    isEdit={true}
                    category={category}
                    page={page}
                    title={searchQuery}
                    setPage={setPage}
                    updateProduct={updateProduct}
                    setUpdateProduct={setUpdateProduct}
                />
            </Flex>
            <Link
                onClick={() => {
                    onOpen();
                }}
            >
                <Flex
                    position={"fixed"}
                    _hover={{ cursor: "pointer", bgColor: "#FAC1D9" }}
                    zIndex={60000}
                    bottom={8}
                    right={8}
                    p={[4, 6]}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"full"}
                    w={["9%", "7%", "5%"]}
                    bgColor={"#FFFFFF"}
                >
                    <BiAddToQueue size={["25px", "30px"]} />
                </Flex>
            </Link>
            <AddProductModal
                isOpen={isOpen}
                onClose={onClose}
                setUpdateProduct={setUpdateProduct}
            />
        </Flex>
    );
}

export default ProductManage;
