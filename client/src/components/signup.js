import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  // useState used to keep the values of names, email and password to be used in the fetch POST
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

// fetch (post) to push user info into database
const handleSubmit = (event) => {
  event.preventDefault();
  fetch("/signup", {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(firstName, lastName, email, password)
  })
      .then(res => res.json())
      .then((parsed) => {
        console.log(parsed)
        if(parsed.status===201){
          navigate("/signupconfirmation")
        }
      })
      .catch((error) => {
          window.alert(error)
      })
}


    return (
        <>
            <Container>
                <FormBox>
                    <Form onSubmit={handleSubmit}>
                        <SignUpTitle>Sign Up Form</SignUpTitle>
                        <Label>
                            First Name: 
                            <Input type="text" id="firstName" onChange={(e) => setFirstName(e.target.value)}></Input>
                        </Label>
                        <Label>
                            Last Name: 
                            <Input type="text" id="lastName" onChange={(e) => setLastName(e.target.value)}></Input>
                        </Label>
                        <Label>
                            Email: 
                            <Input type="email" id="email" onChange={(e) => setEmail(e.target.value)}></Input>
                        </Label>
                        <Label>
                            Password:
                            <Input type="password" id="password" onChange={(e) => setPassword(e.target.value)}></Input>
                        </Label>
                        <SignUpButton to="/signupconfirmation">Sign Up!</SignUpButton>
                    </Form>
                </FormBox>
            </Container>
        </>
    )
}

export default SignUp;

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const FormBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Label = styled.label`
font-size: 2rem;
text-align: right;
margin: 1rem 0;
`

const SignUpTitle = styled.h1`
font-size: 4rem;
text-align: center;
margin:0;
`

const Input = styled.input`
font-size: 2rem;
margin: 1rem;
width: 35rem;
`

const SignUpButton = styled(Link)`
color:black;
font-size: 3rem;
text-align: center;
text-decoration: none;
margin: 0;
`