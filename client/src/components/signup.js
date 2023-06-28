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

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) return navigate("/");
  }, [currentUser]);

  // fetch (post) to push user info into database
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((parsed) => {
        if (parsed.status === 200) {
          localStorage.setItem("user", JSON.stringify(parsed.userId));
          navigate("/signupconfirmation");
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  useEffect(() => {
    if (currentUser) return navigate("/");
  }, [currentUser]);

  return (
    <>
      <Container>
        <FormBox>
          <Form onSubmit={handleSubmit}>
            <SignUpTitle>Sign Up Form</SignUpTitle>
            <label>
              <LabelTitle>First Name</LabelTitle>
              <Input
                type="text"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              ></Input>
            </label>
            <label>
              <LabelTitle>Last Name</LabelTitle>
              <Input
                type="text"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
              ></Input>
            </label>
            <label>
              <LabelTitle>Email</LabelTitle>
              <Input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </label>
            <label>
              <LabelTitle>Password</LabelTitle>
              <Input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </label>
            <ButtonDiv>
              <SignUpButton>Sign Up!</SignUpButton>
            </ButtonDiv>
          </Form>
        </FormBox>
      </Container>
    </>
  );
};

export default SignUp;

const Container = styled.section`
  margin: auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
  padding: 4em 2em;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-secondary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LabelTitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 0;
`;

const SignUpTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
`;

const Input = styled.input`
  font-size: 2rem;
  margin: 1rem;
  &:focus {
    outline: 2px solid var(--color-primary);
  }
`;

const SignUpButton = styled.button`
  color: white;
  background-color: var(--color-primary);
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
  width: 10rem;
  height: 2.5rem;
  border-radius: 2rem;
  border: none;
  margin-top: 1rem;

  &:hover {
    background-color: var(--color-accent);
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.5) 0 4px 12px;
    transform: translateY(-1px);
  }

  transition: ease-in-out 0.2s;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
