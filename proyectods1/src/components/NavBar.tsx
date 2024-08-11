import { HStack, Icon } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { IoGameControllerOutline } from "react-icons/io5";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack padding="10px">
      <Icon
        as={IoGameControllerOutline}
        boxSize="60px"
        color={{
          bgGradient:
            "linear(to-r, red.500, yellow.400, green.400, blue.400, purple.400)",
        }}
      />

      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
