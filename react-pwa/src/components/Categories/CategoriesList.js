import React, { useState, useEffect } from "react";


const CategoryList = () => {
  const [jackets, setJackets] = useState([]); // State för att lagra jackor
  // const maxProducts = 40; // Max antal jackor att visa
  // const itemsPerSection = 3; // Antal produkter per sektion
  useEffect(() => {
    // 1. Hämta alla produkter från vår JSON-server
    fetch("http://localhost:5000/products") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av data");
        }
        return response.json(); // Konvertera svaret till JSON
      })
      .then((data) => {
        // 2. Filtrera ut produkter där "terms" innehåller "jackets"
        const filteredShoes = data.filter((product) => 
          product.terms.toLowerCase().includes("jackets") // Jämför med små bokstäver
        );

        // 3. Hämta de tre första jackorn
        setJackets(filteredShoes.slice(0, 3));
      })
      .catch((error) => console.error("Fel vid hämtning av data:", error));
  }, []); // Tom array gör att useEffect bara körs en gång vid sidans laddning

  return (
    <div>
      <h2>Skor</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {jackets.map((jacket) => (
          <div key={jacket.sku} style={{ border: "1px solid black", padding: "10px" }}>
            <h3>{jacket.name}</h3>
            <img src={jacket.images[0]} alt={jacket.name} width="150" />

            <p>Pris: {jacket.price} {jacket.currency}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;


  



