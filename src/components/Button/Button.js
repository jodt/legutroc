import React from 'react';

export function Button({ nameButton, onclick, style, disabled, name }) {
  const handeClick = e => {
    onclick(e);
  };
  return (
    <button
      className="menuButton"
      disabled={disabled}
      onClick={handeClick}
      name={name}
      style={style}
    >
      {nameButton}
    </button>
  );
}
