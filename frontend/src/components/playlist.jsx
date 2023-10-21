import { useState, useContext } from 'react'
import {
  PlaylistBar,
  ProgressBar,
  SingerName,
  SongIdentifierWrapper,
  SongName
} from '../styles/Playlist.styles'
import { Music } from '../../resources/images/svgs/music'
import { UnselectedThumbsUp } from '../../resources/images/svgs/unselectedThumbsUp'
import { UnselectedThumbsDown } from '../../resources/images/svgs/unselectedThumbsDown'
import { PlayButton } from '../../resources/images/svgs/playButton'
import { PauseButton } from '../../resources/images/svgs/pauseButton'
import { PlaylistIcon } from '../../resources/images/svgs/playlistIcon'
import { SoundIcon } from '../../resources/images/svgs/soundIcon'
import { SelectedThumbsDown } from '../../resources/images/svgs/selectedThumbsDown'
import { SelectedThumbsUp } from '../../resources/images/svgs/selectedThumbsUp'
import { SocketContext } from '../contexts/socket'
import Queue from './queue'
import QueueContext from '../contexts/queue'
import PlaylistContext from '../contexts/playlist'

const Playlist = ({ roomId }) => {
  const [upVoted, setUpVoted] = useState(false)
  const [downVoted, setDownVoted] = useState(false)
  const [queueOpen, setQueueOpen] = useState(true)
  const socket = useContext(SocketContext)
  const { playlistData, updatePlaylistData, playing } = useContext(PlaylistContext)
  const token = localStorage.getItem('token')
  const { queueId, updateQueueId } = useContext(QueueContext)

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
        setDownVoted(false)
        setUpVoted(false)
      })
      .catch((error) => {
        console.log('error', error.message)
      })
  }

  return (
    <>
      {queueOpen && <Queue />}
      <PlaylistBar>
        <SongIdentifierWrapper>
          <Music />
          <div>
            <SongName>
              <div className='song_name'>{playlistData[0]?.songTitle}</div>
            </SongName>
            <SingerName>{playlistData[0]?.channelName}</SingerName>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {!upVoted ? (
              <UnselectedThumbsUp
                handleClick={() => {
                  if (!downVoted && !upVoted) {
                    setUpVoted(true)
                  }
                }}
              />
            ) : (
              <SelectedThumbsUp />
            )}
            {!downVoted ? (
              <UnselectedThumbsDown
                handleClick={() => {
                  if (!downVoted && !upVoted) {
                    setDownVoted(true)
                    handleVideoChange()
                  }
                }}
              />
            ) : (
              <SelectedThumbsDown />
            )}
          </div>
        </SongIdentifierWrapper>
        {!playing ? (
          <PlayButton
            handleClick={() => {
              updatePlaylistData().setIsPlaying(true)
              socket.emit('play_video', { roomId: roomId })
            }}
          />
        ) : (
          <PauseButton
            handleClick={() => {
              updatePlaylistData().setIsPlaying(false)
              socket.emit('pause_video', { roomId: roomId })
            }}
          />
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <PlaylistIcon handleClick={() => setQueueOpen(!queueOpen)} />
          <SoundIcon />
          <ProgressBar type="range" min="0" max="100" default="0"></ProgressBar>
        </div>
      </PlaylistBar>
    </>
  )
}

export default Playlist
