import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

function DeleteButton() {

    return (
        <>
            <Button colorScheme='red' >
                <CloseIcon />
            </Button>
        </>
    )
}

export default DeleteButton;