import styled from 'styled-components'

export const PlaylistBar = styled.div`
  height: 8%;
  width: 100%;
  background-color: rgb(23 23 23 / 98%);
  border-top: 1px solid #ffffff59;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SongIdentifierWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
`

export const SongName = styled.div`
  font-size: 16px;
  margin-bottom: 2px;

  & .song_name {
      -moz-transform: translateX(100%);
      -webkit-transform: translateX(100%);
      transform: translateX(100%);

      -moz-animation: my-animation 15s linear infinite;
      -webkit-animation: my-animation 15s linear infinite;
      animation: my-animation 12s linear infinite;
    }

    /* for Firefox */
    & {
      font-size: 16px;
      display: flex;
      width: 300px;
      white-space: nowrap;
      height: 20px;
      overflow: hidden;
      @-moz-keyframes my-animation {
        from {
          -moz-transform: translateX(30%);
        }
        to {
          -moz-transform: translateX(-30%);
        }
      }

      /* for Chrome */
      @-webkit-keyframes my-animation {
        from {
          -webkit-transform: translateX(70%);
        }
        to {
          -webkit-transform: translateX(-70%);
        }
      }

      @keyframes my-animation {
        from {
          -moz-transform: translateX(0%);
          -webkit-transform: translateX(100%);
          transform: translateX(70%);
        }
        to {
          -moz-transform: translateX(-100%);
          -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
        }
      }
    }

  @media (max-width: 768px) {
    & {
      font-size: 14px;
      display: flex;
      width: 212px;
      white-space: nowrap;
      height: 20px;
      overflow: hidden;
    }
  }
`

export const SingerName = styled.div`
  font-size: 14px;

  @media (max-width: 768px) {
    &{
      font-size: 13px;
    }
  }
`

export const ProgressBar = styled.input`
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 8rem;

  &::-webkit-slider-runnable-track {
    background: white;
    height: 5px;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: -5px; /* Centers thumb on the track */
    background-color: rgb(61 234 179 / 85%);
    height: 15px;
    width: 1rem;
    border-radius: 50%;
  }
`
