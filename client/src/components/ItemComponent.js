import { useParams } from "react-router-dom";

const ItemComponent = ({oneItem, company}) => {

    return (
        <>
        <img  src={oneItem.imageSrc}/>
        <h1>{oneItem.name}</h1>
        <p>{oneItem.price}</p>
        <button disabled={oneItem.numInStock === 0}>
        {oneItem.numInStock > 0 ? "Add to cart" : "Out of stock"}
        </button>
        <p>{oneItem.numInStock} in stock</p>
        <p>Body location: {oneItem.body_location}</p>
        <p>Category: {oneItem.category}</p>
        <p>Made by: {company.name}</p>
        </>
    )
};

export default ItemComponent;