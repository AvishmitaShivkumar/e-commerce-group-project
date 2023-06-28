import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const SignIn = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [data, setData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((parsed) => {
        setData(parsed.data);
      });
  }, []);

  let _id = null;
  const handleClick = (event) => {
    event.preventDefault();

    if (password !== "" && email !== "") {
      const foundUser = data.find((user) => {
        return password === user.password && email === user.email;
      });
      _id = foundUser._id;
    }

    fetch(`/api/user/${_id}`)
      .then((response) => response.json())
      .then((parsed) => {
        if (parsed.status === 200) {
          localStorage.setItem("user", JSON.stringify(parsed.data._id));
          setCurrentUser(parsed.data._id);
          navigate("/");
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  useEffect(() => {
    if (currentUser) return navigate("/");
  }, [currentUser]);

  // fetch (post) to push user info into database

  return (
    <>
      <Container>
        <FormBox>
          <Form onSubmit={handleClick}>
            <SignInTitle>Sign in to start shopping!</SignInTitle>
            <label>
              <LabelTitle>Email</LabelTitle>
              <Input
                type="text"
                onChange={(event) => setEmail(event.target.value)}
              ></Input>
            </label>
            <label>
              <LabelTitle>Password</LabelTitle>
              <Input
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              ></Input>
            </label>
            <SignInButton>Sign In!</SignInButton>
          </Form>
          <SignUpTitle>Don't have an account?</SignUpTitle>
          <SignUpButton to="/signup">Sign Up!</SignUpButton>
        </FormBox>
      </Container>
    </>
  );
};

export default SignIn;

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
  justify-content: center;
  align-items: center;
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

const SignInTitle = styled.h1`
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

const SignUpTitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
const SignInButton = styled.button`
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  margin-top: 1.5rem;
  background-color: var(--color-accent);
  height: 2.5rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  border: none;
  transition: ease-in-out 0.2s;

  &:hover {
    cursor: pointer;
    transform: translateY(-1px);
    box-shadow: rgba(0, 0, 0, 0.5) 0 4px 12px;
  }
`;

const SignUpButton = styled(Link)`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
  background-color: var(--color-primary);
  height: 2.5rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  transition: ease-in-out 0.2s;

  &:hover {
    cursor: pointer;
    transform: translateY(-1px);
    box-shadow: rgba(0, 0, 0, 0.5) 0 4px 12px;
  }
`;
