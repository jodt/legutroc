import React from 'react';
import './Button.css';

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
