import React from "react";
import "./Product.css"; 

const Product = ({ name, price }) => {
  return (
    <div className="product">
      <h3>{name}</h3>
      <p>{price} kr</p>
    </div>
  );
};


export default Product;