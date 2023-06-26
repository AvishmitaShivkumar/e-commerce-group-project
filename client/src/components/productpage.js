import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Loader from "./Loader";
import ItemComponent from "./ItemComponent";


const ProductPage = () => {
  const { product } = useParams();
  const [ oneItem, setOneItem ] = useState("");
  const [ company, setCompany ] = useState("");

  useEffect(() => {
    fetch(`/api/item/${product}`)
    .then(response => response.json())
    .then(parsed => {
      setOneItem(parsed.data)
    })
  }, [product]);

    useEffect(() => {
    if(oneItem) { 
      fetch(`/api/company/${oneItem.companyId}`)
    .then(response => response.json())
    .then(parsed => {
      setCompany(parsed.data)
    })
    }
  }, [oneItem])
  
  
  return (
    <>
    {!oneItem ? <Loader/> :
      <ItemComponent oneItem={oneItem} company={company}/>
    }
    </>
  )

}

const Container = styled.div`
`


export default ProductPage
