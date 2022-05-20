import { gql } from '@apollo/client';

export const QUERY_ALL_TRACKS = gql`
  {
    tracks {
      _id
      name
      artist
      album
      imgSrc
      audioSrc
    }
  }
`;

export const QUERY_ALL_PLAYLISTS = gql`
  {
    Playlists {
      _id
      name
      author
      createdDate
      tracks {
        _id
        name
        artist
        album
        imgSrc
        audioSrc
      }
    }
  }
`;