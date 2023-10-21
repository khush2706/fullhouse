import styled from 'styled-components'
import { motion } from 'framer-motion'

export const FormSection = styled.div`
  background-image: url(../../resources/images/circle-bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const FormTitle = styled.h1`
  margin-bottom: 28px;
  font-size: 35px;
  line-height: 1.1;
  font-weight: 500;
  color: white;
  letter-spacing: 0.1em;

  @media (max-width: 539px){
    & {
      font-size: 28px;
    }
  }
`

export const FormColumn = styled.div`
  padding: 50px 30px;
  background: rgb(80 80 80 / 15%);
  box-shadow: rgb(37 205 152 / 26%) 0px 8px 32px 0px;
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  width: 25%;
  min-height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  overflow: hidden;
  z-index: 2;
  @media (max-width: 768px) {
    & {
      width: 50%;
      padding: 30px 15px;
      min-height: 50%;
    }
  }
  @media (max-width: 539px){
    & {
      width: 80%;
      padding: 30px 15px;
      min-height: 50%;
    }
  }
`

export const FormWrapper = styled.form`
  padding-top: 0;
  width: 100%;
  position: relative;
`

export const FormMessage = styled(motion.div)`
  color: ${({ error }) => (error ? 'red' : 'green')};
  padding: 5px;
  text-align: center;
  margin-top: 1rem;
`

export const FormInputRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.4rem;
  > p {
    font-size: 0.8rem;
    margin-top: 0.5rem;
    color: #f00e0e;
  }
`
export const FormInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: rgb(37 205 152 / 7%) 0px 8px 32px 0px;
  border-radius: 2rem;
  width: 80%;
  height: 1rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: rgb(61 234 179 / 85%);
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem rgb(37 205 152 / 30%);
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: rgb(35 195 144 / 85%);
    font-weight: 100;
    font-size: 1rem;
  }
`

export const FormButton = styled.button`
  border-radius: 10px;
  background: none;
  margin-top: 1.8rem;
  outline: none;
  margin-right: auto;
  margin-left: auto;
  font-size: 1.2rem;
  padding: 5px 15px;
  border: 2px solid rgb(61 234 179 / 85%);
  cursor: pointer;
  overflow: hidden;
  width: 180px;
  display: block;
  color: rgb(61 234 179 / 85%);
  &:hover {
    color: white;
    transition: background-color 0.2s ease-in;
    background-color: rgb(61 234 179 / 85%);
  }
`

export const FormSubText = styled.p`
  color: white;
  margin-top: 50px;
  font-size: 18px;
  text-align: center;

  & a{
    color: #17d217;
  }

  @media (max-width: 539px){
    & {
      font-size: 16px;
    }
  }
`
