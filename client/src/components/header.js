import styled from "styled-components"
import { AiOutlineShoppingCart} from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import { useContext } from "react";
import { UserContext } from "./UserContext"

const Header = () => {
  
  const {currentUser, setCurrentUser, loggedInUser} = useContext(UserContext);

  const [categories, setCategories ] = useState("");

  // fetches the categories and stores it in state

  useEffect(() => {
    fetch("/api/allcategories")
    .then(response => response.json())
    .then(parsed => {
      setCategories(parsed.data)
    })
  }, []);


  const signOut = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
    <>
      {!categories ? <h1>Loading...</h1> :
        <Wrapper>
    <Container>
      <LogoLink to="/">W2</LogoLink>
      <TitleNavlink to="/">Wearables </TitleNavlink>
      <SearchCart>
        <SearchBar/>
        <StyledNavlink to="/signin">{currentUser ? `Hello ${loggedInUser}` : "Sign In"}</StyledNavlink>
        <StyledNavlink to="/" onClick={signOut}>{currentUser && "Sign Out"}</StyledNavlink>
        <Link to="/cart" style={{color:"var(--color-secondary)",fontSize: "25px" }}><AiOutlineShoppingCart /></Link>
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
        </Wrapper>
    }
    </>
  )

}

const Wrapper = styled.div`
position: sticky;
top: 0;
width: 100vw;
z-index:11;
`

const StyledNavlink = styled(NavLink)`
color: var(--color-secondary);
padding-right: 1rem;

&.active{
font-weight: bold;
}

&:hover{
opacity: .5;
}

`
const LogoLink = styled(StyledNavlink)`
color: var(--color-primary);
-webkit-text-stroke: 1px var(--color-secondary);
font-size: 1.4rem;
font-weight: bold;
`

const TitleNavlink = styled(StyledNavlink)`
font-size: xx-large;
font-weight: 600;
text-align: right;
margin-left: 8rem;
color: var(--color-accent);
`

const CategoryContainer = styled.div`
padding: 1rem 0;
display: flex;
justify-content: center;
background-color: var(--color-secondary);
`

const Container = styled.div`
display: flex;
justify-content: space-between ;
align-items: center;
padding: 1rem 2rem;
background-color: var(--color-primary);
`
const Category = styled(NavLink)`
text-decoration: none;
margin: 0 2rem;
color: var(--color-primary);

&.active{
font-weight: bold;
color: var(--color-accent);
font-size: 1.5rem;
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