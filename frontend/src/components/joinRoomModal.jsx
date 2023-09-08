import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import validateJoinRoomForm from '../validators/joinRoomForm.validate'

const JoinRoomModal = ({ close }) => {
  const [error, setError] = useState(null)
  const [roomId, setRoomId] = useState('')
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const resultError = validateJoinRoomForm({
      roomId
    })

    if (resultError !== null) {
      setError(resultError)
      return
    }

    let myHeaders = new Headers()
    myHeaders.append('auth-token', token)
    myHeaders.append('Content-Type', 'application/json')

    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({
        username: username,
        roomId: roomId
      })
    }

    fetch('http://localhost:1337/api/dashboard/join', requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.error)
          })
        else return res.json()
      })
      .then((res) => {
        navigate(`${roomId}`)
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  const formData = [
    {
      label: 'Room Id',
      value: roomId,
      onChange: (e) => setRoomId(e.target.value),
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
          <FormTitle>Join Room</FormTitle>
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
            <FormButton type="submit">Join</FormButton>
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

export default JoinRoomModal
