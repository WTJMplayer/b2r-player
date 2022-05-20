import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box, 
  Stack, 
  FormLabel, 
  Button,
  Input, 
} from '@chakra-ui/react'
import AudioUpload from "./AudioUpload";

function SongDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
  
    return (
      <>
        <Button colorScheme='blue' onClick={onOpen}>
          Add a song
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              Add a new song
            </DrawerHeader>
  
            <DrawerBody>
              <Stack spacing='24px'>
                <Box>
                  <FormLabel htmlFor='songname'>Song Name</FormLabel>
                  <Input
                    ref={firstField}
                    id='songname'
                    placeholder='Please enter song name'
                  />
                </Box>
    
                <Box>
                  <FormLabel htmlFor='artistname'>Artist Name</FormLabel>
                  <Input
                    ref={firstField}
                    id='artistname'
                    placeholder='Please enter artist name'
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor='uploadSong'> Upload Song file </FormLabel>
                  <Button colorScheme={'blue'}>
                    <AudioUpload />
                  </Button>
                </Box>
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth='1px'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Submit Song</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default SongDrawer;