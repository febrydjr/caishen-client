import { Box, Text, Flex, VStack, Link, useDisclosure } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdManageAccounts,
  MdOutlineAllInbox,
  MdOutlineAutoGraph,
} from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import axios from "axios";
import CashierManage from "../components/CashierManage";
import ProductCategories from "../components/CategoryManage";
import ProductManage from "../components/ProductManage";
import Report from "../components/Report"
import jwt_decode from "jwt-decode";

const AdminDashboard = () => {
  const [cashiers, setCashiers] = useState([]);
  const [activePage, setActivePage] = useState("cashier");
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    try {
      const decoded = jwt_decode(token);
      const isAdmin = decoded.is_admin;
      if (!isAdmin) {
        return navigate("/not-authorized");
      }
    } catch (error) {
      return navigate("/not-found");
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "cashier":
        return <CashierManage cashiers={cashiers} />;
      case "category":
        return (
          <Box mt={6} w={"100%"}>
            <ProductCategories
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
              editCategory={true}
            />
          </Box>
        );
      case "product":
        return (
          <Box mt={6} w={"100%"}>
            <ProductManage searchQuery={searchQuery} />;
          </Box>
        );
      case "report":
        return <Box mt={6}>
            <Report />
        </Box>;
      default:
        return null;
    }
  };

  const fetchCashiers = async () => {
    try {
      const response = await axios.get(
        "https://caishen-server-production.up.railway.app/api/profile/cashiers"
      );
      setCashiers(response.data.data);
    } catch (error) {
      console.error("Error fetching cashiers:", error.message);
    }
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  return (
    <Box bgColor={"#2A2B2E"} maxW={"100vw"} borderRadius={8}>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Flex>
        <Box
          color="white"
          width="220px"
          p={6}
          fontWeight="bold"
          h={"100vh"}
          fontFamily="Fira Code"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack spacing="8" align="stretch">
            <Text
              bg={"white"}
              p={2}
              w={"150px"}
              color="black"
              mb={4}
              borderRadius={8}
              textAlign="center"
            >
              ADMIN DASHBOARD
            </Text>
            <Link>
              <Flex
                gap={4}
                justifyContent={"left"}
                alignItems={"center"}
                display={"flex"}
                flexDirection={"row"}
              >
                <MdManageAccounts size={"50px"} />
                <Text
                  ml={2}
                  _hover={{ color: "#C2E9DD" }}
                  color="white"
                  onClick={() => setActivePage("cashier")}
                >
                  CASHIER MANAGE
                </Text>
              </Flex>
            </Link>
            <Link>
              <Flex
                gap={6}
                justifyContent={"left"}
                alignItems={"center"}
                display={"flex"}
                flexDirection={"row"}
              >
                <MdOutlineAllInbox size={"50px"} />
                <Text
                  _hover={{ color: "#C9CAEF" }}
                  color="white"
                  onClick={() => setActivePage("product")}
                >
                  PRODUCT MANAGE
                </Text>
              </Flex>
            </Link>
            <Link>
              <Flex
                gap={6}
                justifyContent={"left"}
                alignItems={"center"}
                display={"flex"}
                flexDirection={"row"}
              >
                <BiCategoryAlt size={"50px"} />
                <Text
                  _hover={{ color: "#C9CAEF" }}
                  color="white"
                  onClick={() => setActivePage("category")}
                >
                  CATEGORY MANAGE
                </Text>
              </Flex>
            </Link>
            <Link>
              <Flex
                gap={6}
                justifyContent={"left"}
                alignItems={"center"}
                display={"flex"}
                flexDirection={"row"}
              >
                <MdOutlineAutoGraph size={"37px"} />
                <Text
                  _hover={{ color: "#E4CDED" }}
                  color="white"
                  onClick={() => setActivePage("report")}
                >
                  REPORT
                </Text>
              </Flex>
            </Link>
          </VStack>
        </Box>
        <Box w={"calc(100vw - 220px)"} px={"8px"}>{renderPage()}</Box>
      </Flex>
    </Box>
  );
};

export default AdminDashboard;
