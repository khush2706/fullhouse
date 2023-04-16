import { useState, useContext, useEffect } from "react";
import { SearchIcon } from "../../resources/images/svgs/searchIcon";
import { QueueWrapper, QueueCta, SearchBar } from "../styles/Queue.styles";
import QueueContext from "../contexts/queue";
import SongDetailsDiv from "./songDetailsDiv";

const Queue = () => {
  const [search, setSearch] = useState("");
  const [videosList, setVideosList] = useState([]);
  const [addSong, setAddSong] = useState(false);
  const token = localStorage.getItem("token");
  const { queueId, updateQueueId } = useContext(QueueContext);

  useEffect(() => {
    const headers = new Headers();
    headers.append("auth-token", token);
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "get",
      headers,
    };

    fetch(
      `http://localhost:1337/api/dashboard/queue/${queueId}`,
      requestOptions
    )
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.err);
          });
        else return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  }, []);

  const searchSong = () => {
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    setVideosList([]);
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${search}&key=${API_KEY}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const items = result.items;
        items.forEach((item) => {
          console.log(item.id.videoId);
          setVideosList((state) => [
            ...state,
            {
              id: item.id.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.default.url,
              channelName: item.snippet.channelTitle,
            },
          ]);
        });
      })
      .then((res) => {
        console.log(videosList);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <QueueWrapper>
      {addSong && (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <QueueCta onClick={() => setAddSong(false)}>Back to Queue</QueueCta>
            <SearchBar
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search Song"
            />
            <div onClick={searchSong}>
              <SearchIcon />
            </div>
          </div>
          <div
            style={{
              padding: "1em 16em",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {videosList.size != 0 &&
              videosList.map((video, index) => {
                return (
                  <SongDetailsDiv
                    key={index}
                    thumbnailUrl={video.thumbnail}
                    title={video.title}
                    channelName={video.channelName}
                    dataId={video.id}
                  />
                );
              })}
          </div>
        </>
      )}
      {!addSong && (
        <>
          <QueueCta onClick={() => setAddSong(true)}>Add Song</QueueCta>
          <div
            style={{
              padding: "1em 16em",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          ></div>
        </>
      )}
    </QueueWrapper>
  );
};

export default Queue;
