import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOG } from "../utils/mutation";
import Auth from "../utils/auth";

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  InputRightElement,
  Center,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import SignupForm from "./SignupForm";

const CFaUserAlt = chakra(FaUserAlt);

const CFaLock = chakra(FaLock);

const LoginForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [login, { error, data }] = useMutation(LOG);

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    setFormState({
      ...formState,
      [inputType]: inputValue,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
     const { data } = await login({
        variables: {
          ...formState,
        },
      });
      
    Auth.login(data.login.token);
     
    } catch (err) {
      console.log(err);
    }
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Flex
      flexDirection="column"
      width="70wh"
      height="70vh"
      backgroundColor="black"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="white">Wanna Jam To Music</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
            rounded='lg'
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  onChange={handleInputChange}
                  type="email"
                  value={formState.email}
                  placeholder="Enter Your Email address"
                  name="email"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  onChange={handleInputChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  value={formState.password}
                  name="password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="blue"
              width="full"
              onClick={handleFormSubmit}
            >
              Login
            </Button>
          </Stack>
          <Center pt={3}>
            <SignupForm />
          </Center>
          
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
