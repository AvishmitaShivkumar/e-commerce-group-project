import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { UserContext } from "./UserContext";
import { useContext, useState } from "react";


const ItemComponent = ({oneItem, company}) => {

  const [loading, setLoading] = useState(false)

  const user = localStorage.getItem("user")
  const userId = JSON.parse(user);


  const addToCartClick = (event) => {
    setLoading(true)
    event.preventDefault();
    fetch("/api/cartcollection", {
      method: "POST",
      body: JSON.stringify(
        {
          "userId": {
            "_id": userId
          },
          "items": oneItem
        }),
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
  })
      .then((response) => response.json())
      .then((parsed) => {
          if(parsed.status === 200){
            window.alert("This item has been added to your cart!")
            setLoading(false)
          }
      })
      .catch((error) => {
          window.alert(error)
      })
  }

    return (
        <ItemContainer>
            <BigImage src={oneItem.imageSrc} />
            <NameContainer>
        {oneItem.name}
            </NameContainer>
            <InformationContainer>
                <BoldParagraph>{oneItem.price}</BoldParagraph>
        <ItalicParagraph>{oneItem.numInStock} in stock</ItalicParagraph>
        <p>Body location: {oneItem.body_location}</p>
        <p>Category: {oneItem.category}</p>
                <Link to={`/company/${oneItem.companyId}`} style={{color: "var(--color-ocean)", cursor: "pointer"}}><p>Made by: {company.name}</p></Link>
        <Button disabled={oneItem.numInStock === 0} onClick={addToCartClick}>
        {!oneItem.numInStock > 0 ? "Out of stock" : loading ? "Adding to cart..."  : "Add to cart"}
        </Button>
      </InformationContainer>
    </ItemContainer>
  );
};

export default ItemComponent;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  align-items: center;
  max-width: 90%;
  margin-top: 5rem;
  padding: 2em;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  `;

const BigImage = styled.img`
  width: 80%;
  overflow: hidden;
  grid-area: 1 / 1 / span 2;
  top: 0;
  margin-right: 50px;
`;

const ItalicParagraph = styled.p`
  font-style: italic;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  text-align: left;
  font-size: 2rem;
  font-weight: 700;
`;

const InformationContainer = styled.div`
  display: grid;
  text-align: left;
  justify-self: flex-start;
  width: 100%;
  max-width: 100%;
`;

const BoldParagraph = styled.p`
  font-weight: 600;
  font-size: larger;
`;

const Button = styled.button`
  align-items: center;
  background-color: var(--color-secondary);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: var(--color-accent);
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
  width: auto;
  margin-top: 2em;

&:hover,
&:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(217,60,28,0.65);
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

&:disabled{  
  color: var(--color-secondary);
  background-color: rgba(10,10,51,0.4) ;
    /* background-color: var(--color-primary);
    opacity: 0.4; */
    cursor: not-allowed;
}

  /* background-color: var(--color-navy);
  padding: 20px 40px;
  margin-top: 1em;
  width: 70%;
  border-radius: 10px;
  color: white;
  font-size: x-large;
  justify-self: center;

  &:hover {
    background: var(--color-ocean);
    cursor: pointer;
  }

  &:disabled {
    background: #707070;
    opacity: 0.4;
    cursor: not-allowed;
  } */
`;
