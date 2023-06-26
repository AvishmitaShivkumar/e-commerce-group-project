import styled from "styled-components";
import { InventoryContext } from "./InventoryContext";
import { useContext, useEffect, useState} from "react";
import Loader from "./Loader";
import StarImage from "./Images/Star.png"
import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";


const HomePage = () => {
  const {allItems} = useContext(InventoryContext)

  const [randomItem, setRandomItem] = useState({})
  const [lifestyleCategory, setLifestyleCategory] = useState(null)
  const [fitnessCategory, setFitnessCategory] = useState(null)
  const [medicalCategory, setMedicalCategory] = useState(null)

  console.log(allItems)


  useEffect(()=>{
    const index = Math.floor(Math.random() * 348)
    setRandomItem(allItems[index])
  },[allItems])
  
  useEffect(()=>{
      const lifestyleWatch = allItems.find((item)=>{
        return item._id === 6546
      })
      setLifestyleCategory(lifestyleWatch)
  }, [allItems])

console.log(lifestyleCategory)


useEffect(()=>{
  const fitnessWatch = allItems.find((item)=>{
    return item._id === 6718
  })
  setFitnessCategory(fitnessWatch)
}, [allItems])

console.log(fitnessCategory)

useEffect(()=>{
  const medicalWatch = allItems.find((item)=>{
    return item._id === 6890
  })
  setMedicalCategory(medicalWatch)
}, [allItems])

console.log(medicalCategory)





  return (
    <>
    {!randomItem 
    ?<Loader/>
        : <Container>
          <UpperBanner to={`/products/${randomItem._id}`}>
            <Top>
        <Left>
          <ItemTitle>{randomItem.name}</ItemTitle>
          <Image src={randomItem.imageSrc}/>
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
            {fitnessCategory && <CategoryImage src={fitnessCategory.imageSrc}/>}
          </BottomDiv>
        </LowerCategory>
        <LowerCategory to={"/catalog/Medical"}>
          <BottomDiv>
            <CategoryTitle>Medical</CategoryTitle>
            {medicalCategory && <CategoryImage src={medicalCategory.imageSrc}/>}
          </BottomDiv>
        </LowerCategory>
        <LowerCategory to={"/catalog/Lifestyle"}>
        <BottomDiv>
            <CategoryTitle>Lifestyle</CategoryTitle>
            {lifestyleCategory && <CategoryImage src={lifestyleCategory.imageSrc}/>}
          </BottomDiv>
        </LowerCategory>
      </LowerBanner>
    </Container>
    }
    </>
  );
};

const Container = styled.div`
height:100vh;
`

const UpperBanner = styled(Link)`
text-decoration: none;
flex-direction: column;
color: black;
margin-top: 1rem;
display: flex;
background-color:hsla(184 , 100% , 28%, .1);
`

const Top = styled.div`
display: flex;
justify-content: center;
align-content: center;
`

const Image = styled.img`
margin: 4rem 0 2rem;
max-width: 20rem;
`

const ItemTitle = styled.h2`
margin-top: 1rem;
font-size: 2rem;
text-align: center;
`

const ItemOriginalPrice = styled.h2`
position: absolute;
  z-index: 10;
  align-self: center;
  justify-self: center;
  font-size: 1.5rem;
  font-weight:bold;
`


const Quote = styled.h1`
margin: 2rem;
font-size: 5rem;
text-align: center;
`

const Bottom = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`

const Left = styled.div`
width: 50%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: white;
margin: 2rem;
border-radius: 5%;
`

const Right = styled.div`
width: 50%;
display: flex;
justify-content: center;
align-items: center;
`

const Star = styled(AiOutlineStar)`
font-size: 25rem;
position: relative;
z-index: 1;
color: var(--color-marigold) ;
`

const LowerBanner = styled.div`
display:flex;
justify-content: space-evenly;
`

const LowerCategory = styled(Link)`
text-align: center;
margin-top: 2rem;
width: 25%;
height: 25rem;
border: 0.10rem solid var(--color-marigold);
border-radius: 1rem;
text-decoration: none;
color:var(--color-ocean);
`

// const RightLower = styled(Link)`
// text-align: center;
// margin-top: 2rem;
// width: 25%;
// height: 25rem;
// border: 0.25rem solid var(--color-blush);
// border-radius: 1rem;
// text-decoration: none;
// color:black;
// `

// const MiddleLower = styled(Link)`
// text-align: center;
// margin-top: 2rem;
// width: 25%;
// height: 25rem;
// border: 0.25rem solid var(--color-ocean);
// border-radius: 1rem;
// text-decoration: none;
// color:black;
// `

const BottomDiv = styled.div`
height: 20rem;

`

const CategoryTitle = styled.h3`
margin: 1rem;
font-size: 2.5rem;
`

const CategoryImage = styled.img`
height: 15rem;
margin-top: 4rem;
`

export default HomePage;


