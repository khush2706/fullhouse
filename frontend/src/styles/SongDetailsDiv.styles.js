import styled from 'styled-components'

export const Wrapper = styled.div`
  background: #2727278f;
  width: 60em;
  height: 100px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 768px) {
    & {
      width: 100%;
      padding: 0 10px;
    }

    & img {
      width: 100px;
    }
  }
`

export const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 20px;
`

export const SongTitle = styled.div`
  color: white;
  font-size: 16px;

  @media (max-width: 768px) {
    & {
      font-size: 14px;
    }
  }
`

export const ChannelName = styled.div`
  color: white;
  font-size: 14px;
  margin-left: 10px;
`
