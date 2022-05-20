import { useReducer } from 'react';

export const reducer = (state, action) => {
    
  };

export function usePlaylistReducer(initialState) {
    return useReducer(reducer, initialState);
  }