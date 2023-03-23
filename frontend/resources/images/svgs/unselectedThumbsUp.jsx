export const UnselectedThumbsUp = ({handleClick}) => {
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
          <path d="M15.021,7l.336-2.041a3.044,3.044,0,0,0-4.208-3.287A3.139,3.139,0,0,0,9.582,3.225L7.717,7H3a3,3,0,0,0-3,3v9a3,3,0,0,0,3,3H22.018L24,10.963,24.016,7ZM2,19V10A1,1,0,0,1,3,9H7V20H3A1,1,0,0,1,2,19Zm20-8.3L20.33,20H9V8.909l2.419-4.9A1.07,1.07,0,0,1,13.141,3.8a1.024,1.024,0,0,1,.233.84L12.655,9H22Z" />
        </g>
      </svg>
    )
}