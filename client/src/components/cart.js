import styled from "styled-components"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const Cart = ({ finalTotal, setFinalTotal}) => {

  const [cartItems, setCartItems] = useState()
  const [loading, setLoading] = useState(false)

  const user = localStorage.getItem("user")
  const userId = JSON.parse(user);

  useEffect(()=>(
  fetch(`/api/user/${userId}`)
  .then((response) => response.json())
  .then((parsed) => {
    if(parsed.status === 200){
      setCartItems(parsed.data.cart)
      setLoading(true)
    }
    })
  .catch((error) => {
      console.log(error)
  })
  ),[])

    // useEffect(() => {

    //     if (cartItems) {
    //       const newTotal = cartItems.forEach((item)=>{
    //       const something = item.price.slice(1)*item.quantity
    //       const theTotal = something*1.05
    //       setFinalTotal(theTotal+finalTotal)
    //     })
    //     }
    // }, [])
    

    useEffect(() => {
      let sum = 0
      if(cartItems !==undefined){
        cartItems.forEach((item)=>{
        const something = item.price.slice(1)*item.quantity
        sum += something
        
        
      })
      setFinalTotal(sum.toFixed(2))
    }
    },[cartItems])
    

  return (
    <>
    {!loading ? 
    <p>loading...</p> :
    <Container>
      <CartTitle>Cart</CartTitle>
      <CartDiv>
      <ItemsDiv>
      <Items>Items:
        {cartItems.map((item)=>{
          return (<>
          <ItemDiv key={item._id}>
            <Left>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>Price: {item.price}</ItemPrice>
              <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
              <TotalPerItem>Total: ${item.price.slice(1)*item.quantity}</TotalPerItem>
            </Left>
            <Right>
              <ItemImg src={item.imageSrc}/>
            </Right>
          </ItemDiv>
          </>)
        })}
      </Items>
      </ItemsDiv>
      <TotalOfCart>Total: {finalTotal}</TotalOfCart>
      </CartDiv>
      <CheckoutDiv>
        <Checkout to="/checkout">Checkout</Checkout>
      </CheckoutDiv>
    </Container>
  }
  </>
  )
  
}

const Container = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
margin-top:2rem;
`

const CartTitle = styled.h1`
display: flex;
justify-content: center;
font-size: 4rem;
`

const Items = styled.ul`
font-size: 3rem;
`


const ItemName = styled.li`
font-size: 1.5rem;
margin-top: 2rem;
`

const ItemPrice = styled.li`
font-size: 1.5rem;
margin-top: 1rem;
`

const ItemImg = styled.img`
margin-left: 1rem;
`

const ItemQuantity = styled.li`
font-size: 1.5rem;
margin-top: 1rem;
`

const TotalPerItem = styled.li`
font-size: 1.5rem;
margin-top: 1rem;
`

const ItemDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  align-items: center;
  max-width: 1200px;
    margin: auto;
    margin-top: 5rem;
  border: 0.25rem solid black;
  padding:2rem;
`
const ItemsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat( 1fr);
  grid-template-rows: 1fr;
  align-items: center;
  max-width: 1200px;
    margin: auto;
    margin-top: 5rem;
`



const Left = styled.div`
`

const Right = styled.div`
display:flex;
justify-content: center;
align-items: center;
`


const CartDiv = styled.div`
border: 0.1rem solid black;
font-size: 2.5rem;
min-height: 35rem;
margin: 2rem;
padding: 2rem;
`

const TotalOfCart = styled.h2`
text-align: center;
font-size: 3rem;
margin: 5rem 0 1rem;
`

const CheckoutDiv = styled.div`
display: flex;
justify-content: center;
`

const Checkout = styled(Link)`
background-color: var(--color-navy);
  padding: 20px 40px;
  margin-top: 1em;
  width: 300px;
  border-radius: 10px;
  color: white;
  font-size: x-large;
  justify-self: center;
  margin-bottom: 4rem;

  &:hover {
    background: var(--color-ocean);
    cursor: pointer;
  }

  &:disabled {
    background: #707070;
    opacity: 0.4;
    cursor: not-allowed;
  }
`


export default Cart
