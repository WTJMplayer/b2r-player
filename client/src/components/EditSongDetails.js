import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TRACK } from "./utils/mutation";
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


function EditSongDetails(trackId) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [formState, setFormState] = useState({
      title: "",
      artist: ""
    });

    const [updateTrack, { error, data }] = useMutation(UPDATE_TRACK);

    const handleChange = (event) => {
      const { name, value } = event.target;
           
      setFormState({
        ...formState,
        [name]: value,
        id: trackId.trackId
      });

    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      
  
      try {
        const { data } = await updateTrack({
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
                    name="title"
                    value={formState.title}
                    onChange = {handleChange}
                  />
                </Box>
    
                <Box>
                  <FormLabel htmlFor='artistname'>Artist Name</FormLabel>
                  <Input
                    ref={firstField}
                    id='artistname'
                    name="artist"
                    value={formState.artist}
                    onChange ={handleChange}
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
                <Button 
                  colorScheme='blue' 
                  onClick={handleFormSubmit}
                  type= "submit"
                  >Submit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default EditSongDetails;