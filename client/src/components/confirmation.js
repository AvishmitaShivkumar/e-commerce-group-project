import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Confirmation = () => {
  // const { orderId } = useParams();
  // const [ordered, setOrdered] = useState(null);

  // useEffect(() => {
  //   fetch(`/api/orders/${orderId}`)
  //     .then((res) => res.json())
  //     .then((parsed) => {
  //       setOrdered(parsed.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // if (!ordered) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Container>
      <p>test</p>
      {/* <ConfirmationHeader>Confirmation</ConfirmationHeader>
      <Contents>{`Order #: ${ordered._id}`}</Contents>
      <Contents>{`Item #: ${ordered.item._id}`}</Contents>
      <Contents>{`Price: ${ordered.price}`}</Contents>
      <Contents>{`By: ${ordered.user.name}`}</Contents>
      <Contents>{`We sent you a confirmation email via: ${ordered.user.email}`}</Contents> */}

      {/* <div>{`Address: ${ordered.address}`}</div> */}
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
