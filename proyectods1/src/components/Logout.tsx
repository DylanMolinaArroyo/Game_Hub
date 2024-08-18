import { Button, Icon } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();

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
    <Button onClick={handleLogout} colorScheme="blue" width="100%">
      Logout
      <Icon as={CiLogout} />
    </Button>
  );
};

export default Logout;
