import React from "react";
import Product from "../Products"; // Importera produkten
import "./Category.css"; // Frivillig styling


const Category = ({ title, products }) => {
  return (
    <div className="category">
      <h2 className="category-title">{title}</h2>
      <div className="products-container">
        {products.map((product, index) => (
          <Product key={index} name={product.name} price={product.price} />
        ))}
      </div>
    </div>
  );
};


export default Category;