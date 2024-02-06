import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";
import ItemComponent, { NameContainer } from "./ItemComponent";
import { InventoryContext } from "./InventoryContext";


const CompanyPage = () => {
  const { _id } = useParams();
  const [companyInfo, setcompanyInfo] = useState(undefined);
  const { allItems } = useContext(InventoryContext)
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/company/${_id}`)
      .then((response) => response.json())
      .then(({ data }) => {
        setcompanyInfo(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [_id]);

  useEffect(() => {
    if (companyInfo) {
      // Filter the items based on the company's _id
      const filtered = allItems.filter((item) => item.companyId === companyInfo._id);
      setFilteredItems(filtered);
    }
  }, [companyInfo, allItems]);


  return (
    <>
      {!companyInfo ? (
        <Loader />
      ) : (
          <>
          <HeaderContainer>
              <Title>{companyInfo.name}</Title>
              {/* Not using the url so customers shop with us instead :) */}
              {/* <h2>{companyInfo.url}</h2> */}
              <h2>Company located in {companyInfo.country}</h2>
              <p>Company description :  Here we can have the description of the company.</p>
            </HeaderContainer>

            <ItemsContainer>
            {filteredItems.map((item) => (
            <ItemComponent key={item._id} oneItem={item} company={companyInfo} />
            ))}
            </ItemsContainer>
            
        </>
      )}
    </>
  );
};

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
        font-size:1.5rem;
        text-align: center;
  margin: 2rem;
`;

const Title = styled.h1`
    font-size:3rem;
    font-weight: 700;
    margin-bottom: 2rem;
`
const ItemsContainer = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 2em; 
max-width: 100vw;
min-width: 100vw;
`

export default CompanyPage;
