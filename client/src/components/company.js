import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";
import ItemComponent from "./ItemComponent";
import { InventoryContext } from "./InventoryContext";


const CompanyPage = () => {
  const { _id } = useParams();
  const [companyInfo, setcompanyInfo] = useState(undefined);
  const { allItems } = useContext(InventoryContext)
  const [filteredItems, setFilteredItems] = useState([]);
  console.log("🚀 ~ file: company.js:14 ~ CompanyPage ~ filteredItems:", filteredItems)


  useEffect(() => {
    fetch(`/api/company/${_id}`)
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
              <h1>{companyInfo.name}</h1>
              {/* Not using the url so customers shop with us instead :) */}
              {/* <h2>{companyInfo.url}</h2> */}
              <h2>Company located in {companyInfo.country}</h2>
              <p>Company description : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua.</p>
            </HeaderContainer>

          {filteredItems.map((item) => (
            <ItemComponent key={item._id} oneItem={item} company={companyInfo} />
          ))}
            
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
        color:#757;
        text-align: center;

`;

export default CompanyPage;
