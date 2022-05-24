import React from "react";
import MakePlaylistForm from './forms/MakePlaylistForm';
import PlaylistItem from './PlaylistItem';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PLAYLISTS } from './utils/queries';
import { useMutation } from "@apollo/client";
import { ADD_TO_PLAYLIST } from "./utils/mutation/index";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    VStack
  } from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'



function AddToPlaylist() {
  const { data } = useQuery(QUERY_ALL_PLAYLISTS);
  const playlists = data?.playlists || [];
  console.log(playlists)

//   const [formState, setFormState] = useState({
//     _id: "",
//     trackId: ""
//   });
//   const [addToPlaylist, { error, datas }] = useMutation(ADD_TO_PLAYLIST);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     const trackId = track._id
//     console.log(trackId)

//     setFormState({
//       [name]: value,
//       trackId: trackId
//     });

//   };



    return(
        <Menu>
        <MenuButton as={Button}>
            <AddIcon />
        </MenuButton>
        <MenuList>
            <MenuItem>
            <VStack>
                <PlaylistItem playlists={playlists}/>
            </VStack>    
            </MenuItem>
            <MenuItem> <MakePlaylistForm /> </MenuItem>
        </MenuList>
        </Menu>
    );
}

export default AddToPlaylist;