import { Flex, Link, useDisclosure, Box } from "@chakra-ui/react";
import Categories from "./Categories";
import { TbLayoutGridAdd } from "react-icons/tb";
import AddCategoryModal from "../components/Categories/detail/AddCategoryModal";
import { useState } from "react";

function CategoryManage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateCategory, setUpdateCategory] = useState();

  return (
    <Flex w={"100%"}>
      <Flex direction={"column"} gap={4} w={"100%"}>
        <Categories updateCategory={updateCategory} setUpdateCategory={setUpdateCategory} isEdit={true}/>
      </Flex>
      <Link
        onClick={() => {
          onOpen();
        }}
      >
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
          <TbLayoutGridAdd size={["25px", "30px"]} />
        </Box>
      </Link>
      <AddCategoryModal isOpen={isOpen} onClose={onClose} setUpdateCategory={setUpdateCategory}/>
    </Flex>
  );
}

export default CategoryManage;
