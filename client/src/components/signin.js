import { styled } from "styled-components"
import { Link } from "react-router-dom"

const SignIn = () => {

    return (
        <>
            <Container>
                <FormBox>
                    <Form>
                        <SignInTitle>Sign in to start adding items to your cart</SignInTitle>
                        <Label>
                            Username: 
                            <Input type="text"></Input>
                        </Label>
                        <Label>
                            Password:
                            <Input type="password"></Input>
                        </Label>
                        <SignInButton to="/SignUp">Sign In!</SignInButton>
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
const SignInButton = styled(Link)`
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