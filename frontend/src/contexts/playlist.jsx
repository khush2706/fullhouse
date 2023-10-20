import { createContext, useState } from 'react'

const PlaylistContext = createContext()

export default PlaylistContext

export function PlaylistProvider({ children }) {
  const [playlistData, setPlaylistData] = useState([])

  const updatePlaylistData = () => {
    function addNewSong(newSong) {
      setPlaylistData((state) => [...state, newSong])
    }

    function removeTopSong(playlistData) {
      // const _playlistData = [...playlistData];
      // _playlistData.shift();
      // console.log({_playlistData}, 'removed top song')
      // setPlaylistData(_playlistData)
      setPlaylistData((state) => {
        console.log(state, 'removing top song')
        return state.slice(1,state.length)
      })
    }

    function setPlaylistSongsfromDb(songsList) {
      console.log({songsList}, 'songs from db')
      setPlaylistData((state) => {return [...songsList]})
    }

    return{
      addNewSong, removeTopSong, setPlaylistSongsfromDb
    }
  }
  return (
    <PlaylistContext.Provider value={{ playlistData, updatePlaylistData }}>
      {children}
    </PlaylistContext.Provider>
  )
}
