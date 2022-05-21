import {gql} from '@apollo/client'


export const LOG = gql `
    
    mutation login($email: String!, $password:String!){
        login(email: $email, password: $password){
            token
            profile{
                _id
                name
                email
            }
        }
    }
`

export const ADD_PROFILE = gql`
  mutation addProfile(
    $name: String!,
    $email: String!,
    $password: String!
  ) {
    addProfile(
      name: $name,
      email: $email,
      password: $password
    ) {
      token
      profile {
        _id
        name
        email
      }
    }
  }
`
export const ADD_PLAYLIST = gql`
  mutation addPlaylist(
    $name: String!,
    $author: String!,
    $createdDate: Date!
    ) {
    addPlaylist(
      name: $name,
      author: $author,
      createdDate: $createdDate,
      ) {
      name
      author
      createdDate
      tracks {
        _id
        title
        artist
        album
        image
        audioSrc
      }
    }
  }
`;

export const ADD_TRACK = gql`
  mutation addTrack(
    $title: String!,
    $artist: String!,
    $album: String!,
    $image: String!,
    $audioSrc: String!
    ) {
    addTrack(
      title: $title,
      artist: $artist,
      album: $album,
      image: $image,
      audioSrc: $audioSrc
      ) {
      title
      artist
      album
      image
      audioSrc
    }
  }
`;