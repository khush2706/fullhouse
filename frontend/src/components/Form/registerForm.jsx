import { useState } from "react";
import {
  FormColumn,
  FormWrapper,
  FormInput,
  FormSection,
  FormInputRow,
  FormMessage,
  FormButton,
  FormTitle,
  FormSubText,
} from "./Form.styles";
import validateRegisterForm from "./registerForm.validate";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultError = validateRegisterForm({
      username,
      email,
      password,
      confirmPass,
    });

    if (resultError !== null) {
      setError(resultError);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    };

    fetch("http://localhost:1337/api/user/register", requestOptions)
      .then(async (res) => {
        let data = await res.json();
        if (!res.ok) throw new Error(data.error);
        else return data;
      })
      .then((data) => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPass("");
        setError(null);
        setSuccess("Application was submitted!");
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };

  const formData = [
    {
      label: "Email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      type: "email",
    },
    {
      label: "Username",
      value: username,
      onChange: (e) => setUsername(e.target.value),
      type: "text",
    },
    {
      label: "Password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      type: "password",
    },
    {
      label: "Confirm Password",
      value: confirmPass,
      onChange: (e) => setConfirmPass(e.target.value),
      type: "password",
    },
  ];
  return (
    <FormSection>
      <FormColumn>
        <FormTitle>Register</FormTitle>
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
          <FormMessage
            variants={messageVariants}
            initial="hidden"
            animate="animate"
            error
          >
            {error}
          </FormMessage>
        )}
        {success && (
          <FormMessage
            variants={messageVariants}
            initial="hidden"
            animate="animate"
          >
            {success}
          </FormMessage>
        )}
      </FormColumn>
      <FormSubText>
        Already have an account? <Link to="/login">Login Instead</Link>
      </FormSubText>
    </FormSection>
  );
};

export default RegisterForm;
