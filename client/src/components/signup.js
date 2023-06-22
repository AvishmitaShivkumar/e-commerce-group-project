import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";


const SignUp = () => {
  // useState used to keep the values of names, email and password to be used in the fetch POST
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {currentUser, setCurrentUser} = useContext(UserContext)

  const navigate = useNavigate();

  useEffect(()=>{
    if(currentUser) return navigate("/")
  },[currentUser])

// fetch (post) to push user info into database
const handleSubmit = (event) => {
  event.preventDefault();
  fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({firstName, lastName, email, password}),
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
  })
      .then((response) => response.json())
      .then((parsed) => {
        if(parsed.status===200){
          console.log(parsed)
          localStorage.setItem("user", JSON.stringify(parsed.userId))
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
                        <ButtonDiv>
                          <SignUpButton>Sign Up!</SignUpButton>
                        </ButtonDiv>
                    </Form>
                </FormBox>
            </Container>
        </>
    )
}

export default SignUp;

const Container = styled.section`
  margin: 3rem;
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
margin: 2rem;
`

const Input = styled.input`
font-size: 2rem;
margin: 1rem;
width: 35rem;
`

const SignUpButton = styled.button`
color:black;
font-size: 3rem;
text-align: center;
text-decoration: none;
margin: 0;
width: 15rem;
height: 7rem;
border-radius: 2rem;

&:hover{
  background-color: red;
}

transition: ease-in-out 0.2s;
`
const ButtonDiv = styled.div`
margin: 3rem;
display: flex;
justify-content: center;
`