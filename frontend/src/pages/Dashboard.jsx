import { useState, useEffect } from 'react'
import CreateRoomModal from '../components/createRoomModal'
import JoinRoomModal from '../components/joinRoomModal'
import Navbar from '../components/Navbar'
import RoomDiv from '../components/RoomDiv'
import {
  DashboardWrapper,
  DashboardContainer,
  DashboardHeader,
  CreateButton,
  RoomsWrapper
} from '../styles/Dashboard.styles'

const Dashboard = ({ user, token }) => {
  const [rooms, setRooms] = useState(null)
  const [getRoomsError, setGetRoomsError] = useState(null)
  const [openCreateRoomModal, setOpenCreateRoomModal] = useState(false)
  const [openJoinRoomModal, setOpenJoinRoomModal] = useState(false)

  useEffect(() => {
    let myHeaders = new Headers()
    myHeaders.append('auth-token', token)

    let requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    fetch('http://localhost:1337/api/dashboard', requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.err)
          })
        else return res.json()
      })
      .then((result) => {
        setRooms(result.data.roomsData)
      })
      .catch((error) => setGetRoomsError(error.message))
  }, [])

  return (
    <>
      <DashboardWrapper>
        <DashboardContainer>
          <Navbar />
          <DashboardHeader>
            Dashboard
            <div>
              <CreateButton onClick={() => setOpenCreateRoomModal(true)}>Create Room</CreateButton>
              <CreateButton onClick={() => setOpenJoinRoomModal(true)}>Join Room</CreateButton>
            </div>
          </DashboardHeader>
          <RoomsWrapper>
            {rooms ? (
              rooms.map((room) => {
                return (
                  <RoomDiv
                    key={room._id}
                    name={room.name}
                    description={room.description}
                    creator={room.creator}
                    members={room.noOfMembers}
                    room_id={room._id}
                  />
                )
              })
            ) : (
              <>
                {/* <div>{getRoomsError}</div> */}
                <div>Welcome to the dashboard</div>
              </>
            )}
          </RoomsWrapper>
        </DashboardContainer>
      </DashboardWrapper>
      {openCreateRoomModal && <CreateRoomModal close={() => setOpenCreateRoomModal(false)} />}
      {openJoinRoomModal && <JoinRoomModal close={() => setOpenJoinRoomModal(false)} />}
    </>
  )
}

export default Dashboard
