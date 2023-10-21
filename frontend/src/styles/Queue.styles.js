import styled from 'styled-components'
import { Button } from './Room.styles'

export const QueueWrapper = styled.div`
  height: 60%;
  width: 100vw;
  background: black;
  position: absolute;
  z-index: 10;
  bottom: 8%;
  padding: 2em 3em;
  overflow-y: auto;

  & .search_bar {
    display: flex;
  }

  /* Firefox */
  & {
    scrollbar-width: auto;
    scrollbar-color: #47d1ba black;
  }

  /* Other browsers */
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: black;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #26c070;
    border-radius: 11px;
    border: 3px solid black;
  }

  @media (max-width: 768px) {
    & .queueDiv {
      padding: 0 !important;
    }

    & .songsDiv_wrapper {
      padding: 1em 0 !important;
    }
  }

  @media (max-width: 539px){
    & {
      min-width: 100%;
      padding: 1em;
    }

    & .queueDiv {
      padding: 0 !important;
      margin: 50px;
    }

    & .cta {
      padding: 5px !important;
      width: 150px !important;
    }

    & .search_wrapper {
      flex-direction: column;
      align-items: flex-start !important;
    }

    & .search_bar {
      display: flex;
      margin-top: 30px;
    }

    & .songsDiv_wrapper {
      padding: 1em 0 !important;
    }
  }
`

export const QueueCta = styled(Button)`
  font-size: 14px;
  width: 150px;
  margin-right: 100px;

  @media (max-width: 768px) {
    & {
      width: 100px;
      font-size: 12px;
    }
  }
`

export const SearchBar = styled.input`
  outline: none;
  background: black;
  border-radius: 5px;
  width: 60rem;
  height: 1rem;
  border: 1px solid #ffffff59;
  color: white;
  padding: 1.5em;
  font-size: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 15rem;
    height: 30px;
    padding: 1.2em;
    border-radius: 10px;
    margin-left: -40px;
  }
`
