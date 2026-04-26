import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import gameCatalog from "../assets/gameCatalog.webp";
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";

function Signup() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const mapAuthError = (code: string) => {
    if (code === "auth/email-already-in-use") return t("auth_error_email_in_use.message");
    return t("auth_error_generic.message");
  };

  const signUpWithGoogle = async () => {
    setAuthing(true);
    setError("");

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(mapAuthError(error.code));
        setAuthing(false);
      });
  };

  const signUpWithEmail = async () => {
    if (password !== confirmPassword) {
      setError(t("password_mismatch.message"));
      return;
    }

    setAuthing(true);
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(mapAuthError(error.code));
        setAuthing(false);
      });
  };

  return (
    <Box
      minH="100vh"
      bgImage={`url(${gameCatalog})`}
      bgSize="cover"
      bgPosition="center"
    >
      <Center h="100vh">
        <Box
          w={{ base: "92%", sm: "75%", md: "50%" }}
          bg="#1a1a1a"
          p={{ base: 6, md: 10 }}
          flexDirection="column"
          justifyContent="center"
          borderRadius={15}
          maxW="400px"
        >
          <Box maxW="100%" mx="auto">
            <Heading
              as="h3"
              size="xl"
              mb={2}
              color="text.heading"
              textAlign="center"
            >
              {t("sign_up.message")}
            </Heading>
            <Text fontSize="md" mb={4} textAlign="center">
              {t("welcome_message.message")}
            </Text>

            <Stack spacing={2} mb={4}>
              <Input
                type="email"
                placeholder={t("email.message")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="flushed"
                focusBorderColor="white"
              />
              <Input
                type="password"
                placeholder={t("password.message")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="flushed"
                focusBorderColor="white"
              />
              <Input
                type="password"
                placeholder={t("re_enter_password.message")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="flushed"
                focusBorderColor="white"
              />
            </Stack>

            {error && (
              <Text color="red.500" mb={4} textAlign="center">
                {error}
              </Text>
            )}

            <Button
              onClick={signUpWithEmail}
              isLoading={authing}
              color="text.heading"
              w="100%"
              mb={1}
            >
              {t("sign_up_with_email.message")}
            </Button>

            <Center my={4}>
              <Divider borderColor="gray.500" />
              <Text fontSize="lg" color="gray.500" mx={2} bg="#1a1a1a">
                {t("or.message")}
              </Text>
              <Divider borderColor="gray.500" />
            </Center>

            <Button
              colorScheme="whiteAlpha"
              bg="white"
              color="black"
              onClick={signUpWithGoogle}
              isLoading={authing}
              w="100%"
            >
              <Icon as={FcGoogle} boxSize={25} />
              {t("sign_up_with_google.message")}
            </Button>

            <Center mt={10}>
              <Text fontSize="sm" color="gray.400">
                {t("already_have_account.message")}{" "}
                <Text
                  as="span"
                  fontWeight="semibold"
                  color="white"
                  cursor="pointer"
                  textDecoration="underline"
                >
                  <Link to="/login">{t("login_title.message")}</Link>
                </Text>
              </Text>
            </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}

export default Signup;
