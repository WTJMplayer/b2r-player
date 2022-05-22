import React from "react";
import MakePlaylistForm from './forms/MakePlaylistForm';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
  } from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'



function AddToPlaylist() {

    return(
        <Menu>
        <MenuButton as={Button}>
            <AddIcon />
        </MenuButton>
        <MenuList>
            <MenuItem>Playlist 1</MenuItem>
            <MenuItem>Playlist 2</MenuItem>
            <MenuItem>Playlist 3</MenuItem>
            <MenuItem> <MakePlaylistForm /> </MenuItem>
        </MenuList>
        </Menu>
    );
}

export default AddToPlaylist;