import styled from 'styled-components'

export const DashboardWrapper = styled.div`
  height: 100vh;
  background-image: url(../../resources/images/circle-bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  padding: 30px 45px;
  overflow: hidden;

  @media (max-width: 768px) {
    &{
      padding: 20px 15px;
    }
  }
`

export const DashboardContainer = styled.div`
  background: rgb(87 83 83 / 20%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(87, 83, 83, 0.175);
  border-radius: 1em;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 1.2em 2em;
  box-shadow: rgb(95 189 160 / 26%) 0px 8px 32px 0px;

  @media (max-width: 768px){
    &{
      padding: 1.2em 1.2em;
      overflow: auto;
    }
  }
`

export const DashboardHeader = styled.div`
  font-size: 1.8em;
  color: #fff;
  display: flex;
  padding-top: 1.8em;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    &{
      font-size: 1.3em;
      padding-top: 1em;
      flex-direction: column;
      align-items: flex-start;
    }
  }
`

export const CreateButton = styled.button`
  color: #fff;
  background-color: rgb(30 217 135 / 80%);
  outline: none;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  margin-right: 20px;

  &:hover {
    top: 1px;
  }

  &:active {
    top: 5px;
  }

  @media (max-width: 768px){
    &{
      font-size: 14px;
      padding: 8px;
      margin-right: 10px;
      margin-top: 20px;
    }
  }
`

export const RoomsWrapper = styled.div`
  overflow: hidden auto;
  display: flex;
  flex-wrap: wrap;
  padding: 40px 0;
  color: white;
  font-size: 18px;

  @media (max-width: 768px) {
    &{
      flex-direction: column;
    }
  }
`
