import { styled } from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react";


const SignIn = () => {


  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")

  const [data, setData] = useState({})

  const navigate = useNavigate();

  useEffect(()=>{
    fetch("/api/users")
    .then((response)=>response.json())
    .then((parsed)=>{
      console.log(parsed.data)
      setData(parsed.data)
    })
  },[])

let _id = null
const handleClick = ((event)=>{
  event.preventDefault();

  if(password !== "" && email !== ""){
  const foundUser = data.find((user)=>{
    return password === user.password && email === user.email
  })
  _id = foundUser._id
}

fetch(`/api/user/${_id}`)
  .then((response) => response.json())
  .then((parsed) => {
    if(parsed.status === 200){
      localStorage.setItem("user", JSON.stringify(parsed.data._id))
      console.log(parsed.data)
      navigate("/")
    }
    })
  .catch((error) => {
      window.alert(error)
  })


})


// fetch (post) to push user info into database

    return (
        <>
            <Container>
                <FormBox>
                    <Form onSubmit={handleClick}>
                        <SignInTitle>Sign in to start shopping!</SignInTitle>
                        <Label>
                            Email: 
                            <Input type="text" onChange={(event)=>setEmail(event.target.value)}></Input>
                        </Label>
                        <Label>
                            Password:
                            <Input type="password" onChange={(event)=>setPassword(event.target.value)}></Input>
                        </Label>
                        <SignInButton>Sign In!</SignInButton>
                    </Form>
                    <SignUpTitle>Don't have an account?</SignUpTitle>
                    <SignUpButton to="/signup">Sign Up!</SignUpButton>
                </FormBox>
            </Container>
        </>
    )
}


export default SignIn;

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const FormBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Label = styled.label`
font-size: 2rem;
text-align: center;
`

const SignInTitle = styled.h1`
font-size: 4rem;
text-align: center;
`

const Input = styled.input`
font-size: 2rem;
margin: 1rem;
`

const SignUpTitle = styled.h2`
font-size: 3rem;
text-align: center;
margin: 0;
`
const SignInButton = styled.button`
color: black;
font-size: 2rem;
text-decoration: none;
margin: 0;
background-color: red;
height: 4rem;
width: 10rem;
display: flex;
justify-content: center;
align-items: center;
border-radius: 0.5rem;
`


const SignUpButton = styled(Link)`
color: black;
font-size: 2rem;
text-align: center;
text-decoration: none;
margin: 0;
background-color: green;
height: 3.5rem;
width: 9rem;
display: flex;
justify-content: center;
align-items: center;
border-radius: 0.5rem;
`