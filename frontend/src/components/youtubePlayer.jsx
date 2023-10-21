import { useEffect, useContext, useRef, useState } from 'react'
import { SocketContext } from '../contexts/socket'
import PlaylistContext from '../contexts/playlist'
import YouTube from 'react-youtube'
import QueueContext from '../contexts/queue'

const YouTubeVideo = ({ roomId }) => {
  const socket = useContext(SocketContext)
  const [videoId, setVideoId] = useState('')
  // const videoId = useRef('')
  const { playlistData, updatePlaylistData } = useContext(PlaylistContext)
  const { queueId, updateQueueId } = useContext(QueueContext)
  const token = localStorage.getItem('token')
  const ytplayer = useRef()

  useEffect(() => {
    socket.on('video_play', () => {
      ytplayer.current?.playVideo()
      updatePlaylistData().setIsPlaying(true)
    })

    socket.on('video_pause', () => {
      ytplayer.current?.pauseVideo()
      // ytplayer.current.seekTo(170, true)
      updatePlaylistData().setIsPlaying(false)
    })

    socket.on('ended_song', () => {
      updatePlaylistData().removeTopSong(playlistData)
    })

    return () => {
      socket.off('video_play')
      socket.off('video_pause')
      socket.off('ended_song')
    }
  }, [socket])

  useEffect(() => {
    if (ytplayer.current) {
      try {
        ytplayer.current?.loadVideoById(videoId)
      } catch (err) {
        console.log(err)
      }
    }
  }, [videoId])

  useEffect(() => {
    setVideoId(playlistData[0]?.videoId)
    // videoId.current = playlistData[0]?.videoId
  }, [playlistData])

  const handleVideoChange = () => {
    const headers = new Headers()
    headers.append('auth-token', token)
    headers.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        queueId
      })
    }

    fetch(`http://localhost:1337/api/dashboard/removeTopSong`, requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.err)
          })
        else return res.json()
      })
      .then((res) => {
        socket.emit('song_ended', { roomId })
      })
      .catch((error) => {
        console.log('error', error.message)
      })
  }

  const onPlayerReady = (event) => {
    ytplayer.current = event.target
    console.log({ ytplayer: ytplayer.current })
    event.target?.pauseVideo()
  }

  const onPlayerStateChange = (event) => {
    if (event.data === 1) {
      socket.emit('play_video', { roomId: roomId })
    } else if (event.data === 2) {
      socket.emit('pause_video', { roomId: roomId })
    } else if (event.data === 0) {
      if (localStorage.getItem('username') === localStorage.getItem('admin')) handleVideoChange()
    } 
  }

  let opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1
    }
  }

  return (
    <div>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
        className="youtube_player"
      />
    </div>
  )
}

export default YouTubeVideo
