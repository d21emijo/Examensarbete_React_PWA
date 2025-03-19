import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import CategoryList from "./components/Categories/CategoriesList";





function App() {
  return (
    
    <div className="App">
      <Header > {Header}</Header>
      <CategoryList /> {/*  */}

    </div>
  );
}

export default App;