import styled from "styled-components";
import { Button } from "./Room.styles";

export const QueueWrapper = styled.div`
  height: 60%;
  width: 100vw;
  background: black;
  position: absolute;
  z-index: 10;
  bottom: 8%;
  padding: 2em 3em;
  overflow-y: auto;

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
`;

export const QueueCta = styled(Button)`
  font-size: 14px;
  width: 150px;
  margin-right: 100px;
`;

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
`;
