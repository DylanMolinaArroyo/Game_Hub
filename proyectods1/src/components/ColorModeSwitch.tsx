import { HStack, Switch, Icon, useColorMode } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack spacing={4}>
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        size="lg"
        variant={colorMode === "dark" ? "moonMode" : "sunMode"}
      />
      {colorMode === "dark" ? (
        <Icon as={FaMoon} boxSize="1.5em" color="blue.600" />
      ) : (
        <Icon as={IoSunnySharp} boxSize="1.5em" color="yellow.500" />
      )}
    </HStack>
  );
};

export default ColorModeSwitch;
