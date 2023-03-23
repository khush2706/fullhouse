import { useState, useContext } from "react";
import {
  PlaylistBar,
  ProgressBar,
  SingerName,
  SongIdentifierWrapper,
  SongName,
} from "../styles/Playlist.styles";
import { Music } from "../../resources/images/svgs/music";
import { UnselectedThumbsUp } from "../../resources/images/svgs/unselectedThumbsUp";
import { UnselectedThumbsDown } from "../../resources/images/svgs/unselectedThumbsDown";
import { PlayButton } from "../../resources/images/svgs/playButton";
import { PauseButton } from "../../resources/images/svgs/pauseButton";
import { PlaylistIcon } from "../../resources/images/svgs/playlistIcon";
import { SoundIcon } from "../../resources/images/svgs/soundIcon";
import { SelectedThumbsDown } from "../../resources/images/svgs/selectedThumbsDown";
import { SelectedThumbsUp } from "../../resources/images/svgs/selectedThumbsUp";
import { SocketContext } from "../contexts/socket";
import Queue from "./queue";

const Playlist = ({ roomId }) => {
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [playing, setPlaying] = useState(true);
	const [queueOpen, setQueueOpen] = useState(false);
  const socket = useContext(SocketContext);

  return (
    <>
		{queueOpen && <Queue />}
      <PlaylistBar>
        <SongIdentifierWrapper>
          <Music />
          <div>
            <SongName>Perfect</SongName>
            <SingerName>Ed Sheeran</SingerName>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!upVoted ? (
              <UnselectedThumbsUp
                handleClick={() => {
                  if (!downVoted && !upVoted) {
                    setUpVoted(true);
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
                    setDownVoted(true);
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
              setPlaying(true);
              socket.emit("play_video", { roomId: roomId });
            }}
          />
        ) : (
          <PauseButton
            handleClick={() => {
              setPlaying(false);
              socket.emit("pause_video", { roomId: roomId });
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlaylistIcon handleClick={()=>setQueueOpen(!queueOpen)} />
          <SoundIcon />
          <ProgressBar type="range" min="0" max="100" default="0"></ProgressBar>
        </div>
      </PlaylistBar>
    </>
  );
};

export default Playlist;
