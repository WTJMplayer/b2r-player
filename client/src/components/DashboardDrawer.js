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
    VStack,
  } from '@chakra-ui/react';
import UserProfileEdit from './forms/EditAccountForm';
import PlaylistItem from './PlaylistItem';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PLAYLISTS } from './utils/queries';
import Auth from './utils/auth'


function DashboardDrawer() {
const { isOpen, onOpen, onClose } = useDisclosure()
const btnRef = React.useRef()
const { data } = useQuery(QUERY_ALL_PLAYLISTS);
const playlists = data?.playlists || [];
console.log(playlists)

const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

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
                {/* <Button>
                    <UserProfileEdit />
                </Button> */}

                <Heading as='h4' size='md'>
                    Playlists
                </Heading>
                <VStack>

                <PlaylistItem playlists={playlists}/>
                    
                </VStack>

                </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button colorScheme={'blue'} onClick={logout}>
                    Sign Out
                </Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>
    );
}

export default DashboardDrawer;
