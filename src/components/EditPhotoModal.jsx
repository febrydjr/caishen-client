import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const EditPhotoModal = ({ isOpen, onClose, onSave, token }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const toast = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
  };

  const handleSave = async () => {
    if (!profilePhoto) {
      console.log("No profile photo selected.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", profilePhoto);
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://caishen-server-production.up.railway.app/api/profile/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Successfully updated profile photo!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onSave(profilePhoto);
      window.location.reload();
      onClose();
    } catch (error) {
      toast({
        title: "Error updating profile photo!",
        // description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.log("Error uploading profile photo:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Photo Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody fontFamily={"Fira Code"}>
          <FormControl>
            <FormLabel>Upload Photo</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </FormControl>
          {profilePhoto && (
            <img
              src={URL.createObjectURL(profilePhoto)}
              alt="Profile"
              style={{ maxWidth: "100%", marginTop: "1rem" }}
            />
          )}
        </ModalBody>
        <ModalFooter fontFamily={"Fira Code"}>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleSave}
            disabled={!profilePhoto}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPhotoModal;
