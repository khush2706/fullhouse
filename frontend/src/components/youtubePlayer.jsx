import { useEffect, useContext, useRef } from 'react'
import { SocketContext } from '../contexts/socket'
import VideoIdContext from '../contexts/videoId'
import YouTube from 'react-youtube'

const YouTubeVideo = ({ roomId }) => {
  const socket = useContext(SocketContext)
  const { videoId, updateVideoId } = useContext(VideoIdContext)
  let count = 0
  const ytplayer = useRef()

  useEffect(() => {
    socket.on('play_video', () => {
      console.log('playing')
      ytplayer.current?.playVideo()
    })

    socket.on('pause_video', () => {
      console.log('pausing')
      ytplayer.current?.pauseVideo()
    })

    socket.on('video_seek', () => {
      console.log('seeking')
      // player.seekTo(30, true);
    })
  }, [socket])

  useEffect(() => {
    if (ytplayer.current) {
      console.log({ ytplayer: ytplayer.current, videoId })
      try {
        ytplayer.current?.loadVideoById(videoId)
      } catch (err) {
        console.log(err)
      }
    }
  }, [videoId])

  const onPlayerReady = (event) => {
    ytplayer.current = event.target
    console.log({ ytplayer: ytplayer.current })
    // event.target?.playVideo();
    // player.seekTo(30, true);
  }

  const onPlayerStateChange = (event) => {
    count++
    if (event.data === 1) {
      socket.emit('play_video', { roomId: roomId })
      if (count === 1) {
        socket.emit('song_started', { roomId: roomId })
      }
    } else if (event.data === 2) {
      socket.emit('pause_video', { roomId: roomId })
    }
  }

  let opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
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
      />
    </div>
  )
}

export default YouTubeVideo
