import React from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react';
  
  export default function UserProfileEdit(): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
      <Button onClick={onOpen}>Edit Account</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Flex
            align={'center'}
            justify={'center'}
            >
            <Stack
              spacing={4}
              w={'full'}
              maxW={'md'}
              bg={useColorModeValue('white', 'gray.700')}
              rounded={'xl'}
              boxShadow={'lg'}
              p={6}
              my={12}>

              <FormControl id="firstName" isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First Name"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last Name"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: 'gray.500' }}
                  type="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="password"
                  _placeholder={{ color: 'gray.500' }}
                  type="password"
                />
              </FormControl>
            </Stack>
          </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
              bg={'red.400'}
              color={'white'}
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      </>
    );
  }