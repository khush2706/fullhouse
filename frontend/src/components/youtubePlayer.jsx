import { useEffect, useContext } from "react";
import { SocketContext } from "../contexts/socket";

const YouTubeVideo = ({ roomId }) => {
  let player;
  const socket = useContext(SocketContext);
  let count = 0;

  useEffect(() => {
    // On mount, check to see if the API script is already loaded
    if (!window.YT) {
      // If not, load the script asynchronously
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = loadVideo;

      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      // If script is already there, load the video directly
      loadVideo();
    }
  }, []);

  useEffect(() => {
    socket.on("play_video", () => {
      console.log("playing");
      player.playVideo();
    });

    socket.on("pause_video", () => {
      console.log("pausing");
      player.pauseVideo();
    });

    socket.on("video_seek", () => {
      console.log("seeking");
      // player.seekTo(30, true);
    });
  }, [socket]);

  const loadVideo = () => {
    const id = "AaGK-fj-BAM";

    // the Player object is created uniquely based on the id in props
    player = new window.YT.Player(`youtube-player`, {
      videoId: id,
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerReady = (event) => {
    player.playVideo();
    // player.seekTo(30, true);
  };

  const onPlayerStateChange = (event) => {
    count++;
    if (event.data === 1) {
      socket.emit("play_video", { roomId: roomId });
      if (count === 1) {
        socket.emit("song_started", { roomId: roomId });
      }
    } else if (event.data === 2) {
      socket.emit("pause_video", { roomId: roomId });
    }
  };

  return (
    <div>
      <div id="youtube-player" />
    </div>
  );
};

export default YouTubeVideo;
