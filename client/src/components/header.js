import styled from "styled-components"
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const Header = () => {

  return (
    <Container>
      <h1>Logo</h1>
      <div>
        <NavLink>Category1</NavLink>
        <NavLink>Category1</NavLink>
        <NavLink>Category1</NavLink>
        <NavLink>Category1</NavLink>
      </div>
      <SearchCart>
        <div>
          <input type="search" value="text" placeholder="Activity tracker"/> 
          <Link><AiOutlineSearch style={{fontSize: "25px" }}/></Link>
        </div>
        <Link><AiOutlineShoppingCart style={{fontSize: "25px" }}/></Link>
      </SearchCart>
    </Container>
  )

}

const Container = styled.div`
display: flex;
justify-content: space-between ;
`
const SearchCart = styled.div`
display: flex;
`


export default Header
