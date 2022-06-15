import React from 'react';

export function Button({ nameButton, onclick }) {
  const handeClick = e => {
    onclick();
  };
  return (
    <button className="menuButton" onClick={handeClick}>
      {nameButton}
    </button>
  );
}
