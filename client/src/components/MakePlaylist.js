import React, { useState } from "react";
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
  import SongCards from './SongCards';

  function MakePlaylist() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')
    return (
      <>
        <Box onClick={onOpen}>Make a Playlist</Box>
  
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior}>
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
                    placeholder='Please enter a playlist name'
                  />
                </Box>
    
                <Box>
                    <FormLabel htmlFor='songs'>Add your song(s)!</FormLabel>
                    <SongCards />
                </Box>

              </Stack>
            </ModalBody>
  
            <ModalFooter>
                <Button variant='ghost' mr={3} onClick={onClose}>
                    Close
                </Button>
                <Button colorScheme='blue'>
                    Create!
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default MakePlaylist;