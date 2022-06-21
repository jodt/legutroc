import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Vegetable } from '../Vegetable/Vegetable';
import './PopupAddProduct.css';
import { styleCloseBtn } from './constants';
import { retrieveAllVegetables } from '../../api/vegetables/getAllVegetables';

export function PopupAddProduct({
  errorMessage,
  vegetables,
  vegetableDescription,
  onchange,
  addDescription,
  selectVegetable,
  isSelectedId,
}) {
  return (
    <>
      <h1>Ajouter un produit</h1>
      {errorMessage ? (
        <p className="errorMessage" style={{ color: 'red' }}>
          {' '}
          {errorMessage}
        </p>
      ) : (
        ''
      )}
      <div className="allProducts">
        {vegetables.map((products, index) => {
          return (
            <Vegetable
              key={index}
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
          onChange={onchange}
        ></textarea>
        <Button
          nameButton={'Valider'}
          onclick={addDescription}
          disabled={errorMessage}
        />
      </div>
    </>
  );
}
