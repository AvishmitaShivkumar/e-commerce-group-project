import styled from "styled-components";
import { InventoryContext } from "./InventoryContext";
import { useContext, useEffect, useState} from "react";
import Loader from "./Loader";
import StarImage from "./Images/Star.png"


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
        </Right>
      </UpperBanner>
      <LowerBanner>
        <LeftLower>
          <BottomDiv>
            <CategoryTitle>Fitness</CategoryTitle>
            {fitnessCategory && <CategoryImage src={fitnessCategory.imageSrc}/>}
          </BottomDiv>
        </LeftLower>
        <MiddleLower>
          <BottomDiv>
            <CategoryTitle>Medical</CategoryTitle>
            {medicalCategory && <CategoryImage src={medicalCategory.imageSrc}/>}
          </BottomDiv>
        </MiddleLower>
        <RightLower>
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
transform: translateX(40%) translateY(1000%);
`


const Quote = styled.h1`
margin: 1.5rem;
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
margin-left: 2rem;
height: 20rem;
`

const LowerBanner = styled.div`
display:flex;
justify-content: space-evenly;
`

const LeftLower = styled.div`
text-align: center;
margin-top: 2rem;
width: 25%;
border: 0.25rem solid black;
`

const RightLower = styled.div`
text-align: center;
margin-top: 2rem;
width: 25%;
border: 0.25rem solid black;
`

const MiddleLower = styled.div`
text-align: center;
margin-top: 2rem;
width: 25%;
border: 0.25rem solid black;
`

const BottomDiv = styled.div`
height: 20rem;

`

const CategoryTitle = styled.h3`
margin: 1rem;
font-size: 2rem;
`

const CategoryImage = styled.img`
height: 15rem;
`

export default HomePage;


// Image by Clker-Free-Vector-Images from Pixabay