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
  });

  return (
    <>
    {!allItems ? <Loader/> :
    <Container>
      <h1>{category}</h1>
      {/*  map through array of items in the category and return product image, name and price in a Link that redirects to individual product page */}
      {
        itemsByCategory.map((item) => {
          return (
          <Link to={`/products/${item._id}`} key={item._id}>
            <img src={item.imageSrc}/>
            <p>{item.name}</p>
            <p>{item.price}</p>
          </Link>)
        })
      }
    </Container>
    }
    </>
  )
}

const Container = styled.div`
`


export default ProductCatalog
