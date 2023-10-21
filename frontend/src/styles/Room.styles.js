import styled from 'styled-components'
import { DashboardWrapper, DashboardContainer, CreateButton } from './Dashboard.styles'

export const RoomWrapper = styled(DashboardWrapper)`
  padding: 0;
`

export const RoomContainer = styled(DashboardContainer)`
  padding: 0;
  border-radius: 0;

  @media (max-width: 768px) {
    & .youtube_player iframe{
      width: 500px;
      height: 300px;
    }

    & .youtube_container{
      margin: 50px !important;
    }
  }
`

export const RoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2em 2em 0em;

  @media (max-width: 539px) {
    & {
      padding: 1.5em 1em;
    }
  }

  @media (max-width: 768px) {
    & {
      
    }
  }
`

export const RoomNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`

export const RoomName = styled.div`
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    & {
      font-size: 18px;
    }
  }
`

export const RoomCreator = styled.div`
  font-size: 18px;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    & {
      font-size: 14px;
    }
  }
`

export const Button = styled(CreateButton)`
  width: 100px;
  font-size: 18px;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    &{
      width: 80px;
      font-size: 14px;
    }
  }
`

export const RoomId = styled.div`
  font-size: 16px;
  letter-spacing: 1px;
  margin-top: 10px;

  @media (max-width: 768px) {
    & {
      font-size: 14px;
      margin-top: 8px;
    }
  }
`

export const WideButton = styled(Button)`
  width: 500px;

  @media (max-width: 768px) {
    & {
      width: 250px;
    }
  }
`
