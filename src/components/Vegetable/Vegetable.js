import React from 'react';
import './Vegetable.css';

export function Vegetable({ products, exchange }) {
  return (
    <div className="Vegetable">
      {console.log(products)}
      <p>{products.name}</p>
      <img
        src={products.img}
        alt={products.name}
        height="50px"
        width="50px"
      ></img>
      <button className="delete" type="button">
        X
      </button>
      {exchange && (
        <button className="accept" type="button">
          √
        </button>
      )}
    </div>
  );
}
