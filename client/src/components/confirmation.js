import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";

const Confirmation = () => {

  const { orderId } = useParams();
  const [ordered, setOrdered] = useState(null);
  console.log("🚀 ~ file: confirmation.js:10 ~ Confirmation ~ ordered:", ordered)

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((parsed) => {
        setOrdered(parsed.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!ordered) {
    return <Loader/>;
  }

  return (
    <Container>
      <ConfirmationHeader>Confirmation</ConfirmationHeader>
      <ContentWrapper>
        <ThanksMessage>Thanks for your order!!</ThanksMessage>
        <Contents>{`Order #: ${ordered._id}`}</Contents>
        {ordered.Items.map((item) => (
          <div key={item._id}>
            <Contents>{`Item: ${item.name}`}</Contents>
            <Contents>{`Price: ${item.price}`}</Contents>
          </div>
        ))}
        <Contents>{`By: ${ordered.email}`}</Contents>
        <Contents>{`We sent you a confirmation email to: ${ordered.email}`}</Contents>
        <Contents>{`Address: ${ordered.shipping.address}`}</Contents>
      </ContentWrapper>
    </Container>
  );
};
export default Confirmation;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const ConfirmationHeader = styled.p`
  font-size: 3rem;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
background-color: var(--color-secondary);
padding: 2rem;
`

const ThanksMessage = styled.p`
font-size: 2rem;
color: var(--color-accent);
margin-bottom: 2rem;
`

const Contents = styled.p`
  font-size: 1.3rem;
`;
