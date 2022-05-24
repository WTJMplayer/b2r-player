import React, {useState} from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useMutation } from "@apollo/client";
import { DELETE_TRACK } from "./utils/mutation";

function DeleteButton(trackId) {

    const [formState, setFormState] = useState({
        id: trackId.trackId
      });

    const [deleteTrack, { error, data }] = useMutation(DELETE_TRACK);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(trackId)

        setFormState({
            ...formState,
            id: trackId.trackId
          });
        
    
        try {
          const { data } = await deleteTrack({
            variables: { 
              ...formState
              },
    
          });
        } catch (e) {
          console.error(e);
        }
      };

    

    return (
        <>
            <Button colorScheme='red'type= "delete" onClick= {handleFormSubmit}>
                <CloseIcon />
            </Button>
        </>
    )
}

export default DeleteButton;