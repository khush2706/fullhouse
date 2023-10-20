import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toggle from './ToggleSwitch'
import {
  FormColumn,
  FormWrapper,
  FormInput,
  FormInputRow,
  FormMessage,
  FormButton,
  FormTitle
} from '../styles/Form.styles'
import { Overlay } from '../styles/Modal.styles'
import validateCreateRoomForm from '../validators/createRoomForm.validate'

const CreateRoomModal = ({ close }) => {
  const [error, setError] = useState(null)
  const [roomName, setRoomName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const resultError = validateCreateRoomForm({
      roomName,
      description
    })

    if (resultError !== null) {
      setError(resultError)
      return
    }

    let myHeaders = new Headers()
    myHeaders.append('auth-token', token)
    myHeaders.append('Content-Type', 'application/json')

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        username: username,
        name: roomName,
        description: description,
        isPublic: isPublic
      })
    }

    fetch('http://localhost:1337/api/dashboard/create', requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.error)
          })
        else return res.json()
      })
      .then((res) => {
        const { roomId } = res.data
        navigate(`${roomId}`)
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  const formData = [
    {
      label: 'Room Name',
      value: roomName,
      onChange: (e) => setRoomName(e.target.value),
      type: 'text'
    },
    {
      label: 'Description',
      value: description,
      onChange: (e) => setDescription(e.target.value),
      type: 'text'
    }
  ]
  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } }
  }
  return (
    <>
      <Overlay onClick={close}>
        <FormColumn
          onClick={(e) => {
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation()
          }}
        >
          <FormTitle>Create Room</FormTitle>
          <FormWrapper onSubmit={handleSubmit}>
            {formData.map((el, index) => (
              <FormInputRow key={index}>
                <FormInput
                  type={el.type}
                  placeholder={`${el.label.toLocaleLowerCase()}`}
                  value={el.value}
                  onChange={el.onChange}
                />
              </FormInputRow>
            ))}
            <Toggle label="Make room Public?" isPublic={isPublic} setIsPublic={setIsPublic} />
            <FormButton type="submit">Create</FormButton>
          </FormWrapper>
          {error && (
            <FormMessage variants={messageVariants} initial="hidden" animate="animate" error>
              {error}
            </FormMessage>
          )}
        </FormColumn>
      </Overlay>
    </>
  )
}

export default CreateRoomModal
