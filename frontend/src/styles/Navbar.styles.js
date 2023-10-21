import styled from 'styled-components'

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  width: inherit;
  border-bottom: 1px solid #ffffff2b;
  font-size: 22px;
  color: white;

  & .username {
    margin-left: 20px;
  }
`
export const Logo = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');

  font-family: 'Michroma', sans-serif;
  font-size: 22px;
  font-weight: bold;
  color: white;
  letter-spacing: 0.15em;
  cursor: default;
`
