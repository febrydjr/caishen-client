import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const NotFound = () => {
  return (
    <Flex
      h={"95vh"}
      fontFamily={"Fira Code"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontSize={"8xl"}>404</Text>
      <Text fontSize={"2xl"}>Not Found!</Text>
    </Flex>
  );
};

export default NotFound;
