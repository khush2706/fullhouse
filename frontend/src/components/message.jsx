import { useEffect, useState, useContext } from "react";
import {
  MessageBox,
  MessageBoxBody,
  MessageBoxHeader,
  MessageInput,
  SendMessage,
} from "../styles/Message.styles";
import { SocketContext } from "../contexts/socket";
import { useParams } from "react-router-dom";

const Message = () => {
  const username = localStorage.getItem("username");
  const { roomId } = useParams();
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", ({ user, msg }) => {
      setMessages((state) => [
        ...state,
        {
          user: user == username ? "You" : user,
          message: msg,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  const sendMessage = (e) => {
    if (userMessage != "") {
      socket.emit("send_message", {
        user: username,
        msg: userMessage,
        roomId: roomId,
      });
      setUserMessage("");
    }
  };
  return (
    <MessageBox>
      <MessageBoxHeader>Chat</MessageBoxHeader>
      <MessageBoxBody>
        {messages.map((msg, index) => {
          return (
            <div key={index} style={{ marginBottom: "10px" }}>
              <b>{msg.user}:</b> {msg.message}
            </div>
          );
        })}
      </MessageBoxBody>
      <SendMessage>
        <MessageInput
          placeholder="Type your message"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              sendMessage();
            }
          }}
        ></MessageInput>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          style={{
            fill: "rgb(37 205 152)",
            transform: "scaleY(-1)",
            cursor: "pointer",
          }}
          onClick={sendMessage}
        >
          <path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></path>
        </svg>
      </SendMessage>
    </MessageBox>
  );
};

export default Message;
