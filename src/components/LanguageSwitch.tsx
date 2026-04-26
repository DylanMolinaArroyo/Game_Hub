import { Button, Flex, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import i18next from "i18next";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import { TbWorld } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const languages: { code: FlagIconCode; lng: string; labelKey: string }[] = [
  { code: "US", lng: "en", labelKey: "language_english.message" },
  { code: "ES", lng: "es", labelKey: "language_spanish.message" },
];

const LanguageSwitch = () => {
  const { t } = useTranslation();

  return (
    <Flex align="center" justify="space-between" w="100%" px={2} py={3}>
      <HStack spacing={3}>
        <Icon as={TbWorld} boxSize="1.2em" />
        <Text fontWeight="medium">{t("languages.message")}</Text>
      </HStack>
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          size="sm"
          variant="outline"
          rightIcon={<BsChevronDown />}
        >
          <FlagIcon
            code={
              languages.find((l) => l.lng === i18next.language)?.code ?? "US"
            }
            size={16}
          />
        </MenuButton>
        <MenuList minW="140px">
          {languages.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => i18next.changeLanguage(lang.lng)}
            >
              <FlagIcon
                code={lang.code}
                size={16}
                style={{ marginRight: "8px" }}
              />
              {t(lang.labelKey)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default LanguageSwitch;
