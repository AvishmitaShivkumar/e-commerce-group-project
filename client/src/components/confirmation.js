import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";

const Confirmation = () => {
  const { orderId } = useParams();
  const [ordered, setOrdered] = useState(null);

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
      <Contents>Thanks for your order!!</Contents>
      <Contents>{`Order #: ${ordered._id}`}</Contents>
      <Contents>{`Item : ${ordered.Items.name}`}</Contents>
      <Contents>{`Price: ${ordered.Items.price}`}</Contents>
      <Contents>{`By: ${ordered.email}`}</Contents>
      <Contents>{`We sent you a confirmation email to: ${ordered.email}`}</Contents>
      <Contents>{`Address: ${ordered.shipping.address}`}</Contents>
    </Container>
  );
};
export default Confirmation;

const Container = styled.div``;

const ConfirmationHeader = styled.p`
  font-size: 50px;
  font-weight: bold;
  color: brown;
  margin-bottom: 10px;
`;

const Contents = styled.p`
  padding-top: 20px;
`;
