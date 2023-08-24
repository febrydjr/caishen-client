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
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const AddCashierModal = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(8),
  });

  const toast = useToast();
  const handleSubmit = async (values) => {
    try {
      await axios.post("https://caishen-server-production.up.railway.app/api/auth/register", {
        name: values.name,
        username: values.username,
        password: "Password123@",
        email: values.email,
        phone: values.phone,
      });
      toast({
        title: "Add Cashier successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Addding Cashier!",
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
          <Text fontFamily={"Fira Code"} fontSize={"2xl"} fontWeight={700}>
            Add Cashier
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ name: "", username: "", email: "", phone: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <ModalBody>
                <Text
                  fontSize={"sm"}
                  mb={4}
                  fontWeight={500}
                  color={"gray.600"}
                >
                  Enter Cashier Detail!
                </Text>
                <Field
                  mb={2}
                  as={Input}
                  type="text"
                  name="name"
                  rounded={"lg"}
                  placeholder="Enter Cashier Name"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                />
                <Field
                  mb={2}
                  as={Input}
                  type="text"
                  name="username"
                  rounded={"lg"}
                  placeholder="Enter Cashier Username"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                />
                <Field
                  mb={2}
                  as={Input}
                  type="text"
                  name="email"
                  rounded={"lg"}
                  placeholder="Enter Cashier Email"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                />
                <Field
                  mb={2}
                  as={Input}
                  type="text"
                  name="phone"
                  rounded={"lg"}
                  placeholder="Enter Cashier Phone"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                />
              </ModalBody>
              <ModalFooter>
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

export default AddCashierModal;
