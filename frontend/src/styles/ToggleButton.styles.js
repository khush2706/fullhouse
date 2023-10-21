import styled from 'styled-components'

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  @media (max-width: 539px) {
    & {
      gap: 3px;
    }
  }
`

export const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 28px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }

  @media (max-width: 539px) {
    &, &:before {
      width: 38px;
      height: 18px;
    }

    &:before{
      left: -14px;
      width: 20px;
    }
  }
`

export const Input = styled.input`
  display: none;

  &:checked + ${Switch} {
    background: rgba(61, 234, 179, 0.85);

    &:before {
      transform: translate(32px, -50%);
    }
  }
`

export const ToggleSpan = styled.span`
  color: rgb(114 224 189);
  margin-right: 50px;
`
