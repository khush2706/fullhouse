import {
  CardBody,
  CardFooter,
  CardHeader,
  JoinButton,
  MembersDiv,
  RoomCard
} from '../styles/RoomDiv.style'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../contexts/socket'
import { useContext } from 'react'

const RoomDiv = ({ name, members, description, creator, room_id }) => {
  const navigate = useNavigate()
  const socket = useContext(SocketContext)

  function joinRoom(e) {
    let id = e.target.getAttribute('data-id')
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')

    let myHeaders = new Headers()
    myHeaders.append('auth-token', token)
    myHeaders.append('Content-Type', 'application/json')

    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({
        username: username,
        roomId: id
      })
    }

    fetch('http://localhost:1337/api/dashboard/join', requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.err)
          })
        else return res.json()
      })
      .then((res) => {
        socket.emit('join_room', { roomId: id, username: username })
      })
      .then((res) => {
        navigate(`/dashboard/${id}`)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <RoomCard>
      <CardHeader>
        {name}
        <MembersDiv>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-users"
            style={{ marginRight: 10 }}
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          {members}
        </MembersDiv>
      </CardHeader>
      <CardBody>{description}</CardBody>
      <CardFooter>Made by {creator}</CardFooter>
      <JoinButton data-id={room_id} onClick={joinRoom}>
        Join Room
      </JoinButton>
    </RoomCard>
  )
}

export default RoomDiv
