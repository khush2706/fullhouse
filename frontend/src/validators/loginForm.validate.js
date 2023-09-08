export default function validateLoginForm({ email, password }) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!email) {
    return 'Email is required'
  } else if (regex.test(email.toLocalLowerCase)) {
    return 'Invalid email address'
  }

  if (!password) {
    return 'Password is required'
  } else if (password.length < 6) {
    return 'Password needs to be 6 characters or more'
  }

  return null
}
