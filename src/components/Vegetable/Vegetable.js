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
  acceptedTrade,
  onclick,
  isSelected,
  onHover,
  children,
}) {
  const [displayChildren, setDisplayChildren] = useState(false);
  const handleClickDelete = () => {
    !exchange ? removeProduction(prodIndex) : removeTrade(Tradeindex);
  };
  const handleClickAccept = () => {
    acceptedTrade(Tradeindex);
  };
  const handleisHover = () => {
    setDisplayChildren(true);
    onHover(products);
  };

  const handleIsNotHover = () => {
    setDisplayChildren(false);
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
      {displayChildren ? children : ''}
      <p>{products.name}</p>
      <img
        src={products.image}
        alt={products.name}
        height="50px"
        width="50px"
      ></img>
      {deletable && (
        <button className="delete" type="button" onClick={handleClickDelete}>
          X
        </button>
      )}
      {exchange && (
        <button className="accept" type="button" onClick={handleClickAccept}>
          √
        </button>
      )}
    </div>
  );
}
