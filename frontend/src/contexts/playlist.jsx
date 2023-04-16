import { createContext, useState } from "react";

const PlaylistContext = createContext();

export default PlaylistContext;

export function PlaylistProvider({ children }) {
  const [playlistData, setPlaylistData] = useState(localStorage.getItem('playlist-data'))

  const updatePlaylistData  = (playlistData) => {
    setPlaylistData(playlistData)
  }
  return (
    <PlaylistContext.Provider value={{ playlistData, updatePlaylistData }}>
      {children}
    </PlaylistContext.Provider>
  )
}