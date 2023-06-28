import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

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
            <p><Loader/></p>
        )
    }



    return (
        <Container>
            <CheckoutHeader>Checkout</CheckoutHeader>
            
            <DivLeft>
                <Form onSubmit={handleSubmit}>
                    <ItemsShipping>
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
                    <InputWrapper>
                        <CustomerInfo>Shipping information</CustomerInfo>
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
                        </InputWrapper>
                        <InputWrapper>
                        <PaymentInfo>Payment</PaymentInfo>{" "}
                        <InputContainer>
                            <Label htmlFor="creditNum">Card number:</Label>
                            <Input
                            type="text"
                            id="creditNum"
                            name="creditNum"
                            placeholder="0000-0000-0000-0000"
                            minLength="19"
                            maxLength="19"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="nameOnCard">Name on card:</Label>
                            <Input
                            type="text"
                            id="nameOnCard"
                            name="nameOnCard"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="expDate">Expiration date:</Label>
                            <Input
                            type="text"
                            id="expDate"
                            name="expDate"
                            placeholder="MM/YY"
                            minLength="5"
                            maxLength="5"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="code">Security code (CVV/CVC):</Label>
                            <Input
                            type="text"
                            id="code"
                            name="code"
                            minLength="3"
                            maxLength="4"
                            />
                        </InputContainer>
                        </InputWrapper>
                        </ItemsShipping>
                        

                    <OrderSummeryContainer>
                        <OrderSummery>Order Summary</OrderSummery>
                        <SummaryDiv>
                            <Summary>Items:{finalTotal}</Summary>
                            <Summary>Shipping: $10</Summary>
                            <Summary>Tax: 5%</Summary>
                        </SummaryDiv>
                        <OrderTotal>Order Total: {(finalTotal*1.05+10).toFixed(2)}</OrderTotal>
                        <OrderButton type="submit">Order now</OrderButton>
                    </OrderSummeryContainer>

                </Form>
            </DivLeft>
        </Container>
    );
};

export default Checkout;

const DivLeft = styled.div`
  margin-top: 0;
  margin-bottom: 2.5rem;
`;

const Container = styled.div`
  margin: 3rem 2rem 0;
`;

const CheckoutHeader = styled.p`
  font-size: 3rem;
  text-align: center;
`;

const ItemsShipping = styled.div`
display: flex;
flex-direction: column;
`

const InputWrapper = styled.div`
margin: 0 5rem 2rem;
padding-bottom: 2rem;
border-bottom: 2px solid var(--color-primary);
`

const ItemDiv = styled.div`
  width: 50vw;
  margin: 2rem 0;
  background-color: var(--color-secondary);
  padding: 2rem 4rem 4rem;
`;
const YourItems = styled.p`
  font-size: 2rem;
  margin-left: 0;
`;

const ItemGroup = styled.div`
  display: flex;
  margin-top: 2rem;
  background-color: white;
  padding: 2rem;
`;

const Img = styled.img`
  width: 10vw;
  height: 10vh;
  object-fit: scale-down;
  margin-right: 5rem;
`;

const ItemInfo = styled.li`
  font-size: 1.3rem;
  list-style: none;
  padding-top: 0.6rem;
`;

const CustomerInfo = styled.p`
  font-size: 2rem;
  padding: 0.6rem;
  margin: 0;
  text-align: left;
  width: 100%;
`;

const Form = styled.form`
  margin-top: 1.8rem;
  display: flex;
  justify-content: center;
`;

const InputContainer = styled.div`
  margin-top: 1.25rem;
`;

const Label = styled.label`
  float: left;
  width: 15.6rem;
  font-size: 1.25rem;
`;

const Input = styled.input`
  text-align: center;
  width: 18.75rem;
  font-size: 1.25rem;
`;

const PaymentInfo = styled.p`
  font-size: 2rem;
  padding-bottom: 0.6rem;
  margin: 0;
`;

const OrderSummeryContainer = styled.div`
  margin-left:2rem;
  width: 20rem;
  background-color: var(--color-secondary);
  padding: 2rem;
  float: right;
  margin-top: 2rem;
  
`;
const OrderSummery = styled.p`
  margin-top: 0.6rem;
  font-size: 2rem;
  font-weight: bold;

  padding-bottom: 0.6rem;
`;

const SummaryDiv = styled.div`
  border-bottom: 2px solid var(--color-accent);
  margin-top: 2rem;
  padding-bottom: 2rem;
  
`;

const Summary = styled.p`
  font-size: 20px;
  padding-top: 0.6rem;
`;

const OrderTotal = styled.p`
  font-weight: bold;
  font-size: 20px;
  padding-top: 30px;
  padding-bottom: 20px;
`;

const OrderButton = styled.button`
  align-items: center;
  background-color: var(--color-primary);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: var(--color-secondary);
  cursor: pointer;
  display: inline-flex;
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: 20rem;

&:hover,
&:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color:  rgba(239,222,205,0.65);
}

&:hover {
  transform: translateY(-1px);
  
}

&:active {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: var(--color-secondary);
  transform: translateY(0);
}
`;
