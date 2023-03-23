export const UnselectedThumbsDown = ({handleClick}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      style={{
        fill: "rgba(255, 255, 255, 1)",
        cursor: "pointer",
        marginLeft: "20px",
      }}
      onClick={handleClick}
    >
      <g id="_01_align_center" data-name="01 align center">
        <path d="M24,14.214,22,3H3A3,3,0,0,0,0,6v9a3,3,0,0,0,3,3H7.712l1.914,3.879a3.038,3.038,0,0,0,5.721-1.838L15.011,18H24ZM2,15V6A1,1,0,0,1,3,5H7V16H3A1,1,0,0,1,2,15Zm20,1H12.655l.719,4.365a1.024,1.024,0,0,1-.233.84,1.071,1.071,0,0,1-1.722-.212L9,16.091V5H20.33L22,14.3Z" />
      </g>
    </svg>
  );
};
