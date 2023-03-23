import { useEffect, useState, useContext } from "react";
import {
  Button,
  RoomContainer,
  RoomCreator,
  RoomHeader,
  RoomId,
  RoomName,
  RoomNameWrapper,
  RoomWrapper,
} from "../styles/Room.styles";
import { SocketContext } from "../contexts/socket";
import { useParams } from "react-router-dom";
import Message from "../components/message";
import YouTubeVideo from "../components/youtubePlayer";
import Playlist from "../components/playlist";

const Room = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const { roomId } = useParams();
  const socket = useContext(SocketContext);
  const [error, setError] = useState(null);
  const [roomDetails, setRoomDetails] = useState("");

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("auth-token", token);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`http://localhost:1337/api/dashboard/${roomId}`, requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.err);
          });
        else return res.json();
      })
      .then((result) => {
        // console.log(result);
        setRoomDetails(result.data);
      })
      .then((res) => {
        socket.emit("join_room", { roomId: roomId, username: username });
      })
      .catch((error) => {
        console.log("error", error.message);
        setError(error.message);
      });
  }, []);

  return (
    <RoomWrapper>
      {error && <div style={{ color: "red", fontSize: "30px" }}>{error}</div>}
      {!error && (
        <RoomContainer>
          <RoomHeader>
            <RoomNameWrapper>
              <RoomName>{roomDetails.name}</RoomName>
              <RoomCreator>{`Made by ${roomDetails.createdBy}`}</RoomCreator>
              <RoomId>{`Room Id: ${roomDetails.roomId}`}</RoomId>
            </RoomNameWrapper>
            <Button>Leave</Button>
          </RoomHeader>
          <div style={{marginLeft: "150px", marginTop: "50px"}}>
            <YouTubeVideo roomId={roomId}/>
          </div>
          <Message />
          <Playlist roomId={roomId} />
        </RoomContainer>
      )}
    </RoomWrapper>
  );
};

export default Room;
