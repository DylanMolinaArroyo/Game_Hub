import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import i18next from "i18next";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import { TbWorld } from "react-icons/tb";
import { useTranslation } from "react-i18next";

interface LanguageSwitchProps {
  onClick?: () => void;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ onClick }) => {
  const languages = [
    {
      code: "US" as FlagIconCode,
      name: "English",
    },
    {
      code: "ES" as FlagIconCode,
      name: "Spanish",
    },
  ];

  const changeLanguage = (lng: string | undefined) => {
    i18next.changeLanguage(lng);
    if (onClick) onClick();
  };

  const { t } = useTranslation();

  return (
    <Menu>
      <MenuButton
        as={Button}
        padding="auto"
        background="inherit"
        leftIcon={<TbWorld size="20px" />}
        fontSize={["xs", "sm", "md"]}
        px={[2, 3, 4]}
        py={[1, 2, 2]}
        minWidth="120px"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
        textAlign="left"
        style={{ paddingLeft: "8px", paddingRight: "12px" }}
        w="100%"
      >
        {t("languages.message")}
      </MenuButton>
      <MenuList w="100%">
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            fontSize={["xs", "sm"]}
          >
            <FlagIcon
              code={language.code}
              size={18}
              style={{ marginRight: "6px" }}
            />
            {t(`language_${language.name.toLowerCase()}.message`)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitch;
