import React, { useState } from 'react';
import { Vegetable } from '../Vegetable/Vegetable';
import './PopupAddProduct.css';

export function PopupAddProduct({ onclick, onDisplay }) {
  const vegetables = [
    {
      id: 2,
      name: 'poireau',
      img: require('../../assets/images/poireau.png'),
      description: 'Salut',
    },
    {
      id: 1,
      name: 'Tomate',
      img: require('../../assets/images/tomate.png'),
    },
  ];

  const [vegetableSelected, setvegetableSelected] = useState({
    id: '',
    name: '',
    img: '',
  });

  const handleClick = product => {
    setvegetableSelected(
      prev => ({
        ...prev,
        id: product.id,
        name: product.name,
        img: product.img,
      }),
      onclick(vegetableSelected)
    );
  };

  return (
    <div className="popupBox">
      <div className="popupAddProduct">
        <h1>Ajouter un produit</h1>
        <div className="allProducts">
          {vegetables.map(products => {
            return (
              <Vegetable
                deletable={false}
                products={products}
                onclick={handleClick}
              />
            );
          })}
        </div>
        <div className="description">
          <label> Description</label>
          <textarea rows="5" cols="50"></textarea>
        </div>
        <button type="button" onClick={() => onDisplay()}>
          Valider
        </button>
      </div>
    </div>
  );
}
