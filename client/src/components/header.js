import styled from "styled-components"
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [ categories, setCategories ] = useState();

  // fetches the categories and stores it in state
  useEffect(() => {
    fetch("category endpoint goes here")
    .then(response => response.json())
    .then(parsed => {
      console.log(parsed)
      // setCategories(parsed.something)
    })
  }, []);

  return (
    <Container>
      <h1>Logo</h1>
      <div>
        {/* likely need to change contents of this div to map over categories and return each name */}
        <Category to="">Category</Category>
        <Category to="">Category</Category>
        <Category to="">Category</Category>
        <Category to="">Category</Category>
      </div>
      <SearchCart>
        <Search>
          <InputBox type="search" value="text" placeholder="Activity tracker"/> 
          <SearchIcon><AiOutlineSearch style={{fontSize: "20px" }}/></SearchIcon>
        </Search>
        <Link><AiOutlineShoppingCart style={{fontSize: "25px" }}/></Link>
      </SearchCart>
    </Container>
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
const Search = styled.div`
display: flex;
align-items: center;
border: 0.1rem solid black;
margin-right: 1rem;
`
const InputBox = styled.input`
height: 1.5rem;
border: none;
`
const SearchIcon = styled.button`
background-color: white;
border: none;
`


export default Header