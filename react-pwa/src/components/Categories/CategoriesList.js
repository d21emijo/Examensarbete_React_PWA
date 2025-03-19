import React, { useState, useEffect } from "react";
import "./CategoriesList.css"

const CategoryList = () => {
  const [jackets, setJackets] = useState([]); // State för att lagra jackor
  const [shoes, setShoes] = useState([]); // State för att lagra skor
  
  
  const itemsPerSection = 3; // Antal produkter per sektion
  const totalSectionsToShow = 4; // Antal sektioner som ska visas


  // const maxProducts = 40; // Max antal jackor att visa
  // const itemsPerSection = 3; // Antal produkter per sektion
  useEffect(() => {
    // 1. Hämta alla produkter från JSON-server
    fetch("http://localhost:5000/products") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av data");
        }
        return response.json(); // Konvertera svaret till JSON
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Fixar images-fältet
          const fixedData = data.map((product) => ({
            ...product,
            images: typeof product.images === "string" ? JSON.parse(product.images.replace(/'/g, '"')) : product.images
          }));
      
          // Filtrera jackor och skor
          const filteredJackets = fixedData.filter((product) =>
            product.terms.toLowerCase().includes("jackets")
          );
          const filteredShoes = fixedData.filter((product) =>
            product.terms.toLowerCase().includes("shoes")
          );
      
          // Uppdatera state
          setJackets(filteredJackets);
          setShoes(filteredShoes);
        } else {
          console.error("Ogiltigt dataformat.");
        }
      })
      
      .catch((error) => console.error("Fel vid hämtning av data:", error));
  }, []); // Tom array gör att useEffect bara körs en gång vid sidans laddning

  // Dela upp jackorna i sektioner med vodoo
  const sections = Array.from({ length: Math.ceil(jackets.length / itemsPerSection) }, (_, index) => {
    const startIndex = index * itemsPerSection;
    return jackets.slice(startIndex, startIndex + itemsPerSection);
  });
  

  // Visa bara det antal sektioner som definierats
  const sectionsToShow = sections.slice(0, totalSectionsToShow);

  return (
    <div>
      {/* Skor */}
      <h2>Skor</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {shoes.map((shoe) => (
          <div key={shoe.sku} className="product-card">
            <h3>{shoe.name}</h3>
            <img src={shoe.images[0]} alt={shoe.name} width="150" />
            <p>Pris: {shoe.price} {shoe.currency}</p>
          </div>
        ))}
      </div>

      {/* Jackor - Visa sektioner */}
      <h2>Jackor</h2>
      <div className="section-container">
        {sectionsToShow.map((section, index) => (
          <div key={index} className="section">
            <h3>Sektion {index + 1}</h3>
            <div className="product-list">
              {section.map((jacket) => (
                <div key={jacket.sku} className="product-card">
                  <h3>{jacket.name}</h3>
                  <img src={jacket.images[0]} alt={jacket.name} width="150" />
                  <p>Pris: {jacket.price} {jacket.currency}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;


  



