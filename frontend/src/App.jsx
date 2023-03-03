import { useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:1337"); // Add this -- our server will run on port 1337, so we connect to it from here

function App() {

  return (
    <div className="App">
      <h1>Hello World</h1>
      <button onClick={handleClick}>Create Room</button>
    </div>
  );
}

export default App;
