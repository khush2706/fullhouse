import { createContext, useState } from 'react'

const VideoIdContext = createContext()

export default VideoIdContext

export function VideoIdProvider({ children }) {
  const [videoId, setVideoId] = useState('')

  const updateVideoId = (videoId) => {
    console.log('setting videoId', videoId)
    setVideoId(videoId)
  }

  return (
    <VideoIdContext.Provider value={{ videoId, updateVideoId }}>{children}</VideoIdContext.Provider>
  )
}
