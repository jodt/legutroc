import React from 'react';
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
  const handleHover = () => {
    return !onHover ? null : onHover(products);
  };
  return (
    <div
      key={products.id}
      className="Vegetable"
      onClick={() => onclick(products)}
      style={{
        border: products.id === isSelected ? 'solid red 2px' : 'none',
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
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
