import {
  Box,
  Img,
  Text,
  Heading,
  HStack,
  Flex,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import getImage from "../api/getImage";
import axios from "axios";
import EditInfoCashier from "./EditInfoCashier";

const CashierCards = ({ cashier }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const handleDelete = async (username) => {
    try {
      await axios.delete(`https://caishen-server.vercel.app/api/profile/user/${username}`);
      toast({
        title: "User deleted!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      window.location.reload();
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

  const handleActivate = async (username) => {
    try {
      await axios.patch(`https://caishen-server.vercel.app/api/profile/user`, {
        username: username,
      });
      toast({
        title: "User activated!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      window.location.reload();
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
  return (
    <>
      <Box
        w="255px"
        rounded={"lg"}
        mx={[0, 2]}
        overflow={"hidden"}
        bg="#CFDDDB"
        border={"1px"}
        borderColor="black"
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Img
            src={getImage(cashier.avatar)}
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={"avatar"}
          />
        </Box>
        <Box p={4}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {cashier.is_admin ? "Admin" : "Cashier"}
            </Text>
          </Box>
          <Box
            ml={2}
            bg={cashier.is_active ? "green" : "red"}
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {cashier.is_active ? "Active" : "Inactive"}
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {cashier.name}
          </Heading>
          <Text fontSize={"13px"} color={"gray.500"} noOfLines={2}>
            <Text mt={3}>Email&nbsp;&nbsp;: {cashier.email}</Text>
            <Text>Phone &nbsp;: {cashier.phone}</Text>
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            onClick={onOpen}
            cursor={"pointer"}
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            w="full"
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              {cashier.username.slice(0, 16)}
            </Text>
            {/* <AiOutlineEdit size={"25px"} /> */}
          </Flex>
          {cashier.is_active ? (
            <Flex
              p={4}
              alignItems="center"
              justifyContent={"space-between"}
              roundedBottom={"sm"}
              borderLeft={"1px"}
              cursor="pointer"
              onClick={() => handleDelete(cashier.username)}
            >
              <FaTimes fontSize={"26px"} />
            </Flex>
          ) : (
            <Flex
              p={4}
              alignItems="center"
              justifyContent={"space-between"}
              roundedBottom={"sm"}
              borderLeft={"1px"}
              cursor="pointer"
              onClick={() => handleActivate(cashier.username)}
            >
              <FaCheck fontSize={"24px"} />
            </Flex>
          )}
        </HStack>
        <EditInfoCashier
          username={cashier.username}
          email={cashier.email}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
    </>
  );
};

export default CashierCards;
