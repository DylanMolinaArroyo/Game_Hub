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
  Card,
  CardHeader,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import LogoutButton from "./Logout";

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

  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={FaBars} size="20px" />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>User Information</DrawerHeader>

          <DrawerBody>
            <Card
              backgroundImage="url('https://fondosmil.co/fondo/3876.jpg')"
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              color="white"
            >
              <CardHeader>
                <VStack spacing={4} align="center">
                  {userPhoto && <Avatar src={userPhoto} size="xl" />}
                  {userName && (
                    <Text fontWeight="bold" fontSize="xl">
                      {userName}
                    </Text>
                  )}
                  {userEmail && <Text color="white.300">{userEmail}</Text>}
                </VStack>
              </CardHeader>
            </Card>
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
