import React from 'react';

export function Button({ nameButton, onclick, style, disabled }) {
  const handeClick = e => {
    onclick();
  };
  console.log(disabled);
  return (
    <button
      className="menuButton"
      disabled={disabled}
      onClick={handeClick}
      style={style}
    >
      {nameButton}
    </button>
  );
}
