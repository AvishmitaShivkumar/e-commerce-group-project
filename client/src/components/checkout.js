import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { itemId } = useParams();
  const [ordered, setOrdered] = useState(null);

  const user = localStorage.getItem("user")
  const userId = JSON.parse(user);
  
  const navigate = useNavigate();

  const initialValue = {
    fname: "",
    lname: "",
    address: "",
    address2: "",
    postalCode: "",
    // email: "",
    // phone: "",
    creditNum: "",
    nameOnCard: "",
    expDate: "",
    code: "",
  };

  const [formData, setFormData] = useState(initialValue);

  const handleChange = (e) => {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
    console.log(newData);
  };



  //In this post we want to post the USER data, make sure its called user, all you have to pass is the userId
  //In this post we want to pass the ITEM data, this will pass the item Id
  //and then COMPANIES all you have to pass is the company Id
  //and then SHIPPING which you can pass all of the shipping data

  //{
  // 	"user": {
  // 		"_id": "ec7c693d-9a85-4176-a75d-9fb4d1fb1b6c"
  // 	},
    
  //   "items":
  //     {
  //       "_id": 6543
  //     },
    
  // 	"companies":
  //     {
  //       "_id": 19962
  //     },
  // 		"shipping":
  //     	{
  //       	"address": "1 rue street",
  // 				"postalCode": "APO STA"
  //     	}
  // }

  //this will change later replace 6543 with the ${itemId}

  useEffect(() => {
    fetch(`/api/cart/${userId}/6543`)
      .then((res) => res.json())
      .then((parsed) => {
        setOrdered(parsed.data);
      })
      .catch((error) => {
        console.error(error)
      });
  }, []);

  console.log(ordered)

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      user: {
        _id: userId,
      },
      items: {
        _id: ordered.itemId,
      },
      // companies: {
      //   _id: companyId, // Replace with the actual company ID
      // },
      shipping: {
        address: formData.address,
        address2: formData.address2,
        postalCode: formData.postalCode
      },
    };



    fetch("/api/orders", {

      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.status === 200) {
          navigate(`/confirmation/${parsed.data.id}`);
        }
      });
  };

  console.log(formData)

  return (
    <Container onSubmit={handleSubmit}>
      <CheckoutHeader>Checkout</CheckoutHeader>
      <DivLeft>
        <ItemDiv>
          <YourItems>Your Items</YourItems>
          <ItemGroup>
            {/* <Img src={ordered.imageSrc} /> */}
            {/* I need to get the item image source from the cart page */}
            <Img />
            <div>
              {/* <ItemName>{ordered.name}</ItemName> */}
              {/* I need to get the item name from the cart page */}
              <ItemInfo>adfadgdgdadhahdh</ItemInfo>
              {/* <ItemInfo>{ordered.price}</ItemInfo> */}
              {/* I need to get the item price from the cart page */}
              <ItemInfo>$100</ItemInfo>
              {/* I need to get the item qty from the cart page */}
              <ItemInfo>Qty: 1</ItemInfo>
            </div>
          </ItemGroup>
        </ItemDiv>
        <Form>
          <CoustomerInfo>Shipping information</CoustomerInfo>
          <InputContainer>
            <Label htmlFor="fname">First Name:</Label>
            <Input
              onChange={handleChange}
              value={formData.fname}
              type="text"
              id="fname"
              name="fname"
              required
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="lname">Last Name:</Label>
            <Input
              onChange={handleChange}
              value={formData.lname}
              type="text"
              id="lname"
              name="lname"
              required
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="address">Address:</Label>
            <Input
              onChange={handleChange}
              value={formData.address}
              type="text"
              id="address"
              name="address"
              placeholder="1234 Main St"
              required
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="address2">Address 2 (Optional):</Label>
            <Input
              onChange={handleChange}
              value={formData.address2}
              type="text"
              id="address2"
              name="address2"
              placeholder="Apartment or suite"
              required
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="address2">Postal code:</Label>
            <Input
              onChange={handleChange}
              value={formData.postalcode}
              type="text"
              id="postalcode"
              name="postalcode"
              placeholder="A0A 0A0"
              required
            />
          </InputContainer>
          {/* <InputContainer>
            <Label htmlFor="email">E-mail:</Label>
            <Input
              onChange={handleChange}
              value={formData.email}
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              required
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="phone">Phone Number:</Label>
            <Input
              onChange={handleChange}
              value={formData.phone}
              type="text"
              id="phone"
              name="phone"
              placeholder="111-111-1111"
              required
            />
          </InputContainer> */}
        </Form>

        <Form>
          <PaymentInfo>Payment</PaymentInfo>{" "}
          <InputContainer>
            <Label htmlFor="creditNum">Card number:</Label>
            <Input
              onChange={handleChange}
              value={formData.creditNum}
              type="text"
              id="creditNum"
              name="creditNum"
              placeholder="0000-0000-0000-0000"
              minlength="19"
              maxlength="19"
              required
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="nameOnCard">Name on card:</Label>
            <Input
              onChange={handleChange}
              value={formData.nameOnCard}
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              required
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="expDate">Expiration date:</Label>
            <Input
              onChange={handleChange}
              value={formData.expDate}
              type="text"
              id="expDate"
              name="expDate"
              placeholder="MM/YY"
              minlength="5"
              maxlength="5"
              required
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="code">Security code (CVV/CVC):</Label>
            <Input
              onChange={handleChange}
              value={formData.code}
              type="text"
              id="code"
              name="code"
              minlength="3"
              maxlength="4"
              required
            />
          </InputContainer>
        </Form>
      </DivLeft>

      <OrderSummeryContainer>
        <OrderSummery>Order Summary</OrderSummery>
        <SummaryDiv>
          <Summary>Items: ITEM_PRICE</Summary>
          <Summary>Shipping: $10</Summary>
          <Summary>Tax: 5%</Summary>
        </SummaryDiv>
        <OrderTotal>Order Total: </OrderTotal>
        <OrderButton type="submit">Order now</OrderButton>
      </OrderSummeryContainer>
    </Container>
  );
};

export default Checkout;

const DivLeft = styled.div`
  margin-top: 0px;
  margin-bottom: 40px;
  float: left;
`;

const Container = styled.div`
  margin-top: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

const CheckoutHeader = styled.p`
  font-size: 50px;
  font-weight: bold;
  color: brown;
  margin-bottom: 10px;
`;

const ItemDiv = styled.div`
  width: 800px;
  margin-top: 30px;
`;
const YourItems = styled.p`
  font-size: 30px;
  font-weight: bold;
  border-bottom: 3px solid orange;
  padding-bottom: 10px;
`;

const ItemGroup = styled.div`
  display: flex;
  margin-top: 30px;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  border: 2px solid black;
  border-radius: 30px;
  margin-right: 50px;
`;

const ItemInfo = styled.li`
  font-size: 20px;
  list-style: none;
  padding-top: 10px;
`;

const CoustomerInfo = styled.p`
  font-size: 30px;
  font-weight: bold;
  border-bottom: 3px solid orange;
  padding-bottom: 10px;
`;

const Form = styled.form`
  margin-top: 30px;
  width: 800px;
`;

const InputContainer = styled.div`
  margin-top: 20px;
`;

const Label = styled.label`
  float: left;
  width: 250px;
  font-size: 20px;
`;

const Input = styled.input`
  text-align: center;
  width: 300px;
  font-size: 20px;
`;

const PaymentInfo = styled.p`
  font-size: 30px;
  font-weight: bold;
  border-bottom: 3px solid orange;
  padding-bottom: 10px;
`;

const OrderSummeryContainer = styled.div`
  width: 300px;
  /* border: 2px solid #cdf3f1; */
  background-color: #f7d1cd;
  padding: 30px;
  border-radius: 30px;
  float: right;
  margin-top: 35px;
`;
const OrderSummery = styled.p`
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
  border-bottom: 3px solid orange;
  padding-bottom: 10px;
`;

const SummaryDiv = styled.div`
  border-bottom: 2px solid gray;
  margin-top: 30px;
  padding-bottom: 30px;
`;

const Summary = styled.p`
  font-size: 20px;
  padding-top: 10px;
`;

const OrderTotal = styled.p`
  font-weight: bold;
  font-size: 20px;
  padding-top: 30px;
  padding-bottom: 20px;
`;

const OrderButton = styled.button`
  width: 250px;
  height: 40px;
  font-size: 25px;
  background-color: orange;
  border: none;
  border-radius: 15px;
  text-align: center;
  margin-left: 25px;
  margin-top: 10px;

  &:hover {
    transform: scale(1.1);
    color: white;
    cursor: pointer;
  }
`;
