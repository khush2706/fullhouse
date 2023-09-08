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
`

export const SingerName = styled.div`
  font-size: 14px;
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
