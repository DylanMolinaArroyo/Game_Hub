import { Flex, HStack, Switch, Icon, Text, useColorMode } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { t } = useTranslation();
  const isDark = colorMode === "dark";

  return (
    <Flex align="center" justify="space-between" w="100%" px={2} py={3}>
      <HStack spacing={3}>
        <Icon
          as={isDark ? FaMoon : IoSunnySharp}
          boxSize="1.2em"
          color={isDark ? "blue.400" : "yellow.400"}
        />
        <Text fontWeight="medium">{t("dark_mode.message")}</Text>
      </HStack>
      <Switch
        isChecked={isDark}
        onChange={toggleColorMode}
        colorScheme="blue"
        size="lg"
      />
    </Flex>
  );
};

export default ColorModeSwitch;
