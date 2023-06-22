// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import styled from "styled-components";

const Confirmation = () => {
  //   const { orderId } = useParams();
  //   const [ordered, setOrdered] = useState(null);

  //   useEffect(() => {
  //     fetch(`/orders/${orderId}`)
  //       .then((res) => res.json())
  //       .then((parsed) => {
  //         setOrdered(parsed.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  //   if (!ordered) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <Container>
      <ConfirmationHeader>Confirmation</ConfirmationHeader>
      {/* <div>{`Order #: ${ordered.id}`}</div>
      <div>{`By: ${ordered.fname} ${ordered.lname}`}</div>
      <div>{`Price: ${ordered.price}`}</div>
      <div>{`Address: ${ordered.address}`}</div>
      <div>{`Phone #: ${ordered.phone}`}</div>
      <div>{`We sent you a confirmation email via: ${ordered.email}`}</div> */}
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
