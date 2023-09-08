import { useState } from 'react'
import {
  FormColumn,
  FormWrapper,
  FormInput,
  FormSection,
  FormInputRow,
  FormMessage,
  FormButton,
  FormTitle,
  FormSubText
} from '../styles/Form.styles'
import validateLoginForm from '../validators/loginForm.validate'
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = ({ setToken, setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const resultError = validateLoginForm({
      email,
      password
    })

    if (resultError !== null) {
      setError(resultError)
      return
    }

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        email: email,
        password: password
      })
    }

    fetch('http://localhost:1337/api/user/login', requestOptions)
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.err)
          })
        else return res.json()
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        setToken(res.data.token)
        setUser({ username: res.data.username })
        navigate('/dashboard')
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } }
  }

  const formData = [
    {
      label: 'Email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
      type: 'email'
    },
    {
      label: 'Password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      type: 'password'
    }
  ]
  return (
    <FormSection>
      <FormColumn>
        <FormTitle>Welcome</FormTitle>
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

          <FormButton type="submit">Submit</FormButton>
        </FormWrapper>
        {error && (
          <FormMessage variants={messageVariants} initial="hidden" animate="animate" error>
            {error}
          </FormMessage>
        )}
      </FormColumn>
      <FormSubText>
        Do not have an account? <Link to="/register">Register Instead</Link>
      </FormSubText>
    </FormSection>
  )
}

export default LoginForm
