import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function EditInfoCashier({ isOpen, onClose, email, username }) {
  const [activeTab, setActiveTab] = useState(0);
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldUsername, setOldUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const toast = useToast();

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleEmail = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/auth/email",
        {
          oldEmail: email,
          newEmail,
        }
      );
      toast({
        title: "Email Changed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error Changing Email",
        description: "An error occurred while changing email.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUsername = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/auth/username",
        {
          oldUsername: username,
          newUsername,
        }
      );
      toast({
        title: "Username Changed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error Changing Username",
        description: "An error occurred while changing username.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent fontFamily={"Fira Code"}>
        <ModalHeader>Change Cashier Details!</ModalHeader>
        <ModalBody>
          <Tabs isLazy index={activeTab} onChange={handleTabChange}>
            <TabList>
              <Tab>Change Email</Tab>
              <Tab>Change Username</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Input
                  mt={2}
                  placeholder="New Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <Button
                  mt={4}
                  bg={"black"}
                  color={"white"}
                  onClick={handleEmail}
                >
                  Save
                </Button>
              </TabPanel>
              <TabPanel>
                <Input
                  mt={2}
                  placeholder="New Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <Button
                  mt={4}
                  bg={"black"}
                  color={"white"}
                  onClick={handleUsername}
                >
                  Save
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditInfoCashier;
