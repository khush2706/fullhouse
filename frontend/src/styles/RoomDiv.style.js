import styled from 'styled-components'

export const RoomCard = styled.div`
  background: rgb(57 56 56 / 25%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(87, 83, 83, 0.175);
  border-radius: 10px;
  padding: 1em;
  margin-right: 20px;
  margin-bottom: 20px;
  min-width: 31%;
  
  @media (max-width: 539px) {
    & {
      margin-right: 0px;
    }
  }
`

export const CardHeader = styled.div`
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  margin-bottom: 15px;
  width: 100%;
`

export const CardBody = styled.div`
  color: #c0c0c0;
  font-size: 16px;
  margin-bottom: 15px;
  width: 100%;
`

export const CardFooter = styled.div`
  color: white;
  display: flex;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
`

export const JoinButton = styled.button`
  outline: none;
  background-color: rgb(97 149 126 / 21%);
  padding: 10px;
  border: none;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  color: white;
  font-weight: 500;
  position: relative;

  &:hover {
    top: 1px;
  }

  &:active {
    top: 5px;
  }
`

export const MembersDiv = styled.div`
  background-color: rgb(76 79 80 / 57%);
  padding: 5px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  min-width: 50px;
  font-size: 16px;
  border-radius: 10px;
`
