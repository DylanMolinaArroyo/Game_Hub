import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {

    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
        .then(response => {
            console.log(response.user.uid);
            navigate('/');
        })
        .catch(error => {
            console.log(error);
            setAuthing(false);
        });
    }

    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    }

    return (
        <div className = 'w-full h-screen flex'>

            <div className = 'w-1/2 h-full flex-col bg-[#282c34] items-center justify-center'>
            </div>

            <div className = 'w-1/2 h-full gb-[#1a1a1a] flex flex-col p-20 justify-center'>
                <div className = 'w-full flex flex-col max-w-[450px] mx-auto'>
                    <div className = 'w-full flex flex-col mb-10 text-white'>
                        <h3 className = 'text-4x1 font-bold mb-2'>Login</h3>
                        <p className = 'text-lg mb-4'>Welcome Back! Please enter your details.</p>
                    </div>

                    <div className = 'w-full flex flex-col mb-6'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className='w-full flex flex-col mb-4'>
                        <button
                            className='w-full bg-transparent border  border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
                            onClick={signInWithEmail}
                            disabled={authing}>
                            Log In With Email and Password
                        </button> 
                    </div>

                    {error && <div className='text-red-500 mb-4'>{error}</div>}

                    <div className='w-full flex items-center justify-center relative py-4'>
                        <div className='w-full h-[1px] bg-gray-500'></div>
                        <p className='text-lg absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p>
                    </div>

                    <button
                        className='w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-7'
                        onClick={signInWithGoogle}
                        disabled={authing}>
                        Log In With Google
                    </button>
                </div>

                <div className='w-full flex items-center justify-center mt-10'>
                    <p className='text-sm font-normal text-gray-400'>Don't have an account? <span className='font-semibold text-white cursor-pointer underline'><a href='/signup'>Sign Up</a></span></p>
                </div>
            </div>
        </div>
    );
}

export default Login;

//###################################################################################################

/*import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { VStack, Box, Input, Button, Text, Divider, HStack, Icon } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

function Login() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
        .then(response => {
            console.log(response.user.uid);
            navigate('/');
        })
        .catch(error => {
            console.log(error);
            setAuthing(false);
        });
    }

    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    }

    return (
        <Box
            w="full"
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgGradient="linear(to-r, blue.500, purple.600, pink.500)"
        >
            <VStack
                w="full"
                maxW="md"
                p={8}
                bg="white"
                borderRadius="lg"
                boxShadow="lg"
                spacing={6}
            >
                <Box textAlign="center">
                    <Text fontSize="3xl" fontWeight="bold" color="purple.700">
                        Welcome Back!
                    </Text>
                    <Text fontSize="md" color="gray.500">
                        Please enter your details.
                    </Text>
                </Box>

                <VStack w="full" spacing={4}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        borderColor="purple.300"
                        focusBorderColor="purple.500"
                        variant="filled"
                        _hover={{ bg: "purple.50" }}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        borderColor="purple.300"
                        focusBorderColor="purple.500"
                        variant="filled"
                        _hover={{ bg: "purple.50" }}
                    />
                    {error && <Text color="red.500">{error}</Text>}
                </VStack>

                <Button
                    w="full"
                    bg="purple.600"
                    color="white"
                    _hover={{ bg: "purple.700" }}
                    _active={{ bg: "purple.800" }}
                    onClick={signInWithEmail}
                    isLoading={authing}
                >
                    Log In With Email
                </Button>

                <Divider />

                <Button
                    w="full"
                    bg="white"
                    color="black"
                    border="2px"
                    borderColor="purple.600"
                    _hover={{ bg: "purple.100" }}
                    _active={{ bg: "purple.200" }}
                    leftIcon={<Icon as={FaGoogle} />}
                    onClick={signInWithGoogle}
                    isLoading={authing}
                >
                    Log In With Google
                </Button>

                <Text color="gray.500">
                    Don't have an account?{" "}
                    <Text as="span" color="purple.600" fontWeight="bold">
                        <a href='/signup'>Sign Up</a>
                    </Text>
                </Text>
            </VStack>
        </Box>
    );
}

export default Login;*/


//#############################################################################

/*import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Heading, Input, Text, VStack, Divider, useToast } from "@chakra-ui/react";

function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const toast = useToast();

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
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      width="100vw"
      height="100vh"
      bgGradient="linear(to-br, gray.800, gray.900)"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="gray.700"
        p={8}
        rounded="lg"
        shadow="lg"
        className="max-w-md w-full mx-auto"
      >
        <VStack spacing={6} textAlign="center" mb={4}>
          <Heading size="lg" color="white">
            Login
          </Heading>
          <Text fontSize="md" color="gray.300">
            Welcome Back! Please enter your details.
          </Text>
        </VStack>

        <VStack spacing={4} mb={4}>
          <Input
            type="email"
            placeholder="Email"
            className="border-b border-gray-500 focus:border-gray-300"
            focusBorderColor="gray.300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            _placeholder={{ color: "gray.400" }}
            variant="flushed"
            size="lg"
          />
          <Input
            type="password"
            placeholder="Password"
            className="border-b border-gray-500 focus:border-gray-300"
            focusBorderColor="gray.300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            _placeholder={{ color: "gray.400" }}
            variant="flushed"
            size="lg"
          />
        </VStack>

        <VStack spacing={4} mb={4}>
          <Button
            colorScheme="teal"
            variant="solid"
            width="100%"
            onClick={signInWithEmail}
            isLoading={authing}
          >
            Log In With Email and Password
          </Button>
        </VStack>

        {error && <Text color="red.500" mb={4}>{error}</Text>}

        <Divider borderColor="gray.500" />

        <Button
          mt={6}
          bg="white"
          color="black"
          width="100%"
          onClick={signInWithGoogle}
          isLoading={authing}
          _hover={{ bg: "gray.200" }}
        >
          Log In With Google
        </Button>

        <Text mt={6} fontSize="sm" color="gray.400">
          Don't have an account?{" "}
          <Text as="span" color="white" fontWeight="bold">
            <a href="/signup">Sign Up</a>
          </Text>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;*/

//##################################################################################

/*import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { VStack, Box, Input, Button, Text, Divider, HStack, Icon } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

function Login() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
        .then(response => {
            console.log(response.user.uid);
            navigate('/');
        })
        .catch(error => {
            console.log(error);
            setAuthing(false);
        });
    }

    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    }

    return (
        <Box
            w="full"
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgColor="gray.900"
            color="white"
        >
            <VStack
                w="full"
                maxW="md"
                p={8}
                bg="gray.800"
                borderRadius="lg"
                boxShadow="lg"
                spacing={6}
            >
                <Box textAlign="center">
                    <Text fontSize="3xl" fontWeight="bold" color="purple.400">
                        Welcome Back!
                    </Text>
                    <Text fontSize="md" color="gray.400">
                        Please enter your details.
                    </Text>
                </Box>

                <VStack w="full" spacing={4}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        borderColor="purple.500"
                        focusBorderColor="purple.300"
                        variant="flushed"
                        _hover={{ bg: "gray.700" }}
                        bg="gray.700"
                        color="white"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        borderColor="purple.500"
                        focusBorderColor="purple.300"
                        variant="flushed"
                        _hover={{ bg: "gray.700" }}
                        bg="gray.700"
                        color="white"
                    />
                    {error && <Text color="red.400">{error}</Text>}
                </VStack>

                <Button
                    w="full"
                    bg="purple.600"
                    color="white"
                    _hover={{ bg: "purple.500" }}
                    _active={{ bg: "purple.400" }}
                    onClick={signInWithEmail}
                    isLoading={authing}
                >
                    Log In With Email
                </Button>

                <Divider borderColor="gray.600" />

                <Button
                    w="full"
                    bg="gray.700"
                    color="white"
                    border="2px"
                    borderColor="purple.600"
                    _hover={{ bg: "gray.600" }}
                    _active={{ bg: "gray.500" }}
                    leftIcon={<Icon as={FaGoogle} />}
                    onClick={signInWithGoogle}
                    isLoading={authing}
                >
                    Log In With Google
                </Button>

                <Text color="gray.400">
                    Don't have an account?{" "}
                    <Text as="span" color="purple.400" fontWeight="bold">
                        <a href='/signup'>Sign Up</a>
                    </Text>
                </Text>
            </VStack>
        </Box>
    );
}

export default Login;*/
