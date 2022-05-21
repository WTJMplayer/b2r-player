import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Image,
  Center,
} from '@chakra-ui/react';

// Set up for card format, will use designated props
function CardItems(props) {
  return (
    <>
      <Flex 
        align='center' 
        justify='center'
        wrap='wrap'
        >
        <Link to={props.path}>
        <Box
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
          >

            <Image
            roundedTop="lg"
            src={ props.src } 
            alt={`Picture of ${props.songname}`}
            />

            <Box>
            <Center>
                <Text fontSize='lg' m={2}> { props.artist } </Text>
            </Center>
            <Center>
                <Text fontSize='lg' m={2}> { props.songname } </Text>
            </Center>
            </Box>

        </Box>
        </Link>
      </Flex>

    </>
  );
}

export default CardItems;
