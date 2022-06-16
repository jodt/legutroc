import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Vegetable } from '../Vegetable/Vegetable';
import './PopupAddProduct.css';
import { styleCloseBtn } from './constants';

export function PopupAddProduct({ onclick, onDisplay }) {
  const vegetables = [
    {
      id: 2,
      name: 'poireau',
      img: require('../../assets/images/poireau.png'),
    },
    {
      id: 1,
      name: 'Tomate',
      img: require('../../assets/images/tomate.png'),
    },
  ];

  const [vegetableSelected, setvegetableSelected] = useState(null);
  const [vegetableDescription, setVegetabledescritpion] = useState(null);
  const [isSelectedId, setIsSelectedId] = useState(null);

  useEffect(() => {
    if (vegetableSelected && vegetableSelected.description) {
      onclick(vegetableSelected);
      onDisplay();
    }
  }, [vegetableSelected]);

  const selectVegetable = product => {
    setvegetableSelected(product);
    setIsSelectedId(product.id);
  };

  const handleChange = ({ target }) => {
    setVegetabledescritpion(target.value);
  };

  const addDescription = () => {
    setvegetableSelected(prev => ({
      ...prev,
      description: vegetableDescription,
    }));
  };

  return (
    <div className="popupBox">
      <div className="popupAddProduct">
        <Button style={styleCloseBtn} nameButton={'X'} onclick={onDisplay} />
        <h1>Ajouter un produit</h1>
        <div className="allProducts">
          {vegetables.map(products => {
            return (
              <Vegetable
                deletable={false}
                products={products}
                onclick={selectVegetable}
                isSelected={isSelectedId}
              />
            );
          })}
        </div>
        <div className="description">
          <label> Description</label>
          <textarea
            rows="5"
            cols="50"
            value={vegetableDescription}
            onChange={handleChange}
          ></textarea>
          <Button nameButton={'Valider'} onclick={addDescription} />
        </div>
      </div>
    </div>
  );
}
