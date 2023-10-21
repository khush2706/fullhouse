import { Label, Switch, Input, ToggleSpan } from '../styles/ToggleButton.styles'

const Toggle = ({ label, isPublic, setIsPublic }) => {
  const handleChange = (e) => {
    setIsPublic(e.target.checked)
  }

  return (
    <Label>
      <ToggleSpan>{label}</ToggleSpan>
      <Input checked={isPublic} type="checkbox" onChange={handleChange} />
      <Switch />
    </Label>
  )
}

export default Toggle
