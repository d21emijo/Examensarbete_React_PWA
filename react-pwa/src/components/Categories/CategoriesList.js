import React, { useState, useEffect } from "react";
import "./CategoriesList.css"

const splitIntoSections = (products, itemsPerSection, maxSections) => {
  const totalSections = Math.min(Math.ceil(products.length / itemsPerSection), maxSections);
  
  return Array.from({ length: totalSections }, (_, index) => {
    const startIndex = index * itemsPerSection;
    return products.slice(startIndex, startIndex + itemsPerSection);
  });
};

const CategoryList = () => {
  const [jackets, setJackets] = useState([]); // State för att lagra jackor
  const [shoes, setShoes] = useState([]); // State för att lagra skor
  const [pants, setPants] = useState([]); // State för att lagra Byxor
  const [puffers, setPuffers] = useState([]); // State för att lagra puffs
  
  const itemsPerSection = 3; // Antal produkter per sektion
  const maxSections = 50;      // Hur många sektioner som ska visas per kategori

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) throw new Error("Något gick fel vid hämtning av data");
  
        const data = await response.json();
        console.log("Data hämtad från nätverket:", data);
  
        // Cachea datan lokalt för offline-användning
        const cache = await caches.open("products");
        await cache.put("/products", new Response(JSON.stringify(data)));
  
        updateProducts(data);
      } catch (error) {
        console.error("Fel vid hämtning av data, försöker från cache:", error);
  
        // Försök att hämta från cache istället
        const cache = await caches.open("products");
        const cachedResponse = await cache.match("/products");
  
        if (cachedResponse) {
          const cachedData = await cachedResponse.json();
          console.log("Data hämtad från cachen:", cachedData);
          updateProducts(cachedData);
        } else {
          console.error("Ingen cache-data tillgänglig");
        }
      }
    };
  
    fetchProducts();
  }, []);
  
  const updateProducts = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const fixedData = data.map((product) => ({
        ...product,
        images:
          typeof product.images === "string"
            ? JSON.parse(product.images.replace(/'/g, '"')) //fixa jsonfilen så det går att fetcha
            : product.images,
      }));
  
      setJackets(fixedData.filter((p) => p.terms.toLowerCase().includes("jackets")));
      setShoes(fixedData.filter((p) => p.terms.toLowerCase().includes("shoes")));
      setPants(fixedData.filter((p) => p.terms.toLowerCase().includes("pants")));
      setPuffers(fixedData.filter((p) => p.terms.toLowerCase().includes("puffers")));
    } else {
      console.error("Ogiltigt dataformat.");
    }
  };
  
  

  const categories = [
    { name: "jackets", displayName: "Jackor", sections: splitIntoSections(jackets, itemsPerSection,maxSections) },
    { name: "shoes", displayName: "Skor", sections: splitIntoSections(shoes, itemsPerSection,maxSections) },
    { name: "pants", displayName: "Byxor", sections: splitIntoSections(pants, itemsPerSection,maxSections) },
    { name: "puffer", displayName: "fluffare", sections: splitIntoSections(puffers, itemsPerSection,maxSections) },  ];

  return (
    <div>
      {categories.map((category) => (
        <div key={category.name}>
          <h2>{category.displayName}</h2>
          <div className="section-container">
            {category.sections.map((section, index) => (
              <div key={index} className="section">
                <h3>Sektion {index + 1}</h3>
                <div className="product-list">
                  {section.map((product) => (
                    <div key={product.sku} className="product-card">
                      <h3>{product.name}</h3>
                      <img src={product.images[0]} alt={product.name} width="150" crossorigin="anonymous" />
                      <p>Pris: {product.price} {product.currency}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;


  



