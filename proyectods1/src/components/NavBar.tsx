/*import { HStack, Icon } from "@chakra-ui/react";
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

export default NavBar;*/


//#################################################################################################


/*import { HStack, Icon, Button } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { GiArchiveResearch } from "react-icons/gi";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login"); // Redirige al usuario a la página de login después de cerrar sesión
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <HStack padding="10px" justifyContent="space-between">
      <Icon as={GiArchiveResearch} boxSize="60px" />
      <SearchInput onSearch={onSearch} />
      <HStack>
        <ColorModeSwitch />
        <Button onClick={handleLogout} colorScheme="red">
          Logout
        </Button>
      </HStack>
    </HStack>
  );
};

export default NavBar;*/

//#################################################################################################

import { HStack, Icon, Button, Avatar, Text, VStack } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { GiArchiveResearch } from "react-icons/gi";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <HStack padding="10px" justifyContent="space-between">
      <HStack>
        <Icon as={GiArchiveResearch} boxSize="60px" />
        <SearchInput onSearch={onSearch} />
      </HStack>

      <HStack>
        <ColorModeSwitch />
        {user && (
          <HStack spacing={4}>
            <Avatar src={user.photoURL || undefined} />
            <VStack alignItems="flex-start" spacing={0}>
              <Text fontWeight="bold">{user.displayName || "User"}</Text>
              <Text fontSize="sm">{user.email}</Text>
            </VStack>
            <Button onClick={handleLogout} colorScheme="blue">
              Logout
            </Button>
          </HStack>
        )}
      </HStack>
    </HStack>
  );
};

export default NavBar;


