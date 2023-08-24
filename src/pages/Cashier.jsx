import { Flex, Grid } from "@chakra-ui/react";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Transactions from "../components/Transactions";
import customColors from "../themes/customColors";
import Navbar from "../components/Navbar";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const mainOptions = {
  bgColor: customColors.primary,
  w: "100vw",
  h: "fit-content",
  minW: "100vw",
  minH: "100vh",
  p: "16px",
  gap: "16px",
};

const menuOptions = {
  direction: "column",
  w: "100%",
  maxW: {
    md: "56vw",
    lg: "70vw",
  },
  gap: 4,
};

function Cashier() {
  const [category, setCategory] = useState(0);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateCarts, setUpdateCarts] = useState("");
  const [completedOrder, setCompletedOrder] = useState("")

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    try {
      const decoded = jwt_decode(token);
      const isAdmin = decoded.is_admin;
      if (isAdmin) {
        return navigate("/not-authorized");
      }
    } catch (error) {
      return navigate("/not-found");
    }
  }, []);

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Flex {...mainOptions}>
        <Flex {...menuOptions}>
          <Categories setCategory={setCategory} setPage={setPage} />
          <Products
            category={category}
            page={page}
            title={searchQuery}
            completedOrder={completedOrder}
            setPage={setPage}
            setUpdateCarts={setUpdateCarts}
          />
        </Flex>
        <Transactions
          updateCarts={updateCarts}
          setUpdateCarts={setUpdateCarts}
          setCompletedOrder={setCompletedOrder}
        />
      </Flex>
    </>
  );
}

export default Cashier;
