import styled from "styled-components"
import { AiOutlineShoppingCart} from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import { useContext } from "react";
import { UserContext } from "./UserContext"

const Header = () => {
  
  const {currentUser, setCurrentUser} = useContext(UserContext);

  const user = localStorage.getItem("user")
  const userId = JSON.parse(user);

  const [categories, setCategories ] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("")

  // fetches the categories and stores it in state


  useEffect(() => {
    fetch("/api/allcategories")
    .then(response => response.json())
    .then(parsed => {
      setCategories(parsed.data)
    })
  }, []);

  useEffect(()=>(
    fetch(`/api/user/${userId}`)
    .then((response) => response.json())
    .then((parsed) => {
      if(parsed.status === 200){
        setLoggedInUser(parsed.data.name)
        setCurrentUser(parsed.data.name)
        localStorage.setItem("user", JSON.stringify(parsed.data._id))
      }
      })
    .catch((error) => {
        console.log(error)
    })
    ),[]);

  return (
    <>
      {!categories ? <h1>Loading</h1> :
        <Wrapper>
    <Container>
      <StyledNavlink to="/">Logo</StyledNavlink>
      <TitleNavlink to="/">Wearables </TitleNavlink>
      <SearchCart>
        <SearchBar/>
        <StyledNavlink to="/signin">{currentUser ? `Hello ${loggedInUser}` : "Sign In"}</StyledNavlink>
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
background-color: white;
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