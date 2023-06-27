import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Checkout = ({ finalTotal }) => {
    const { itemId } = useParams();
    const [ordered, setOrdered] = useState(null);
    const [loading, setLoading] = useState(true)
    const [companyId, setCompanyId] = useState(null)
    const [cart, setCart] = useState(null)
    const [cartId, setCartId] = useState(null)
    // const jsonCart = JSON.stringify(cart);

    const user = localStorage.getItem("user");
    const userId = JSON.parse(user);

    const navigate = useNavigate();

    const initialValue = {
        fname: "",
        lname: "",
        address: "",
        address2: "",
        postalCode: "",
    };

    const [formData, setFormData] = useState(initialValue);

    const handleChange = (e) => {
        const newData = { ...formData };
        newData[e.target.id] = e.target.value;
        setFormData(newData);
    };

    useEffect(() => {
      const newArray = []
      
      if(cart){
        cart.forEach((item)=>{
          newArray.push(item._id)
        })
        setCartId(newArray)
        
      }
    },[cart])
    

    useEffect(() => {
        fetch(`/api/user/${userId}`)
        .then((res) => res.json())
        .then((parsed) => {
            setOrdered(parsed.data);
            setCart(parsed.data.cart)
            setLoading(false)
        
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const body = {
            user: userId,
            cart: cartId,
            shipping: {
                address: formData.address,
                address2: formData.address2,
                postalCode: formData.postalCode,
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
                navigate(`/confirmation/${parsed.data}`);
        });
        
    };



    if (loading) {
        return (
            <p>loading...</p>
        )
    }

    

    return (
        <Container>
            <CheckoutHeader>Checkout</CheckoutHeader>
            
            <DivLeft>
              <ItemDiv>
              <YourItems>Your Items</YourItems>
              {ordered.cart.map((item) => {

                  return (
                      <ItemGroup key={item._id}>
                          <Img src={item.imageSrc}/>
                              <div>
                                  <ItemInfo>{item.name}</ItemInfo>
                                  <ItemInfo>Price per Item{item.price}</ItemInfo>
                                  <ItemInfo>Qty: {item.quantity}</ItemInfo>
                              </div>
                      </ItemGroup>
                  );
              })}
              </ItemDiv>

              <Form onSubmit={handleSubmit}>
                  <div>
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
                      
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                      value={formData.address2}
                      onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                      type="text"
                      id="address2"
                      name="address2"
                      placeholder="Apartment or suite"
                      />
                  </InputContainer>
                  <InputContainer>
                      <Label htmlFor="address2">Postal code:</Label>
                      <Input
                      
                      value={formData.postalcode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      type="text"
                      id="postalcode"
                      name="postalcode"
                      placeholder="A0A 0A0"
                      required
                      />
                  </InputContainer>
                  </div>
                  

              <OrderSummeryContainer>
                  <OrderSummery>Order Summary</OrderSummery>
                  <SummaryDiv>
                  <Summary>Items:</Summary>
                  <Summary>Shipping: $10</Summary>
                  <Summary>Tax: 5%</Summary>
                  </SummaryDiv>
                  <OrderTotal>Order Total: {finalTotal}</OrderTotal>
                  <OrderButton type="submit">Order now</OrderButton>
              </OrderSummeryContainer>

            </Form>
          </DivLeft>
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
  width: 100vw;
  display: flex;
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
  margin-left:150px;
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
