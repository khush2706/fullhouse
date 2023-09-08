import { useState, useContext, useEffect } from 'react'
import { SearchIcon } from '../../resources/images/svgs/searchIcon'
import { QueueWrapper, QueueCta, SearchBar } from '../styles/Queue.styles'
import QueueContext from '../contexts/queue'
import SongDetailsDiv from './songDetailsDiv'
import { SocketContext } from '../contexts/socket'
import VideoIdContext from '../contexts/videoId'

const Queue = () => {
  const [search, setSearch] = useState('')
  const [videosList, setVideosList] = useState([
    {
      id: '24u3NoPvgMw',
      title: 'Conan Gray - Heather',
      thumbnail: 'https://i.ytimg.com/vi/24u3NoPvgMw/default.jpg',
      channelName: 'ConanGrayVEVO'
    },
    {
      id: 'izge-rLlINE',
      title: 'Conan Gray - Heather (Lyrics)',
      thumbnail: 'https://i.ytimg.com/vi/izge-rLlINE/default.jpg',
      channelName: 'Dan Music'
    },
    {
      id: 'kmAErqIFlY0',
      title: 'Conan Gray - Heather (Lyrics)',
      thumbnail: 'https://i.ytimg.com/vi/kmAErqIFlY0/default.jpg',
      channelName: 'Taj Tracks'
    },
    {
      id: 'GPUg7n8-M6o',
      title: 'Conan Gray - Heather (Lyric Video)',
      thumbnail: 'https://i.ytimg.com/vi/GPUg7n8-M6o/default.jpg',
      channelName: 'ConanGrayVEVO'
    },
    {
      id: 'KEyvsJsREhE',
      title: 'Conan Gray - Heather (Live on The Late Late Show with James Corden)',
      thumbnail: 'https://i.ytimg.com/vi/KEyvsJsREhE/default.jpg',
      channelName: 'ConanGrayVEVO'
    },
    {
      id: '8S1v6iFqBBE',
      title: 'Heather - Conan Gray (Acoustic)',
      thumbnail: 'https://i.ytimg.com/vi/8S1v6iFqBBE/default.jpg',
      channelName: 'Conan Gray'
    }
  ])
  // const [videosList, setVideosList] = useState([])
  const [addSong, setAddSong] = useState(false)
  const [emptyQueue, setEmptyQueue] = useState(false)
  const [songs, setSongs] = useState([])
  const token = localStorage.getItem('token')
  const socket = useContext(SocketContext)
  const { queueId, updateQueueId } = useContext(QueueContext)
  const { videoId, updateVideoId } = useContext(VideoIdContext)

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
        console.log(res)
        if (!res?.data?.songs?.length) setEmptyQueue(true)
        else setSongs(res?.data?.songs)
      })
      .catch((error) => {
        console.log('error', error.message)
      })
  }, [])

  //Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('song_added', ({ songInfo }) => {
      console.log({ songInfo })
      setEmptyQueue(false)
      if (!songs.length) updateVideoId(songInfo.videoId)
      setSongs((state) => [
        ...state,
        {
          title: songInfo.songTitle,
          channelName: songInfo.channelName,
          thumbnailUrl: songInfo.thumbnailUrl,
          videoId: songInfo.videoId,
          addedBy: songInfo.username
        }
      ])
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <QueueCta onClick={() => setAddSong(false)}>Back to Queue</QueueCta>
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
          <div
            style={{
              padding: '1em 16em',
              overflowX: 'hidden',
              overflowY: 'auto'
            }}
          >
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
          >
            {emptyQueue ? (
              <p>Queue is Empty</p>
            ) : (
              songs.length &&
              songs.map((song, index) => {
                return (
                  <SongDetailsDiv
                    key={index}
                    thumbnailUrl={song.thumbnailUrl}
                    title={song.title}
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
