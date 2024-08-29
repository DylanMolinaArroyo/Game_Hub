import { Avatar, HStack, Icon } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { IoGameControllerOutline } from "react-icons/io5";
import RightDrawer from "./RightDrawer";
import "../styles.css";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      setUserPhoto(auth.currentUser.photoURL);
    }
  }, [auth.currentUser]);

  return (
    <HStack padding="10px">
      <Icon as={IoGameControllerOutline} boxSize="60px" className="rgb-logo" />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
      {userPhoto && <Avatar src={userPhoto} size="sm" />}
      <RightDrawer />
    </HStack>
  );
};

export default NavBar;
