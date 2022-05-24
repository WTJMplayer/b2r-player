import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PLAYLIST } from "../utils/mutation/index";
import Auth from "../utils/auth";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack, 
    FormLabel,
    useDisclosure,
    Box, 
    Input, 
    Button,
  } from '@chakra-ui/react'

  function MakePlaylist() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')
    const [formState, setFormState] = useState({
      name: "",
      author: ""
    });

    const [addPlaylist, { error, data }] = useMutation(ADD_PLAYLIST);

    const handleChange = (event) => {
      const { name, value } = event.target;
      const authorId = Auth.getProfile();
      console.log(authorId.data._id)
  
      setFormState({
        [name]: value,
        author: authorId.data._id
      });

    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      
  
      try {
        const { data } = await addPlaylist({
          variables: { 
            ...formState,
            },
  
        });
      } catch (e) {
        console.error(e);
      }
    };
    

    
    return (
      <>
        <Box onClick={onOpen}>Make a Playlist</Box>
  
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader borderBottomWidth='1px'>Make a Playlist</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing='24px'>
                <Box>
                  <FormLabel htmlFor='playlist-name'>Playlist Name</FormLabel>
                  <Input
                    ref={firstField}
                    id='playlist-name'
                    name="name"
                    value={formState.name}
                    placeholder='Please enter a playlist name'
                    onChange={handleChange}
                  />
                </Box>
              </Stack>
            </ModalBody>
  
            <ModalFooter>
                <Button 
                  variant='ghost' 
                  mr={3} 
                  onClick={onClose}
                  >
                    Close
                </Button>
                <Button 
                  colorScheme='blue'
                  onClick={handleFormSubmit}>
                    Create!
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default MakePlaylist;