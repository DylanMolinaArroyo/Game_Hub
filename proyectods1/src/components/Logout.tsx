import { HStack, Button, Avatar } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      setUserPhoto(auth.currentUser.photoURL);
    }
  }, [auth.currentUser]);

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
    <HStack spacing={4}>
      {userPhoto && <Avatar src={userPhoto} size="sm" />}
      <Button onClick={handleLogout} colorScheme="blue">
        Logout
      </Button>
    </HStack>
  );
};

export default Logout;