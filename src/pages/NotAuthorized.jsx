import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const NotAuthorized = () => {
  return (
    <Flex
      h={"95vh"}
      fontFamily={"Fira Code"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontSize={"9xl"}>4🤬3</Text>
      <Text fontSize={"2xl"}>Not Authorized</Text>
      <Text>You are not authorized from accesing this page!</Text>
    </Flex>
  );
};

export default NotAuthorized;
