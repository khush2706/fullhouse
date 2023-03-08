import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RoomDiv from "../components/RoomDiv";
import {
  DashboardWrapper,
  DashboardContainer,
  DashboardHeader,
  CreateButton,
  RoomsWrapper,
} from "../styles/Dashboard.styles";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, token }) => {
  const [rooms, setRooms] = useState();
  const navigate = useNavigate();

  function joinRoom(e) {
    let id = e.target.getAttribute("data-id");

    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({
        username: user.username,
        roomId: id,
      }),
    };

    fetch("http://localhost:1337/api/dashboard/join", requestOptions)
      .then(async (res) => {
        let data = await res.json();
        if (!res.ok) throw new Error(data.error);
        else return data;
      })
      .then((res) => {
        console.log(res);
        navigate(`/dashboard/${id}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch("http://localhost:1337/api/dashboard", requestOptions)
      .then(async (res) => {
        let data = await res.json();
        if (!res.ok) throw new Error(data.error);
        else return data;
      })
      .then((result) => {
        if (result.data.roomsData.length !== 0) setRooms(result.data.roomsData);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <DashboardWrapper>
      <DashboardContainer>
        <Navbar />
        <DashboardHeader>
          ROOMS
          <div>
            <CreateButton>Create Room</CreateButton>
            <CreateButton>Join Room</CreateButton>
          </div>
        </DashboardHeader>
        <RoomsWrapper>
          {rooms &&
            rooms.map((room) => {
              return (
                <RoomDiv
                  key={room._id}
                  name={room.name}
                  description={room.description}
                  creator={room.creator}
                  members={room.noOfMembers}
                  room_id={room._id}
                  joinRoom={joinRoom}
                />
              );
            })}
          {!rooms && <div>No rooms found</div>}
        </RoomsWrapper>
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;
