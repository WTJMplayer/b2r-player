import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    useDisclosure,
    Button, 
    Box,
    Input,
    FormLabel,
  } from '@chakra-ui/react'


function EditSongDetails(prop) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    return (
      <>
        <Button onClick={onOpen}>Edit</Button>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Song Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing='24px'>
                <Box>
                  <FormLabel htmlFor='songname'>Song Name</FormLabel>
                  <Input
                    ref={firstField}
                    id='songname'
                    placeholder={prop.songname}
                  />
                </Box>
    
                <Box>
                  <FormLabel htmlFor='artistname'>Artist Name</FormLabel>
                  <Input
                    ref={firstField}
                    id='artistname'
                    placeholder={prop.artist}
                  />

                </Box>

                <Box>

                </Box>
              </Stack>
            </ModalBody>
            <ModalFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='blue'>Submit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default EditSongDetails;