import styled from "styled-components"
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { InventoryContext } from "./InventoryContext";
import Loader from "./Loader";

const ProductCatalog = () => {
  const { category } = useParams();
  const  { allItems } = useContext(InventoryContext);

  // filters allItems and returns only those that match the category
const itemsByCategory = allItems.filter((item) => {
    if(item.category === category) {
      return item;
    }
  return null
  });

  return (
    <>
    {!allItems ? <Loader/> :
    <Container>
      {/* <h1>{category}</h1> */}
      {/*  map through array of items in the category and return product image, name and price in a Link that redirects to individual product page */}
      {
        itemsByCategory.map((item) => {
          return (
          <StyledLink to={`/products/${item._id}`} key={item._id}>
              <img src={item.imageSrc} alt={item.name} />
            <p>{item.price}</p>
            <p>{item.name}</p>
          </StyledLink>)
        })
      }
    </Container>
    }
    </>
  )
}

const Container = styled.div`
display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 2rem 4rem ;
  gap: 3rem 2rem;
`
const StyledLink = styled(Link)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: black;
box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
padding-bottom: 1rem;
text-align: center;
`

export default ProductCatalog
