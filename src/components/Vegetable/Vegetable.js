import React from 'react';
import './Vegetable.css';

export function Vegetable({
  products,
  exchange,
  deletable,
  prodIndex,
  indexTrade,
  removeProduction,
  removeTrade,
  onclick,
  isSelected,
}) {
  const handleClick = () => {
    !exchange ? removeProduction(prodIndex) : removeTrade(indexTrade);
  };

  return (
    <div
      key={products.id}
      className="Vegetable"
      onClick={() => onclick(products)}
      style={{
        border: products.id === isSelected ? 'solid red 2px' : 'none',
      }}
    >
      <p>{products.name}</p>
      <img
        src={products.img}
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
