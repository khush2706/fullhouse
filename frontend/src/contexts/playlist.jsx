import { createContext, useState } from 'react'

const PlaylistContext = createContext()

export default PlaylistContext

export function PlaylistProvider({ children }) {
  const [playlistData, setPlaylistData] = useState([])
  const [playing, setPlaying] = useState(false)

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

    function setIsPlaying(boolValue) {
      setPlaying((state) => {return boolValue})
    }

    return{
      addNewSong, removeTopSong, setPlaylistSongsfromDb, setIsPlaying
    }
  }
  return (
    <PlaylistContext.Provider value={{ playlistData, playing, updatePlaylistData }}>
      {children}
    </PlaylistContext.Provider>
  )
}
