import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const SortSelector = ({ onSelectSortOrder, sortOrder }: Props) => {
  const { t } = useTranslation();
  const sortOrders = [
    { value: "", label: t("relevance.message") },
    { value: "-added", label: t("date_added.message") },
    { value: "name", label: t("name.message") },
    { value: "-release", label: t("release_date.message") },
    { value: "-metacritic", label: t("popularity.message") },
    { value: "-rating", label: t("average_rating.message") },
  ];
  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );
  const text = useMemo(() => {
    return `${t("order_by.message")}`;
  }, [t]);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {text} {currentSortOrder?.label || t("relevance.message")}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => onSelectSortOrder(order.value)}
            key={order.value}
            value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
