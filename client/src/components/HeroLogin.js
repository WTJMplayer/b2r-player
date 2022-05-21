import React, { useState } from 'react';
import '../App.css';
import './HeroLogin.css';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  FormLabel,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);

function HeroSection() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const { isOpen, onOpen, onClose } = useDisclosure()

  // const [userName, setUserName] = useState('');
  // const [password, setPassword] = useState('');

  // const handleInputChange = (e) => {
  //   const { target } = e;
  //   const inputType = target.name;
  //   const inputValue = target.value;

  //   if (inputType === 'userName') {
  //     setUserName(inputValue);
  //   } else {
  //     setPassword(inputValue);
  //   }
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   setUserName('');
  //   setPassword('');
  // };

  return (
    // <div className='hero-container'>
    //   <h1>Bach 2 Rock</h1>
    //   <div className='hero-btns'>
    //   <form className="form">
    //     <input
    //       value={userName}
    //       name="userName"
    //       onChange={handleInputChange}
    //       type="text"
    //       placeholder="username"
    //     />
    //     <input
    //       value={password}
    //       name="password"
    //       onChange={handleInputChange}
    //       type="password"
    //       placeholder="Password"
    //     />
    //   </form>
    //     <Button
    //       className='btns'
    //       buttonStyle='btn--outline'
    //       buttonSize='btn--large'
    //       onClick={handleFormSubmit}
    //     >
    //       Login
    //     </Button>
    //   </div>
    // </div>

    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
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
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" />
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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
              >
                Login
              </Button>
            </Stack>
        </Box>
      </Stack>

      {/* Modal for sign up */}
      <Box>
        <Button colorScheme='blue' onClick={onOpen} >Sign Up here!</Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sign Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Sign up!</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>

  );
}

export default HeroSection;