import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import LogoutButton from "./Logout";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./LanguageSwitch";
import ColorModeSwitch from "./ColorModeSwitch";

const UserCard = ({
  userName,
  userEmail,
  userPhoto,
}: {
  userName: string | null;
  userEmail: string | null;
  userPhoto: string | null;
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Box
      bg={isDark ? "gray.700" : "white"}
      backgroundImage={
        isDark ? "url('https://fondosmil.co/fondo/3876.jpg')" : undefined
      }
      backgroundSize="cover"
      backgroundPosition="center"
      borderRadius="md"
      borderWidth={isDark ? 0 : "1px"}
      borderColor="border.subtle"
      boxShadow="md"
      p={4}
      mb={4}
    >
      <VStack spacing={2} align="left">
        {userPhoto && (
          <Avatar
            src={userPhoto}
            size="xl"
            borderWidth="2px"
            borderColor={isDark ? "whiteAlpha.800" : "border.subtle"}
            boxShadow="lg"
          />
        )}
        {userName && (
          <Text
            fontWeight="bold"
            fontSize="2xl"
            color={isDark ? "white" : "text.heading"}
          >
            {userName}
          </Text>
        )}
        {userEmail && (
          <Text fontSize="md" color={isDark ? "whiteAlpha.700" : "text.muted"}>
            {userEmail}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

const SettingsCard = () => (
  <Box
    borderRadius="md"
    borderWidth="1px"
    borderColor="border.subtle"
    overflow="hidden"
  >
    <ColorModeSwitch />
    <Divider />
    <LanguageSwitch />
  </Box>
);

const RightDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserName(user?.displayName ?? null);
      setUserEmail(user?.email ?? null);
      setUserPhoto(user?.photoURL ?? null);
    });
    return () => unsubscribe();
  }, []);

  const displayName = userName ?? userEmail?.split("@")[0] ?? "";

  return (
    <>
      {/* Mobile: slide-in Drawer */}
      <Box display={{ base: "block", md: "none" }}>
        <Button onClick={onOpen} variant="unstyled">
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
            <DrawerHeader paddingLeft="16px" paddingRight="48px">
              {t("user_information.message")}
            </DrawerHeader>
            <DrawerBody>
              <UserCard
                userName={userName}
                userEmail={userEmail}
                userPhoto={userPhoto}
              />
              <SettingsCard />
            </DrawerBody>
            <DrawerFooter>
              <LogoutButton />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>

      {/* Desktop: Popover dropdown */}
      <Box display={{ base: "none", md: "flex" }} alignItems="center">
        <Popover placement="bottom-end" isLazy>
          <PopoverTrigger>
            <Button
              variant="outline"
              borderRadius="full"
              pl={1.5}
              pr={3}
              h="36px"
              gap={2}
            >
              <Avatar
                src={userPhoto || undefined}
                name={displayName || undefined}
                size="xs"
              />
              <Text
                fontSize="sm"
                fontWeight="medium"
                maxW="120px"
                noOfLines={1}
              >
                {displayName}
              </Text>
              <Icon as={BsChevronDown} boxSize={3} />
            </Button>
          </PopoverTrigger>
          <PopoverContent w="300px" p={0} overflow="hidden">
            <PopoverBody p={4}>
              <UserCard
                userName={userName}
                userEmail={userEmail}
                userPhoto={userPhoto}
              />
              <SettingsCard />
              <Box mt={4}>
                <LogoutButton />
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </>
  );
};

export default RightDrawer;
