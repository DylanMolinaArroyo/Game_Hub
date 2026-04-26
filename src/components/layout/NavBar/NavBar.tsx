import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { IoGameControllerOutline } from "react-icons/io5";
import RightDrawer from "../RightDrawer";
import "../../../styles.css";

const NavBar = () => (
  <Flex
    px={{ base: 4, md: 8, lg: 12 }}
    py={{ base: 3, md: 4 }}
    align="center"
    justify="space-between"
    bg="surface"
    borderBottom="1px solid"
    borderColor="border.subtle"
  >
    <HStack spacing={2}>
      <Icon
        as={IoGameControllerOutline}
        boxSize={{ base: "28px", md: "32px" }}
        className="rgb-logo"
      />
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="bold"
        letterSpacing="tight"
      >
        Game Hub
      </Text>
    </HStack>
    <RightDrawer />
  </Flex>
);

export default NavBar;
