import { createContext, useState } from 'react'

const QueueContext = createContext()

export default QueueContext

export function QueueIdProvider({ children }) {
  const [queueId, setQueueId] = useState()

  const updateQueueId = (queueId) => {
    setQueueId(queueId)
  }

  return (
    <QueueContext.Provider value={{ queueId, updateQueueId }}>{children}</QueueContext.Provider>
  )
}
