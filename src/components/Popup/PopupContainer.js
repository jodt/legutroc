import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import './PopupAddProduct.css';
import { styleCloseBtn } from './constants';
import { retrieveAllVegetables } from '../../api/vegetables/getAllVegetables';
import { PopupAddProduct } from './PopupAddProduct';
import { PopupTrade } from './PopupTrade';

export function PopupContainer({
  onclick,
  onDisplay,
  productions,
  popupName,
  closePopup,
  onHover,
  vegetableInfos,
}) {
  const [vegetables, setVegetables] = useState([]);
  const [vegetableSelected, setvegetableSelected] = useState(null);
  const [vegetableDescription, setVegetabledescritpion] = useState('');
  const [isSelectedId, setIsSelectedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    retrieveAllVegetables().then(value => {
      value.vegetables.map(vegetable => {
        setVegetables(prev => [...prev, vegetable]);
      });
    });
  }, []);

  useEffect(() => {
    if (vegetableSelected && vegetableSelected.description) {
      onclick(vegetableSelected);
      closePopup();
    }
  }, [vegetableSelected]);

  const selectVegetable = product => {
    const isInProduction = productions.some(
      element => product.id === element.vegetableId
    );
    setIsSelectedId(product.id);
    if (!isInProduction) {
      setvegetableSelected(product);
      setErrorMessage('');
    } else {
      setErrorMessage('Ce légume est déjà dans votre production');
    }
  };

  const handleChange = ({ target }) => {
    setVegetabledescritpion(target.value);
  };

  const addDescription = () => {
    setvegetableSelected(prev => ({
      ...prev,
      description: vegetableDescription || 'Pas de description',
    }));
  };
  return (
    <div className="popupBox">
      <div className="popupAddProduct">
        {popupName === 'addProduct' ? (
          <PopupAddProduct
            errorMessage={errorMessage}
            vegetables={vegetables}
            vegetableDescription={vegetableDescription}
            onchange={handleChange}
            addDescription={addDescription}
            selectVegetable={selectVegetable}
            isSelectedId={isSelectedId}
          >
            <Button
              style={styleCloseBtn}
              nameButton={'X'}
              onclick={onDisplay}
            />
          </PopupAddProduct>
        ) : (
          <PopupTrade
            productions={productions}
            onHover={onHover}
            vegetableInfos={vegetableInfos}
            selectVegetable={selectVegetable}
            isSelectedId={isSelectedId}
            /*closePopup={closePopup}*/
          >
            <Button
              style={styleCloseBtn}
              nameButton={'X'}
              onclick={onDisplay}
            />
          </PopupTrade>
        )}
      </div>
    </div>
  );
}
