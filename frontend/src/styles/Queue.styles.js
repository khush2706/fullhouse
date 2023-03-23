import styled from "styled-components";
import { Button } from "./Room.styles";

export const QueueWrapper = styled.div`
  height: 60%;
  width: 100%;
  background: black;
	position: absolute;
	bottom: 8%;
	padding: 2em 3em;
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
	width: 40rem;
	height: 1rem;
	border: 1px solid #ffffff59;
	color: white;
	padding: 1.5em;
	font-size: 16px;
	box-sizing: border-box;
`
