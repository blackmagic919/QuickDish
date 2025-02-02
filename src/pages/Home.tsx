import React from 'react';

export function Home() {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh', 
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9', 
      }}
    >
      <h1 
        style={{
          fontSize: '3rem',
          color: '#fe6e00', 
          marginBottom: '20px',
        }}
      >
        Quick Dish
      </h1>
      <p 
        style={{
          fontSize: '1.2rem',
          color: '#333', 
          maxWidth: '600px', 
          lineHeight: '1.6', 
        }}
      >
        Welcome to Quick Dish! Browse assorted food-related items with prices. 
        Click on an item to retrieve all the ingredients. 
        Click on a meal to automatically add all ingredients to your cart and get prices from the grocery store.
      </p>
    </div>
  );
}