import { useEffect, useState, useContext, useCallback } from "react";
import {
  Button,
  RoomContainer,
  RoomCreator,
  RoomHeader,
  RoomId,
  RoomName,
  RoomNameWrapper,
  RoomWrapper,
  WideButton,
} from "../styles/Room.styles";
import { SocketContext } from "../contexts/socket";
import { useParams } from "react-router-dom";
import Message from "../components/message";
import YouTubeVideo from "../components/youtubePlayer";
import Playlist from "../components/playlist";
import QueueContext from "../contexts/queue";

const Room = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const { roomId } = useParams();
  const socket = useContext(SocketContext);
  const {queueId, updateQueueId} = useContext(QueueContext);
  const [error, setError] = useState(null);
  const [roomDetails, setRoomDetails] = useState({});
  const [joinQueue, setJoinQueue] = useState(false);

  const JoinQueue = useCallback(() => {

    const headers = new Headers();
    headers.append("auth-token", token);
    headers.append("Content-Type", "application/json");

    const body_data = {
      username,
      queueId: roomDetails.queue,
    };

    const requestOptions = {
      method: "post",
      headers,
      body: JSON.stringify(body_data),
    };

    if (roomDetails) {
      fetch(`http://localhost:1337/api/dashboard/joinQueue`, requestOptions)
        .then((res) => {
          if (!res.ok)
            return res.json().then((data) => {
              throw new Error(data.err);
            });
          else return res.json();
        })
        .then((res) => {
          console.log(res);
          setJoinQueue(true);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  }, [roomDetails]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("auth-token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`http://localhost:1337/api/dashboard/room/${roomId}`, requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.err);
          });
        else return res.json();
      })
      .then((result) => {
        console.log(result);
        updateQueueId(result.data.queue);
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
          {joinQueue && (
            <div style={{ marginLeft: "150px", marginTop: "50px" }}>
              <YouTubeVideo roomId={roomId} />
            </div>
          )}
          {!joinQueue && (
            <div
              style={{
                marginLeft: "150px",
                marginTop: "50px",
                display: "flex",
                alignItems: "center",
                height: "50%",
              }}
            >
              <WideButton onClick={JoinQueue}>Join Queue</WideButton>
            </div>
          )}
          <Message />
          {joinQueue && <Playlist roomId={roomId} />}
        </RoomContainer>
      )}
    </RoomWrapper>
  );
};

export default Room;
