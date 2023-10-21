import { useEffect, useState, useContext, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  RoomContainer,
  RoomCreator,
  RoomHeader,
  RoomId,
  RoomName,
  RoomNameWrapper,
  RoomWrapper,
  WideButton
} from '../styles/Room.styles'
import { SocketContext } from '../contexts/socket'
import { useParams } from 'react-router-dom'
import Message from '../components/message'
import YouTubeVideo from '../components/youtubePlayer'
import Playlist from '../components/playlist'
import QueueContext from '../contexts/queue'
import PlaylistContext from '../contexts/playlist'

const Room = () => {
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')
  const { roomId } = useParams()
  const socket = useContext(SocketContext)
  const { queueId, updateQueueId } = useContext(QueueContext)
  const [error, setError] = useState(null)
  const [roomDetails, setRoomDetails] = useState({})
  const navigate = useNavigate()
  const [joinQueue, setJoinQueue] = useState(false)
  const { playlistData, updatePlaylistData } = useContext(PlaylistContext)

  const JoinQueue = useCallback(() => {
    const headers = new Headers()
    headers.append('auth-token', token)
    headers.append('Content-Type', 'application/json')

    const body_data = {
      username,
      queueId: roomDetails.queue
    }

    const requestOptions = {
      method: 'post',
      headers,
      body: JSON.stringify(body_data)
    }

    if (roomDetails) {
      fetch(`http://localhost:1337/api/dashboard/joinQueue`, requestOptions)
        .then((res) => {
          if (!res.ok)
            return res.json().then((data) => {
              throw new Error(data.err)
            })
          else return res.json()
        })
        .then((res) => {
          setJoinQueue(true)
        })
        .catch((error) => {
          console.log('error', error.message)
        })
    }
  }, [roomDetails])

  useEffect(() => {
    const myHeaders = new Headers()
    myHeaders.append('auth-token', token)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    fetch(`http://localhost:1337/api/dashboard/room/${roomId}`, requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.err)
          })
        else return res.json()
      })
      .then((result) => {
        updateQueueId(result.data.queue)
        setRoomDetails(result.data)
        localStorage.setItem('admin', result.data.createdBy)
      })
      .then((res) => {
        socket.emit('join_room', { roomId: roomId, username: username })
      })
      .catch((error) => {
        console.log('error', error.message)
        setError(error.message)
      })
  }, [])

  function handleLeave() {
    let myHeaders = new Headers()
    myHeaders.append('auth-token', token)
    myHeaders.append('Content-Type', 'application/json')

    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({
        username: username,
        roomId: roomId
      })
    }

    fetch('http://localhost:1337/api/dashboard/leave', requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.error)
          })
        else return res.json()
      })
      .then((res) => {
        console.log(res)
        navigate(`/dashboard`)
      })
      .catch((error) => {
        // setError(error.message)
        console.log(error)
      })
  }

  return (
    <RoomWrapper>
      {error && <div style={{ color: 'red', fontSize: '30px' }}>{error}</div>}
      {!error && (
        <RoomContainer>
          <RoomHeader>
            <RoomNameWrapper>
              <RoomName>{roomDetails.name}</RoomName>
              <RoomCreator>{`Made by ${roomDetails.createdBy}`}</RoomCreator>
              <RoomId>{`Room Id: ${roomDetails.roomId}`}</RoomId>
            </RoomNameWrapper>
            <Button onClick={handleLeave}>Leave</Button>
          </RoomHeader>
          {joinQueue && playlistData.length && (
            <div style={{ marginLeft: '150px', marginTop: '50px' }} className="youtube_container">
              <YouTubeVideo roomId={roomId} />
            </div>
          )}
          {!joinQueue && (
            <div
              style={{
                marginLeft: '150px',
                marginTop: '50px',
                display: 'flex',
                alignItems: 'center',
                height: '50%'
              }}>
              <WideButton onClick={JoinQueue}>Join Queue</WideButton>
            </div>
          )}
          <Message />
          {joinQueue && <Playlist roomId={roomId} />}
        </RoomContainer>
      )}
    </RoomWrapper>
  )
}

export default Room
