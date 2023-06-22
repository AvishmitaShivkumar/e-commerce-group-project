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
      <h1>Logo</h1>
      <SearchCart>
        <NavLink>Sign in</NavLink>
        <SearchBar/>
        <Link><AiOutlineShoppingCart style={{fontSize: "25px" }}/></Link>
      </SearchCart>
        </Container>
         <div>
         {/* maps through categories and returns a NavLink for each one */}
           {categories.map((category) => {
             return(
               <Category key={category} to={`/catalog/${category}`}>{category}</Category>
             )
           })}
         </div>
        </>
    }
    </>
  )

}

const Container = styled.div`
display: flex;
justify-content: space-between ;
align-items: center;
border: 0.1rem solid black;
padding: 0.3rem;
`
const Category = styled(NavLink)`
text-decoration: none;
margin: 2rem;

&.active{

}
`
const SearchCart = styled.div`
display: flex;
align-items: center;
`



export default Header