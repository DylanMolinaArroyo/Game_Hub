import { IoIosCloseCircle } from "react-icons/io";
import { Button, Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ClearFiltersButtonProps } from "./ClearFiltersButton.types";


const ClearFiltersButton = ({ onClick }: ClearFiltersButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      leftIcon={<Icon as={IoIosCloseCircle} />}
      borderRadius={20}
      aria-label={t("clear_filter.message")}
      onClick={onClick}
    >
      {t("clear_filter.message")}
    </Button>
  );
};

export default ClearFiltersButton;
