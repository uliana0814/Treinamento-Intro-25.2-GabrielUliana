import React, { useState } from 'react';

function ProductCard({ product, onAddToCart, onRemoveFromCart }) {
  return (
    <div className="card">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.alt} height="300" />
      <h3>{product.description}</h3>
      <p>{product.price}</p>
      <div className="buttons">
        <button className="add" onClick={onAddToCart}>Adicionar ao carrinho</button>
        <button className="remove" onClick={onRemoveFromCart}>Remover do carrinho</button>
      </div>
    </div>
  );
}
