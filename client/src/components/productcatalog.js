import styled from "styled-components"
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductCatalog = () => {
  const { category } = useParams();
  const [ items, setItems ] = useState("");

  // fetches the items in the category and stores it in state
  useEffect(() => {
    fetch("endpoint goes here")
    .then(response => response.json())
    .then(parsed => {
      console.log(parsed);
      // setItems(parsed.something)
    })
    .catch((error) => {
      console.error(error)
    });
  }, []);

  return (
    <></>
  //   {!items ? <h1>Loading...</h1> :
  //   <Container>
  //     <h1>{category}</h1>
  //     {/*  map through array of items in the category and return product image, name and price in a Link that redirects to individual product page */}
  //     {/* {
  //       items.map((item) => {
  //         <Link>
  //           <img src="itemSrc"/>
  //           <p>product name</p>
  //           <p>price</p>
  //         </Link>
  //       })
  //     } */}
  // </Container>
  //   }
  )

}

const Container = styled.div`
`


export default ProductCatalog
