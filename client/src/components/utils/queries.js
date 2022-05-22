import { gql } from '@apollo/client';

export const QUERY_ALL_TRACKS = gql`
  {
    tracks {
      _id
      title
      artist
      album
      explicit
      image
      audioSrc
      color
    }
  }
`;

export const QUERY_ALL_PLAYLISTS = gql`
  {
    playlists {
      _id
      name
      author {
        _id
      }
      createdDate
      tracks {
        _id
        title
        artist
        album
        explicit
        image
        audioSrc
        color
      }
    }
  }
`;

export const QUERY_PLAYLIST_BY_ID = gql`
query Playlist($id: ID!) {
  playlist(_id: $id) {
    _id
    name
    author {
      _id
    }
    createdDate
    tracks {
      _id
      title
      artist
      album
      explicit
      image
      audioSrc
      color
    }
  }
}
`;

export const QUERY_TRACK_BY_ID = gql`
query Track($id: ID!) {
  Track(_id: $id) {
    _id
    title
    artist
    album
    explicit
    image
    audioSrc
    color
  }
}
`;