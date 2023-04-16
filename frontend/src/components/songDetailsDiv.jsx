import AddSong from "../../resources/images/svgs/addSong";
import YoutubeIcon from "../../resources/images/svgs/youtube";
import {
  ChannelName,
  SongInfo,
  SongTitle,
  Wrapper,
} from "../styles/SongDetailsDiv.styles";

const SongDetailsDiv = ({ thumbnailUrl, title, channelName, dataId }) => {
  return (
    <Wrapper>
      <div style={{ display: "flex" }}>
        <img src={thumbnailUrl} />
        <SongInfo>
          <SongTitle>{title}</SongTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <YoutubeIcon />
            <ChannelName>{channelName}</ChannelName>
          </div>
        </SongInfo>
      </div>
      <AddSong dataId={dataId} />
    </Wrapper>
  );
};

export default SongDetailsDiv;
