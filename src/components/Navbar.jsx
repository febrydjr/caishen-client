import {
  Box,
  Flex,
  Link,
  Text,
  Spacer,
  Image,
  Avatar,
  IconButton,
  Collapse,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiHamburgerMenu, GiToken } from "react-icons/gi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import getImage from "../api/getImage";
import axios from "axios";

function Navbar({ searchQuery, setSearchQuery }) {
  const [isToggle, setIsToggle] = useState(false);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://caishen-server.vercel.app/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { avatar } = response.data.data;
      setAvatar(avatar);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box
      w={"full"}
      minW={"100vw"}
      fontFamily={"Fira Code"}
      fontSize={"large"}
      bg="#2A2B2E"
      py={3}
      px={6}
    >
      <Flex align="center" justify="space-between" color="white">
        <Flex align="center">
          <Box>
            <Image src={"/caishenPOS.png"} alt="Logo" boxSize={12} mr={4} />
          </Box>
          <Box
            fontWeight="bold"
            fontSize="2xl"
            _hover={{ textDecoration: "none" }}
          >
            CaishenPOS
          </Box>
          <Input
            w={"300px"}
            fontFamily={"Fira Code"}
            placeholder="Search products..."
            _placeholder={{ color: "white" }}
            ml={10}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button ml={2} colorScheme="gray" _hover={{ bg: "#DAFFFB" }}>
            <AiOutlineSearch size={"20px"} />
          </Button>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }} align="center">
          {token ? (
            <>
              <Button
                size={"sm"}
                as={RouterLink}
                to="/"
                onClick={handleLogout}
                _hover={{ textColor: "black", bgColor: "white" }}
                bgColor={"red.500"}
                textColor={"white"}
              >
                Sign Out
              </Button>
              <Link mr={4} as={RouterLink} to="/profile">
                <Avatar name="User" src={avatar} size="sm" ml={4} />
              </Link>
            </>
          ) : (
            <>
              <Link
                as={RouterLink}
                to="/login"
                mr={4}
                _hover={{ textDecoration: "none" }}
              >
                Log In
              </Link>
              <Link
                as={RouterLink}
                to="/register"
                _hover={{ textDecoration: "none" }}
              >
                Register
              </Link>
            </>
          )}
        </Flex>
        <IconButton
          aria-label="Toggle navigation"
          icon={isToggle ? <AiOutlineClose /> : <GiHamburgerMenu />}
          onClick={handleToggle}
          display={{ base: "flex", md: "none" }}
        />
      </Flex>
    </Box>
  );
}

export default Navbar;
