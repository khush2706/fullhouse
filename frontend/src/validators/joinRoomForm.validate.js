export default function validateJoinRoomForm({ roomId }) {
  if (!roomId.trim()) {
    return 'Room Id is required'
  }
  return null
}
