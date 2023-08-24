import React, { useState, useEffect } from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Select,
    Flex,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { FaCheck, FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import {
    activeProduct,
    deleteProduct,
    getCategories,
} from "../../../api/product";
import { v4 as uuidv4 } from "uuid";

const EditProductModal = ({
    isOpen,
    onClose,
    product,
    setUpdateProduct,
    setPage,
}) => {
    const toast = useToast();
    const [category, setCategory] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const fetchData = async () => {
        try {
            const { data } = await getCategories();
            setCategory(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteProduct(product["id"]);
            toast({
                title: "Product deleted!",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            setUpdateProduct(uuidv4());
            setPage(1);
            onClose();
        } catch (error) {
            toast({
                title: "Error deleting user!",
                description: error.response.data.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const handleActivate = async () => {
        try {
            await activeProduct(product["id"]);
            toast({
                title: "Product Activated!",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            setUpdateProduct(uuidv4());
            setPage(1);
            onClose();
            if (selectedImage) window.location.reload();
        } catch (error) {
            toast({
                title: "Error activating user!",
                description: error.response.data.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("stock", values.stock);
            formData.append("image", selectedImage);
            formData.append("id_categories", values.category);

            await axios.patch(
                `http://localhost:8000/api/products/${product.id}`,
                formData
            );
            toast({
                title: "Successfully Edit Product!",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            setUpdateProduct(uuidv4());
            setPage(1);
            onClose();
        } catch (error) {
            toast({
                title: "Error editing Product!",
                description: error.response.data,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text
                        fontFamily={"Fira Code"}
                        fontSize={"2xl"}
                        fontWeight={700}
                    >
                        Edit Product
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={{
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        category: "",
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string(),
                        description: Yup.string(),
                        price: Yup.number(),
                        stock: Yup.number(),
                        category: Yup.string(),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <ModalBody>
                                <Text
                                    fontSize={"sm"}
                                    mb={4}
                                    fontWeight={500}
                                    color={"gray.600"}
                                >
                                    Enter Product Detail!
                                </Text>
                                <Field
                                    mb={2}
                                    as={Input}
                                    type="text"
                                    name="name"
                                    rounded={"lg"}
                                    placeholder="Enter Product Name"
                                    _placeholder={{
                                        fontSize: "sm",
                                        color: "gray.400",
                                    }}
                                />
                                <Field
                                    mb={2}
                                    as={Input}
                                    type="text"
                                    name="description"
                                    rounded={"lg"}
                                    placeholder="Enter Product Description"
                                    _placeholder={{
                                        fontSize: "sm",
                                        color: "gray.400",
                                    }}
                                />
                                <Field
                                    mb={2}
                                    as={Input}
                                    type="number"
                                    name="price"
                                    rounded={"lg"}
                                    placeholder="Enter Product Price"
                                    _placeholder={{
                                        fontSize: "sm",
                                        color: "gray.400",
                                    }}
                                />
                                <Field
                                    mb={2}
                                    as={Input}
                                    type="number"
                                    name="stock"
                                    rounded={"lg"}
                                    placeholder="Enter Product Stock"
                                    _placeholder={{
                                        fontSize: "sm",
                                        color: "gray.400",
                                    }}
                                />
                                <Field
                                    mb={2}
                                    as={Input}
                                    onChange={(e) => handleImageUpload(e)}
                                    type="file"
                                    name="image"
                                    rounded={"lg"}
                                    accept="image/*"
                                    _placeholder={{
                                        fontSize: "sm",
                                        color: "gray.400",
                                    }}
                                />
                                <Field
                                    mb={2}
                                    as={Select}
                                    name="category"
                                    rounded={"lg"}
                                    placeholder="Select Category"
                                    _placeholder={{
                                        fontSize: "sm",
                                        color: "gray.400",
                                    }}
                                    onChange={(event) => {
                                        setFieldValue(
                                            "category",
                                            event.target.value
                                        );
                                    }}
                                >
                                    {category.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Field>
                            </ModalBody>
                            <ModalFooter>
                                {product.is_active ? (
                                    <Flex
                                        p={2}
                                        bg={"red"}
                                        mr={2}
                                        color={"white"}
                                        borderRadius={8}
                                        alignItems="center"
                                        justifyContent={"space-between"}
                                        borderLeft={"1px"}
                                        cursor="pointer"
                                        onClick={() => handleDelete()}
                                    >
                                        <FaTimes fontSize={"25px"} />
                                    </Flex>
                                ) : (
                                    <Flex
                                        p={2}
                                        bg={"green"}
                                        mr={2}
                                        color={"white"}
                                        borderRadius={8}
                                        alignItems="center"
                                        justifyContent={"space-between"}
                                        borderLeft={"1px"}
                                        cursor="pointer"
                                        onClick={() => handleActivate()}
                                    >
                                        <FaCheck fontSize={"25px"} />
                                    </Flex>
                                )}
                                <Button
                                    type="submit"
                                    display={"flex"}
                                    justifyContent={"center"}
                                    w={"100%"}
                                    rounded={"lg"}
                                    color={"white"}
                                    _hover={{ bg: "green" }}
                                    bg={"#2A2B2E"}
                                >
                                    Submit Data
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};

export default EditProductModal;
