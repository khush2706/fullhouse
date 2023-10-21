import { useState, useContext, useEffect } from 'react'
import { SearchIcon } from '../../resources/images/svgs/searchIcon'
import { QueueWrapper, QueueCta, SearchBar } from '../styles/Queue.styles'
import QueueContext from '../contexts/queue'
import SongDetailsDiv from './songDetailsDiv'
import { SocketContext } from '../contexts/socket'
import PlaylistContext from '../contexts/playlist'

const Queue = () => {
  const [search, setSearch] = useState('')
  const [videosList, setVideosList] = useState([
    // {
    //   id: '24u3NoPvgMw',
    //   title: 'Conan Gray - Heather',
    //   thumbnail: 'https://i.ytimg.com/vi/24u3NoPvgMw/default.jpg',
    //   channelName: 'ConanGrayVEVO'
    // },
    // {
    //   id: 'izge-rLlINE',
    //   title: 'Conan Gray - Heather (Lyrics)',
    //   thumbnail: 'https://i.ytimg.com/vi/izge-rLlINE/default.jpg',
    //   channelName: 'Dan Music'
    // },
    // {
    //   id: 'kmAErqIFlY0',
    //   title: 'Conan Gray - Heather (Lyrics)',
    //   thumbnail: 'https://i.ytimg.com/vi/kmAErqIFlY0/default.jpg',
    //   channelName: 'Taj Tracks'
    // },
    // {
    //   id: 'GPUg7n8-M6o',
    //   title: 'Conan Gray - Heather (Lyric Video)',
    //   thumbnail: 'https://i.ytimg.com/vi/GPUg7n8-M6o/default.jpg',
    //   channelName: 'ConanGrayVEVO'
    // },
    // {
    //   id: 'KEyvsJsREhE',
    //   title: 'Conan Gray - Heather (Live on The Late Late Show with James Corden)',
    //   thumbnail: 'https://i.ytimg.com/vi/KEyvsJsREhE/default.jpg',
    //   channelName: 'ConanGrayVEVO'
    // },
    // {
    //   id: '8S1v6iFqBBE',
    //   title: 'Heather - Conan Gray (Acoustic)',
    //   thumbnail: 'https://i.ytimg.com/vi/8S1v6iFqBBE/default.jpg',
    //   channelName: 'Conan Gray'
    // }
  ])
  // const [videosList, setVideosList] = useState([])
  const [addSong, setAddSong] = useState(false)
  const [emptyQueue, setEmptyQueue] = useState(false)
  const token = localStorage.getItem('token')
  const socket = useContext(SocketContext)
  const { queueId, updateQueueId } = useContext(QueueContext)
  const { playlistData, updatePlaylistData } = useContext(PlaylistContext)

  useEffect(() => {
    const headers = new Headers()
    headers.append('auth-token', token)
    headers.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'get',
      headers
    }

    fetch(`http://localhost:1337/api/dashboard/queue/${queueId}`, requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.err)
          })
        else return res.json()
      })
      .then((res) => {
        if (!res?.data?.songs?.length) setEmptyQueue(true)
        else {
          updatePlaylistData().setPlaylistSongsfromDb(res?.data?.songs)
        }
      })
      .catch((error) => {
        console.log('error', error.message)
      })
  }, [])

  //Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('song_added', ({ songInfo }) => {
      if(!playlistData.length)
      setEmptyQueue(false)
      const newSong = {
        songTitle: songInfo.songTitle,
        channelName: songInfo.channelName,
        thumbnailUrl: songInfo.thumbnailUrl,
        videoId: songInfo.videoId,
        addedBy: songInfo.username
      }
      updatePlaylistData().addNewSong(newSong)
    })

    // Remove event listener on component unmount
    return () => socket.off('song_added')
  }, [socket])

  const searchSong = () => {
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
    const myHeaders = new Headers()
    myHeaders.append('Accept', 'application/json')
    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }
    setVideosList([])
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${search}&key=${API_KEY}`

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const items = result.items
        items.forEach((item) => {
          console.log({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.default.url,
            channelName: item.snippet.channelTitle
          })
          setVideosList((state) => [
            ...state,
            {
              id: item.id.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.default.url,
              channelName: item.snippet.channelTitle
            }
          ])
        })
        console.log(videosList)
      })
      .then((res) => {
        console.log(videosList)
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <QueueWrapper>
      {addSong && (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }} className='search_wrapper'>
            <QueueCta onClick={() => setAddSong(false)} className='cta'>Back</QueueCta>
            <div className='search_bar'>
            <SearchBar
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              placeholder="Search Song"
            />
            <div onClick={searchSong}>
              <SearchIcon />
            </div>
            </div>
          </div>
          <div
            style={{
              padding: '1em 16em',
              overflowX: 'hidden',
              overflowY: 'auto'
            }}
            className='songsDiv_wrapper'>
            {videosList.size != 0 &&
              videosList.map((video, index) => {
                return (
                  <SongDetailsDiv
                    key={index}
                    thumbnailUrl={video.thumbnail}
                    title={video.title}
                    channelName={video.channelName}
                    dataId={video.id}
                  />
                )
              })}
          </div>
        </>
      )}
      {!addSong && (
        <>
          <QueueCta onClick={() => setAddSong(true)}>Add Song</QueueCta>
          <div
            style={{
              padding: '1em 16em',
              overflowX: 'hidden',
              overflowY: 'auto',
              color: 'white'
            }}
            className='queueDiv'>
            {emptyQueue && !playlistData.length ? (
              <p>Queue is Empty</p>
            ) : (
              playlistData.length &&
              playlistData.map((song, index) => {
                return (
                  <SongDetailsDiv
                    key={index}
                    thumbnailUrl={song.thumbnailUrl}
                    title={song.songTitle}
                    channelName={song.channelName}
                    videoId={song.videoId}
                    addedBy={song.addedBy}
                  />
                )
              })
            )}
          </div>
        </>
      )}
    </QueueWrapper>
  )
}

export default Queue
