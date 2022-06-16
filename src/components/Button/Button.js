import React from 'react';

export function Button({ nameButton, onclick, style }) {
  const handeClick = e => {
    onclick();
  };
  return (
    <button className="menuButton" onClick={handeClick} style={style}>
      {nameButton}
    </button>
  );
}
