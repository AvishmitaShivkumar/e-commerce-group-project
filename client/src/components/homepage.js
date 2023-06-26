import styled from "styled-components";
import { InventoryContext } from "./InventoryContext";
import { useContext, useEffect, useState} from "react";
import Loader from "./Loader";
import StarImage from "./Images/Star.png"
import { Link } from "react-router-dom";


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
    :<Container>
      <UpperBanner>
        <Left>
          <Quote>Our Featured Item!</Quote>
        </Left>
        <Middle>
          <ItemTitle>{randomItem.name}</ItemTitle>
          <Image src={randomItem.imageSrc}/>
        </Middle>
        <Right>
          <ItemOriginalPrice>{randomItem.price}</ItemOriginalPrice>
          <Star src={StarImage}/>
          {/* // Image by Clker-Free-Vector-Images from Pixabay */}
        </Right>
      </UpperBanner>
      <LowerBanner>
        <LeftLower to={"/catalog/Fitness"}>
          <BottomDiv>
            <CategoryTitle>Fitness</CategoryTitle>
            {fitnessCategory && <CategoryImage src={fitnessCategory.imageSrc}/>}
          </BottomDiv>
        </LeftLower>
        <MiddleLower to={"/catalog/Medical"}>
          <BottomDiv>
            <CategoryTitle>Medical</CategoryTitle>
            {medicalCategory && <CategoryImage src={medicalCategory.imageSrc}/>}
          </BottomDiv>
        </MiddleLower>
        <RightLower to={"/catalog/Lifestyle"}>
        <BottomDiv>
            <CategoryTitle>Lifestyle</CategoryTitle>
            {lifestyleCategory && <CategoryImage src={lifestyleCategory.imageSrc}/>}
          </BottomDiv>
        </RightLower>
      </LowerBanner>
    </Container>
    }
    </>
  );
};

const Container = styled.div`
height:100vh;
`

const UpperBanner = styled.div`
margin-top: 1rem;
display: flex;
justify-content: space-evenly;
border: 0.25rem solid black;
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
  top: 25%;
  left: 77%;
  transform: translate(-50%, -50%);
  z-index: 10;
`


const Quote = styled.h1`
margin: 2rem;
font-size: 6rem;
text-align: center;
`

const Left = styled.div`
width: 33%;
display: flex;
flex-direction: column;
`

const Middle = styled.div`
width: 33%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Right = styled.div`
width: 33%;
`

const Star = styled.img`
margin-left: 3rem;
height: 20rem;
position: relative;
z-index: -10;
`

const LowerBanner = styled.div`
display:flex;
justify-content: space-evenly;
`

const LeftLower = styled(Link)`
text-align: center;
margin-top: 2rem;
width: 25%;
height: 25rem;
border: 0.25rem solid black;
border-radius: 1rem;
text-decoration: none;
color:black;
`

const RightLower = styled(Link)`
text-align: center;
margin-top: 2rem;
width: 25%;
height: 25rem;
border: 0.25rem solid black;
border-radius: 1rem;
text-decoration: none;
color:black;
`

const MiddleLower = styled(Link)`
text-align: center;
margin-top: 2rem;
width: 25%;
height: 25rem;
border: 0.25rem solid black;
border-radius: 1rem;
text-decoration: none;
color:black;
`

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


