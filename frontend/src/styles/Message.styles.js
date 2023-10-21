import styled from 'styled-components'

export const MessageBox = styled.div`
  background: rgb(15 16 17 / 43%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(87, 83, 83, 0.175);
  width: 28%;
  position: absolute;
  right: 0;
  bottom: 80px;
  height: 70%;
  border-radius: 10px 0 0 10px;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  padding: 10px 15px;

  @media (max-width: 768px){
    & {
      bottom: 80px;
      width: 60%;
      height: 38%;
    }
  }
`

export const MessageBoxHeader = styled.div`
  width: 100%;
  color: white;
  font-size: 24px;
  padding: 0.5em 0.2em;
  font-weight: 500;
`

export const MessageBoxBody = styled.div`
  height: 80%;
  overflow: auto;
  width: 100%;
  color: white;
  font-size: 18px;
  padding: 20px 0.2em;
`

export const MessageInput = styled.input`
  outline: none;
  border: none;
  width: 85%;
  height: 8%;
  border-radius: 8px;
  background: rgb(24 26 27 / 8%);
  box-shadow: 0 0 0 0.2rem rgb(37 205 152 / 30%);
  padding: 1rem;
  color: rgb(61 234 179 / 85%);
  font-size: 1rem;
  font-weight: 400;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem rgb(37 205 152 / 30%);
    backdrop-filter: blur(12rem);
  }
  &::placeholder {
    color: rgb(35 195 144 / 85%);
    font-weight: 100;
    font-size: 1rem;
  }

  @media (max-width: 768px){
    & {
      height: 40px;
      position: relative;
      bottom: 25px;
    }
  }
`
export const SendMessage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px){
    & svg{
      position: relative;
      bottom: 25px;
    }
  }
`
