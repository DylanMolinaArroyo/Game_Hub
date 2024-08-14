import { HStack, Icon } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { IoGameControllerOutline } from "react-icons/io5";
import RightDrawer from "./RightDrawer";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack padding="10px">
      <Icon as={IoGameControllerOutline} boxSize="60px" />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
      <RightDrawer />
    </HStack>
  );
};

export default NavBar;
