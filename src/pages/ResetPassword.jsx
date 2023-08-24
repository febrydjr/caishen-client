import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.patch("https://caishen-server-production.up.railway.app/api/auth/reset", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Password reset successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Password reset failed.",
        description: "An error occurred while resetting your password.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bgColor={"#2e2e2e"} h={"100vh"}>
      <Box
        fontFamily={"Fira Code"}
        m={"auto"}
        width={"35%"}
        mb={10}
        py={4}
        bgColor={"#2e2e2e"}
      >
        <Box
          borderRadius={10}
          w={"500px"}
          bgColor={"white"}
          mt={32}
          px={6}
          py={6}
          boxShadow={"lg"}
        >
          <Heading fontFamily={"Fira Code"} as="h1" size="xl" mb={8}>
            Reset Password
          </Heading>
          <Formik
            initialValues={{
              password: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .matches(
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/,
                  "Password must contain at least 8 characters, one symbol, one uppercase letter, and one number."
                )
                .required("Required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="password">
                {({ field }) => (
                  <FormControl id="password" mb={4}>
                    <FormLabel>Enter New Password: </FormLabel>
                    <Input type="password" {...field} required />
                    <ErrorMessage
                      fontFamily="Fira Code"
                      name="password"
                      component="div"
                      color="red"
                    />
                  </FormControl>
                )}
              </Field>
              <Button
                type="submit"
                size="md"
                variant="solid"
                colorScheme="facebook"
              >
                Reset Password
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default ResetPassword;
