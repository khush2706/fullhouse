const AddSong = ({ dataId, addSong }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 24 24"
      style={{ fill: 'rgba(255, 255, 255, 1)', cursor: 'pointer' }}
      data-id={dataId}
      onClick={addSong}
    >
      <path d="M19 15v-3h-2v3h-3v2h3v3h2v-3h3v-2h-.937zM4 7h11v2H4zm0 4h11v2H4zm0 4h8v2H4z"></path>
    </svg>
  )
}

export default AddSong
