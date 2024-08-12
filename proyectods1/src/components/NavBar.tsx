import { HStack, Icon } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { GiArchiveResearch } from "react-icons/gi";
import LogoutButton from "./Logout"; 
import RightDrawer from "./RightDrawer";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack padding="10px">
      <Icon as={GiArchiveResearch} boxSize="60px" />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
      <RightDrawer />
      <LogoutButton /> 
    </HStack>
  );
};

export default NavBar;


