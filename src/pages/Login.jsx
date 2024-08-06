import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Input,
  Button,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ResetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address format"),
});

const Login = () => {
  const [toggle, setToggle] = React.useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const isAdmin = decoded.is_admin;
        if (isAdmin) {
          return navigate("/dashboard");
        } else {
          return navigate("/cashier");
        }
      } catch (error) {
        return navigate("/not-found");
      }
    } else {
      return navigate("/");
    }
  }, []);
  const handleReset = async (values) => {
    try {
      await axios.post("https://caishen-server.vercel.app/api/auth/forgot", {
        email: values.email,
        FE_URL: "https://caishen-server.vercel.app",
      });
      toast({
        title: "Link reset password sent",
        description: "Please check your email",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast({
        title: "Invalid email address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogin = async (values) => {
    try {
      const { identifier, password } = values;
      const res = await axios.post("https://caishen-server.vercel.app/api/auth/login", {
        identifier,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        const token = res.data.token;
        const decoded = jwt_decode(token);
        const isAdmin = decoded.is_admin;
        toast({
          title: "Success",
          description: "Login Success",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        if (isAdmin) {
          document.location.href = '/dashboard';
        } else {
          document.location.href = '/cashier';
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Login Failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const initialValues = {
    identifier: "",
    password: "",
    email: "",
  };

  return (
    <Box
      bgImage={"/bglogin.png"}
      fontFamily={"Fira Code"}
      backgroundSize={"cover"}
      h={"100vh"}
    >
      <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
        <Box
          bgColor={"#2A2B2E"}
          w="450px"
          p={5}
          border={"1px solid #2D2D2D"}
          borderWidth={1}
          borderRadius={8}
          color={"white"}
          boxShadow={"dark-lg"}
        >
          <Text fontSize={"4xl"}>CaishenPOS Login!</Text>
          <Text fontSize="12px" mb={8}>
            Welcome back! please enter your detail!
          </Text>
          <Text fontSize="12px" color={"red"}>
            Login Admin: username = febrydjr and password = password
          </Text>
          <Text fontSize="12px" mb={8} color={"red"}>
          Login User: username = andreadya and password = password
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={ResetSchema}
            onSubmit={toggle ? handleReset : handleLogin}
          >
            {({ errors, touched }) => (
              <Form>
                {!toggle && (
                  <>
                    <Field name="identifier">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.identifier && form.touched.identifier
                          }
                          mb={2}
                        >
                          <FormLabel htmlFor="identifier">
                            Username/Email
                          </FormLabel>
                          <Input {...field} id="identifier" />
                          <FormErrorMessage>
                            {form.errors.identifier}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                          mb={2}
                        >
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Input {...field} id="password" type="password" />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button type="submit" colorScheme="gray" mt={1} mb={4}>
                      Login
                    </Button>
                    <Text fontSize={"12px"}>
                      Forgot Password? &nbsp;
                      <Link onClick={() => setToggle(!toggle)}>
                        Click here!
                      </Link>
                    </Text>
                  </>
                )}
                {toggle && (
                  <>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                          mb={2}
                        >
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <Input {...field} id="email" type="email" />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      type="submit"
                      mb={4}
                      colorScheme="blue"
                      isLoading={false}
                    >
                      Send Link
                    </Button>
                    <Text fontSize={"12px"}>
                      <Link onClick={() => setToggle(!toggle)}>
                        Back to login
                      </Link>
                    </Text>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
