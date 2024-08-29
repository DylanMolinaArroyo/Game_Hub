import { Button, Icon } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useTranslation } from "react-i18next";
const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      {t("logout.message")}
      <Icon as={CiLogout} />
    </Button>
  );
};

export default Logout;
