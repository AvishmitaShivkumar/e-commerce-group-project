import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";

const ItemComponent = ({oneItem, company}) => {

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
        <Button disabled={oneItem.numInStock === 0}>
        {oneItem.numInStock > 0 ? "Add to cart" : "Out of stock"}
        </Button>
        </InformationContainer>
        </ItemContainer>
    )
};

export default ItemComponent;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  align-items: center;
  max-width: 50vw;
    margin-top: 5rem;
padding: 2em;
box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;`;


const BigImage = styled.img`
  width: 25vw;
  overflow: hidden;
  grid-area: 1 / 1 / span 2;
  top: 0;
  margin-right: 50px;
`;

const ItalicParagraph = styled.p`
font-style: italic;
`
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  text-align: left;
    font-size:2rem;
    font-weight: 700;
`;

const InformationContainer = styled.div`
  display: grid;
  text-align: left;
  justify-self: flex-start;
  width: 25vw;
`;

const BoldParagraph = styled.p`
font-weight: 600;
font-size: larger;
`
const Button = styled.button`
  background-color: var(--color-navy);
  padding: 20px 40px;
  margin-top: 1em;
  width: 10em;
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
  }
`;

export {BoldParagraph}