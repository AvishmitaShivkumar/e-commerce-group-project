import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Loader from "./Loader";
import {UserContext} from "./UserContext"

const Cart = ({ finalTotal, setFinalTotal }) => {
  const [cartItems, setCartItems] = useState();
  const [loading, setLoading] = useState(false);

  const {currentUser} = useContext(UserContext);
  const Navigate = useNavigate()

  const user = localStorage.getItem("user");
  const userId = JSON.parse(user);

  useEffect(
    () =>
      fetch(`/api/user/${userId}`)
        .then((response) => response.json())
        .then((parsed) => {
          if (parsed.status === 200) {
            setCartItems(parsed.data.cart);
            setLoading(true);
          }
        })
        .catch((error) => {
          console.error(error);
        }),
    [userId]
  );

  useEffect(() => {
    let sum = 0;
    if (cartItems !== undefined) {
      cartItems.forEach((item) => {
        const something = item.price.slice(1) * item.quantity;
        sum += something;
      });
      setFinalTotal(sum.toFixed(2));
    }
  }, [cartItems]);

  const removeItemFromCart = (itemId) => {
    fetch(`/api/delete/cart/${userId}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          window.alert("The item was removed from your cart");
          setCartItems(cartItems.filter((item) => item._id !== itemId));
        } else {
          window.alert(data.message);
        }
      });
  };

  if(currentUser===null){
    Navigate("/")
  }

  return (
    <>
      {!loading ? (
        <Loader />
      ) : (
        <Container>
          <CartTitle>Cart</CartTitle>
          <CartDiv>
            <ItemsDiv>
              <Items>
                Items
                {cartItems.map((item) => {
                  return (
                      <ItemDiv key={item._id}>
                        <Sides>
                          <ItemName>{item.name}</ItemName>
                          <ItemPrice>Price: {item.price}</ItemPrice>
                          <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
                          <TotalPerItem>
                            Total: ${item.price.slice(1) * item.quantity}
                          </TotalPerItem>
                        </Sides>
                        <Right>
                          <ItemImg src={item.imageSrc} />
                        </Right>
                        <Sides>
                          <RemoveButton
                            onClick={() => removeItemFromCart(item._id)}
                          >
                            Remove Item
                          </RemoveButton>
                        </Sides>
                      </ItemDiv>
                  );
                })}
              </Items>
            </ItemsDiv>
            <TotalOfCart>Total: {finalTotal}</TotalOfCart>
          </CartDiv>
          <CheckoutDiv>
            <Checkout to="/checkout">Checkout</Checkout>
          </CheckoutDiv>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 0 4rem;
`;

const CartTitle = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 3rem;
`;

const Items = styled.ul`
  font-size: 2rem;
`;

const ItemName = styled.li`
  font-size: 1.3rem;
  margin-top: 2rem;
`;

const ItemPrice = styled.li`
  font-size: 1.3rem;
  margin-top: 1rem;
`;

const ItemImg = styled.img`
  margin-left: 1rem;
`;

const ItemQuantity = styled.li`
  font-size: 1.3rem;
  margin-top: 1rem;
`;

const TotalPerItem = styled.li`
  font-size: 1.3rem;
  margin-top: 1rem;
`;

const ItemDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  margin-top: 2rem;
  background-color: white;
  padding: 2rem;
`;
const ItemsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr);
  grid-template-rows: 1fr;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  background-color: var(--color-secondary);
  padding: 4rem;
`;

const Sides = styled.div``;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RemoveButton = styled.button`
  align-items: center;
  background-color: var(--color-accent);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: var(--color-secondary);
  cursor: pointer;
  display: inline-flex;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  margin-top: 0.8rem;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;


  &:hover,
  &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(217, 60, 28, 0.65);
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: var(--color-secondary);
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: var(--color-accent);
    transform: translateY(0);
  }
`;

const CartDiv = styled.div`
  font-size: 2.5rem;
  min-height: 35rem;
  margin: 2rem;
  margin-bottom: 0;
  padding: 2rem;
`;

const TotalOfCart = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin: 3rem 0 1rem;
`;

const CheckoutDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Checkout = styled(Link)`
  align-items: center;
  background-color: var(--color-secondary);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: var(--color-accent);
  cursor: pointer;
  display: inline-flex;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
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
    color: rgba(217, 60, 28, 0.65);
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: var(--color-secondary);
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: var(--color-accent);
    transform: translateY(0);
  }

  &:disabled {
    color: var(--color-secondary);
    background-color: rgba(10, 10, 51, 0.4);
    background-color: var(--color-primary);
    opacity: 0.4;
    cursor: not-allowed;
}
`;

export default Cart;
