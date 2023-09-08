export default function validateCreateRoomForm({ roomName, description }) {
  if (!roomName.trim()) {
    return 'Room Name is required'
  }

  if (!description.trim()) {
    return 'Description is required'
  }

  return null
}
