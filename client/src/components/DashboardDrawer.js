import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    SimpleGrid,
    Box,
    Heading,
  } from '@chakra-ui/react';

function DashboardDrawer() {
const { isOpen, onOpen, onClose } = useDisclosure()
const btnRef = React.useRef()

    return (
        <>
        <Button ref={btnRef} colorScheme='blue' onClick={onOpen}>
            My Account
        </Button>
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Account</DrawerHeader>

            <DrawerBody>
                <Button>
                    Edit Account 
                </Button>

                <SimpleGrid columns={1} spacingY='10px'>
                    <Heading as='h4' size='md'>
                        Playlists
                    </Heading>
                    <Button>
                        <Box> Playlist 1</Box>
                    </Button>
                    <Button>
                        <Box> Playlist 2</Box>
                    </Button>
                    <Button>
                        <Box> Playlist 3</Box>
                    </Button>
                    
                </SimpleGrid>


            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button colorScheme={'blue'}>
                    Sign Out
                </Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>
    );
}

export default DashboardDrawer;
