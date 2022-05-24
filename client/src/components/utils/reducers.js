import { useReducer } from 'react';

import {
  CREATE_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  DELETE_PLAYLIST,
  CREATE_TRACK,
  DELETE_TRACK,
  UPDATE_TRACK
} from './actions';


export default function reducer(state, action) {
  switch (action.type) {
    case CREATE_PLAYLIST: {
      const newPlaylistId = state.playlists[state.playlists.length - 1].id + 1;

      const newPlaylist = { ...action.payload, id: newPlaylistId };

      return {
        ...state,
        playlists: [...state.playlists, newPlaylist],
      };
    }

    case DELETE_PLAYLIST: {
      return {
        ...state,
        playlists: [...state.playlists].filter(
          (playlist) => playlist.id !== action.payload
        ),
      };
    }
    case ADD_TO_PLAYLIST: {
      const playlistIndex = state.playlists.findIndex(
        (playlist) => playlist.id === action.payload.id
      );

      const updatedPlaylist = {
        ...state.playlists[playlistIndex],
        ...action.payload,
      };

      const newPlaylist = [...state.playlists];

      newPlaylist[playlistIndex] = updatedPlaylist;

      return {
        ...state,
        playlists: newPlaylist,
      };
    }
    
    case CREATE_TRACK: {
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
      };
    }
    
    case UPDATE_TRACK:
      return {
        ...state,
        track: [...action.track],
      };

    case DELETE_TRACK: {
      return {
        ...state,
        tracks: [...state.tracks].filter((track) => track !== action.payload),
      };
    }
    default:
      return state;
  }
}

export function usePlaylistReducer (initialState) {
  return useReducer(reducer, initialState);
}
