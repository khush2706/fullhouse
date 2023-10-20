import AddSong from '../../resources/images/svgs/addSong'
import YoutubeIcon from '../../resources/images/svgs/youtube'
import { ChannelName, SongInfo, SongTitle, Wrapper } from '../styles/SongDetailsDiv.styles'
import QueueContext from '../contexts/queue'
import { SocketContext } from '../contexts/socket'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

const SongDetailsDiv = ({ thumbnailUrl, title, channelName, dataId, videoId, addedBy }) => {
  const username = localStorage.getItem('username')
  const { queueId, updateQueueId } = useContext(QueueContext)
  const token = localStorage.getItem('token')
  const socket = useContext(SocketContext)
  const { roomId } = useParams()

  const addSong = () => {
    const headers = new Headers()
    headers.append('auth-token', token)
    headers.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        username,
        queueId,
        songTitle: title,
        channelName,
        thumbnailUrl,
        videoId: dataId
      })
    }

    fetch(`http://localhost:1337/api/dashboard/addSong`, requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.err)
          })
        else return res.json()
      })
      .then((res) => {
        console.log(res)
        socket.emit('added_song', {
          roomId,
          songInfo: { songTitle: title, channelName, thumbnailUrl, videoId: dataId, username }
        })
      })
      .catch((error) => {
        console.log('error', error.message)
      })
  }

  return (
    <Wrapper data-id={videoId ? videoId : dataId}>
      <div style={{ display: 'flex' }}>
        <img src={thumbnailUrl} />
        <SongInfo>
          <SongTitle>{title}</SongTitle>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <YoutubeIcon />
            <ChannelName>{channelName}</ChannelName>
          </div>
          {addedBy && <ChannelName>Added By: {addedBy}</ChannelName>}
        </SongInfo>
      </div>
      {dataId && <AddSong dataId={dataId} addSong={addSong} />}
    </Wrapper>
  )
}

export default SongDetailsDiv
