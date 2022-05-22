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
    Stack,
  } from '@chakra-ui/react';
import UserProfileEdit from './forms/EditAccountForm';

function DashboardDrawer() {
const { isOpen, onOpen, onClose } = useDisclosure()
const btnRef = React.useRef()

    return (
        <>
        <Box ref={btnRef} onClick={onOpen}>
            My Account
        </Box>
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
                My Account
            </DrawerHeader>

            <DrawerBody>
                <Stack spacing='24px'>
                <Button>
                    <UserProfileEdit />
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

                </Stack>
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
