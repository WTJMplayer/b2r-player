import React from "react";
import MakePlaylist from './MakePlaylist';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
  } from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'



function AddToPlaylist() {

    return(
        <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Add to Playlist
        </MenuButton>
        <MenuList>
            <MenuItem>Playlist 1</MenuItem>
            <MenuItem>Playlist 2</MenuItem>
            <MenuItem>Playlist 3</MenuItem>
            <MenuItem> <MakePlaylist /> </MenuItem>
        </MenuList>
        </Menu>
    );
}

export default AddToPlaylist;