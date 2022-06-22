import React, { useState } from 'react';
import './Vegetable.css';

export function Vegetable({
  products,
  exchange,
  deletable,
  prodIndex,
  Tradeindex,
  removeProduction,
  removeTrade,
  onclick,
  isSelected,
  onHover,
}) {
  const handleClick = () => {
    !exchange ? removeProduction(prodIndex) : removeTrade(Tradeindex);
  };
  const handleisHover = () => {
    onHover(products);
  };

  const handleIsNotHover = () => {
    onHover(null);
  };
  return (
    <div
      key={products.id}
      className="Vegetable"
      onClick={() => (onclick ? onclick(products) : '')}
      style={{
        border: products.id === isSelected ? 'solid red 2px' : 'none',
      }}
      onMouseEnter={onHover ? handleisHover : null}
      onMouseLeave={onHover ? handleIsNotHover : null}
    >
      <p>{products.name}</p>
      <img
        src={products.image}
        alt={products.name}
        height="50px"
        width="50px"
      ></img>
      {deletable && (
        <button className="delete" type="button" onClick={handleClick}>
          X
        </button>
      )}
      {exchange && (
        <button className="accept" type="button">
          √
        </button>
      )}
    </div>
  );
}
