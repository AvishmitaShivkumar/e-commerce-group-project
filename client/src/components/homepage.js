import styled from "styled-components";
import { InventoryContext } from "./InventoryContext";
import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const HomePage = () => {
  const { allItems } = useContext(InventoryContext);

  const [randomItem, setRandomItem] = useState({});
  const [lifestyleCategory, setLifestyleCategory] = useState(null);
  const [fitnessCategory, setFitnessCategory] = useState(null);
  const [medicalCategory, setMedicalCategory] = useState(null);

  console.log(allItems);

  useEffect(() => {
    const index = Math.floor(Math.random() * 348);
    setRandomItem(allItems[index]);
  }, [allItems]);

  useEffect(() => {
    const lifestyleWatch = allItems.find((item) => {
      return item._id === 6546;
    });
    setLifestyleCategory(lifestyleWatch);
  }, [allItems]);

  console.log(lifestyleCategory);

  useEffect(() => {
    const fitnessWatch = allItems.find((item) => {
      return item._id === 6718;
    });
    setFitnessCategory(fitnessWatch);
  }, [allItems]);

  console.log(fitnessCategory);

  useEffect(() => {
    const medicalWatch = allItems.find((item) => {
      return item._id === 6890;
    });
    setMedicalCategory(medicalWatch);
  }, [allItems]);

  console.log(medicalCategory);

  return (
    <>
      {!randomItem ? (
        <Loader />
      ) : (
        <Container>
          <UpperBanner to={`/products/${randomItem._id}`}>
            <Top>
              <Left>
                <ItemTitle>{randomItem.name}</ItemTitle>
                <Image src={randomItem.imageSrc} />
              </Left>
              <Right>
                <ItemOriginalPrice>{randomItem.price}</ItemOriginalPrice>
                <Star />
              </Right>
            </Top>
            <Bottom>
              <Quote>Our Featured Item!</Quote>
            </Bottom>
          </UpperBanner>
          <LowerBanner>
            <LowerCategory to={"/catalog/Fitness"}>
              <BottomDiv>
                <CategoryTitle>Fitness</CategoryTitle>
                {fitnessCategory && (
                  <CategoryImage src={fitnessCategory.imageSrc} />
                )}
              </BottomDiv>
            </LowerCategory>
            <LowerCategory to={"/catalog/Medical"}>
              <BottomDiv>
                <CategoryTitle>Medical</CategoryTitle>
                {medicalCategory && (
                  <CategoryImage src={medicalCategory.imageSrc} />
                )}
              </BottomDiv>
            </LowerCategory>
            <LowerCategory to={"/catalog/Lifestyle"}>
              <BottomDiv>
                <CategoryTitle>Lifestyle</CategoryTitle>
                {lifestyleCategory && (
                  <CategoryImage src={lifestyleCategory.imageSrc} />
                )}
              </BottomDiv>
            </LowerCategory>
          </LowerBanner>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  height: 100vh;
`;

const UpperBanner = styled(Link)`
  text-decoration: none;
  flex-direction: column;
  margin-top: 1rem;
  display: flex;
  background-image: url("../homepage_banner.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Image = styled.img`
  margin: 4rem 0 2rem;
  max-width: 20rem;
`;

const ItemTitle = styled.h2`
  margin-top: 1rem;
  font-size: 2rem;
  text-align: center;
`;

const ItemOriginalPrice = styled.h2`
  position: absolute;
  z-index: 10;
  align-self: center;
  justify-self: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Quote = styled.h1`
  margin: 2rem;
  font-size: 5rem;
  text-align: center;
  color: var(--color-secondary);
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Left = styled.div`
width: 50%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: white;
margin: 2rem;
border-radius: 5%;
position: relative;
`

// const Left = styled.div`
// width: 50%;
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// /* background-color: white; */
// background: rgb(2,0,36);
// background: linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 75%, rgba(0,212,255,0) 100%); 
// margin: 2rem;
// border-radius: 5%;
// position: relative;

// &::after{
//   position: absolute;
//   content: "";
//   height: 100%;
//   width: 100%;
//   top: 0;
//   /* background-color:rgba(255,255,255,0.1); */
  
//   border-radius: 5%;
// }
// `

const Right = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Star = styled(AiFillStar)`
  font-size: 25rem;
  position: relative;
  z-index: 1;
  color: var(--color-secondary);
`;

const LowerBanner = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const LowerCategory = styled(Link)`
  text-align: center;
  margin-top: 2rem;
  width: 25%;
  height: 25rem;
  box-shadow: rgba(0, 0, 0, 0.7) 0px 2px 4px;
  border-radius: 1rem;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
  }
`;

const BottomDiv = styled.div`
  height: 20rem;
`;

const CategoryTitle = styled.h3`
  margin: 1rem;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-accent);
`;

const CategoryImage = styled.img`
  height: 15rem;
  margin-top: 4rem;
`;

export default HomePage;
