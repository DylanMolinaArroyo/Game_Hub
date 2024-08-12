import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
  useColorModeValue,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.900");

  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const signInWithEmail = async () => {
    setAuthing(true);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setAuthing(false);
      });
  };

  return (
    <Box
      minH="100vh"
      bgImage="../src/assets/gameCatalog.webp"
      bgSize="cover"
      bgPosition="center"
    >
      <Center h="100vh">
        <Box
          w="50%"
          bg="#1a1a1a"
          p={10}
          flexDirection="column"
          justifyContent="center"
          borderRadius={15}
          maxW="400px"
        >
          <Box maxW="300px" mx="auto">
            <Heading
              as="h3"
              size="xl"
              mb={2}
              color={headingColor}
              textAlign="center"
            >
              Login
            </Heading>
            <Text fontSize="md" mb={4} textAlign="center">
              Welcome Back! Please enter your details.
            </Text>

            <Stack spacing={2} mb={4}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="flushed"
                focusBorderColor="white"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              onClick={signInWithEmail}
              isLoading={authing}
              color={headingColor}
              w="100%"
              mb={1}
            >
              Log In With Email and Password
            </Button>

            <Center my={4}>
              <Divider borderColor="gray.500" />
              <Text fontSize="lg" color="gray.500" mx={2} bg="#1a1a1a">
                OR
              </Text>
              <Divider borderColor="gray.500" />
            </Center>

            <Button
              colorScheme="whiteAlpha"
              bg="white"
              color="black"
              onClick={signInWithGoogle}
              isLoading={authing}
              w="100%"
            >
              <Icon as={FcGoogle} boxSize={25} />
              Log In With Google
            </Button>

            <Center mt={10}>
              <Text fontSize="sm" color="gray.400">
                Don't have an account?{" "}
                <Text
                  as="span"
                  fontWeight="semibold"
                  color="white"
                  cursor="pointer"
                  textDecoration="underline"
                >
                  <a href="/signup">Sign Up</a>
                </Text>
              </Text>
            </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}

export default Login;
