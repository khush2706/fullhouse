import styled from "styled-components";
import {
  DashboardWrapper,
  DashboardContainer,
  CreateButton,
} from "./Dashboard.styles";

export const RoomWrapper = styled(DashboardWrapper)`
  padding: 0;
`;

export const RoomContainer = styled(DashboardContainer)`
  padding: 0;
  border-radius: 0;
`;

export const RoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2em 2em 0em;
`;

export const RoomNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

export const RoomName = styled.div`
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 1px;
`;

export const RoomCreator = styled.div`
  font-size: 18px;
  letter-spacing: 1px;
`;

export const Button = styled(CreateButton)`
  width: 100px;
  font-size: 18px;
  letter-spacing: 1px;
`;

export const RoomId = styled.div`
  font-size: 16px;
  letter-spacing: 1px;
  margin-top: 10px;
`;
