import React from "react";
import "./CategoriesList.css";
import Category from "./Category"; 

const CategoriesList = () => {
  const categories = [
    { title: "Skor", products: [{ name: "Nike Air", price: 999 }, { name: "Adidas Superstar", price: 799 }, { name: "sanic skora", price: 7999 }] },
    { title: "Jackor", products: [{ name: "Vinterjacka", price: 1299 }, { name: "Regnjacka", price: 699 }, { name: "Regnjacka", price: 699 }] },
    { title: "Skor", products: [{ name: "Nike Air", price: 999 }, { name: "Adidas Superstar", price: 799 }, { name: "sanic skora", price: 7999 }] },
    ];

    return (
      <div className="categories-container">
        {categories.map((category, index) => (
          <Category key={index} title={category.title} products={category.products} />
        ))}
      </div>
    );
  };

export default CategoriesList;
