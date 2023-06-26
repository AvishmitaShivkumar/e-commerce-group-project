import styled from "styled-components"
import { AiOutlineShoppingCart} from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./searchbar";

const Header = () => {
  const [ categories, setCategories ] = useState("");

  // fetches the categories and stores it in state
  useEffect(() => {
    fetch("/api/allcategories")
    .then(response => response.json())
    .then(parsed => {
      setCategories(parsed.data)
    })
  }, []);

  return (
    <>
      {!categories ? <h1>Loading</h1> :
        <>
    <Container>
      <StyledNavlink to="/">Logo</StyledNavlink>
      <TitleNavlink to="/">Wearables </TitleNavlink>
      <SearchCart>
        <SearchBar/>
        <StyledNavlink to="/signin">Sign in</StyledNavlink>
        <Link to="/cart" style={{color:"white",fontSize: "25px" }}><AiOutlineShoppingCart /></Link>
      </SearchCart>
        </Container>
          <CategoryContainer>
         {/* maps through categories and returns a NavLink for each one */}
            {categories.map((category) => {
              return(
                <Category key={category} to={`/catalog/${category}`}>{category}</Category>
              )
            })}
          </CategoryContainer>
        </>
    }
    </>
  )

}

const StyledNavlink = styled(NavLink)`
color: white;
padding-right: 1rem;

&.active{
font-weight: bold;
}

&:hover{
opacity: .5;
}

`
const TitleNavlink = styled(StyledNavlink)`
font-size: xx-large;
font-weight: 600;
text-align: right;
margin-left: 8rem;
`

const CategoryContainer = styled.div`
padding: 1rem 0;
display: flex;
justify-content: center;
`

const Container = styled.div`
display: flex;
justify-content: space-between ;
align-items: center;
padding: 1rem 2rem;
background-color: var(--color-ocean);
`
const Category = styled(NavLink)`
text-decoration: none;
margin: 0 2rem;
color: var(--color-navy);

&.active{
font-weight: bold;
color: var(--color-marigold);
}

&:hover{
opacity: .5;
}

`
const SearchCart = styled.div`
display: flex;
align-items: center;
`



export default Header