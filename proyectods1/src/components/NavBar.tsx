import { HStack, Icon } from "@chakra-ui/react";
//import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { GiArchiveResearch } from "react-icons/gi";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack padding="10px">
      <Icon as={GiArchiveResearch} boxSize="60px" />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

//<Image src={logo} boxSize="60px" />

export default NavBar;
