import styled from "styled-components";
import { Link } from "react-router-dom";

//this will be styled later since it has to match the theme of the website


const Error = () => {
  return (
    <Container>
      <ErrorCode>404 error</ErrorCode>
      <Title>Ooops! we could not find this page</Title>
      <Paragraph>If this issue persist please contact support</Paragraph>
      <ContactingSupport to="/contactsupport">Want to report it to us?</ContactingSupport>
    </Container>
  );
};

const Container = styled.div`
  transform: translate(-50%);
  position: absolute;
  left: 50%;
`;

const ErrorCode = styled.h1``;

const Title = styled.h3``;

const Paragraph = styled.p``;

const ContactingSupport = styled(Link)``;

export default Error;
