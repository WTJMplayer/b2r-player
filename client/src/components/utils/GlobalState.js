import React, { createContext, useContext } from "react";
import { usePlaylistReducer } from './reducers'

const PlaylistContext = createContext();
const { Provider } = PlaylistContext;

const PlaylistProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = usePlaylistReducer({
    tracks: [],
    playlists:[],
    currentPlaylist: '',
    currentTrack: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const usePlaylistContext = () => {
  return useContext(PlaylistContext);
};

export { PlaylistProvider, usePlaylistContext };
