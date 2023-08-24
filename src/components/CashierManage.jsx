import { Box, Flex, Link, useDisclosure, useToast } from "@chakra-ui/react";
import { BsPersonPlusFill } from "react-icons/bs";
import AddCashierModal from "./AddCashierModal";
import CashierCards from "./CashierCards";

export default function CashierManage({ cashiers }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        flexWrap={"wrap"}
        rowGap={6}
        w={"100%"}
        overflowX={"hidden"}
        fontFamily={"Fira Code"}
        py={6}
      >
        {cashiers?.map((cashier) => (
          <CashierCards cashier={cashier} key={cashier.username} />
        ))}
      </Flex>
      <Link onClick={onOpen}>
        <Box
          as="button"
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
          <BsPersonPlusFill size={["25px", "30px"]} />
        </Box>
      </Link>
      <AddCashierModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
