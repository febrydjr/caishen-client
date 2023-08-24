import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import customColors from "../../../themes/customColors";
import CheckoutModal from "./CheckoutModal";

const orderOptions = {
  bgColor: customColors.textSecondary,
  color: customColors.primary,
  h: "3.2em",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  cursor: "pointer",
};

const textOptions = {
  fontSize: "1.2em",
};

function CheckoutButton({ total, setUpdateCarts, setCompletedOrder }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function onCheckout() {
    onOpen();
  }

  return (
    <Flex {...orderOptions} onClick={() => onCheckout()}>
      <CheckoutModal
        isOpen={isOpen}
        onClose={onClose}
        setUpdateCarts={setUpdateCarts}
        setCompletedOrder={setCompletedOrder}
        total={total}
      />
      <Text {...textOptions}>Order</Text>
    </Flex>
  );
}

export default CheckoutButton;
