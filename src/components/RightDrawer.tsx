import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Icon,
  Avatar,
  Text,
  VStack,
  useDisclosure,
  Box,
  Divider,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import LogoutButton from "./Logout";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./LanguageSwitch";

const RightDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();

    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName);
      setUserEmail(auth.currentUser.email);
      setUserPhoto(auth.currentUser.photoURL);
    }
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Button onClick={onOpen} variant="unstyled" top="4px">
        <Icon as={FaBars} boxSize="20px" />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            position="absolute"
            top="16px"
            right="16px"
            _hover={{ color: "red.500" }}
          />
          <DrawerHeader paddingLeft="16px" paddingRight="48px" top="16px">
            {t("user_information.message")}
          </DrawerHeader>

          <DrawerBody>
            <Box
              bg="gray.700"
              borderRadius="md"
              boxShadow="md"
              p={4}
              mb={6}
              color="white"
              backgroundImage="url('https://fondosmil.co/fondo/3876.jpg')"
            >
              <VStack spacing={2} align="left">
                {userPhoto && (
                  <Avatar
                    src={userPhoto}
                    size="xl"
                    borderWidth="2px"
                    borderColor="whiteAlpha.800"
                    boxShadow="lg"
                  />
                )}
                {userName && (
                  <Text fontWeight="bold" fontSize="2xl">
                    {userName}
                  </Text>
                )}
                {userEmail && (
                  <Text fontSize="md" color="whiteAlpha.700">
                    {userEmail}
                  </Text>
                )}
              </VStack>
            </Box>
            <Divider />
            <LanguageSwitch />
            <Divider />
          </DrawerBody>

          <DrawerFooter>
            <LogoutButton />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RightDrawer;
