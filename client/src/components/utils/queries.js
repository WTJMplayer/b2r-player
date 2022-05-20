import { gql } from '@apollo/client';

export const QUERY_ALL_TRACKS = gql`
  {
    tracks {
      _id
      title
      artist
      album
      imageSrc
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
        title
        artist
        album
        imageSrc
        audioSrc
        color
      }
    }
  }
`;