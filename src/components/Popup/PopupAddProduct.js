import React from 'react';
import { Form } from '../Form/Form';
import { Vegetable } from '../Vegetable/Vegetable';
import './PopupAddProduct.css';

export function PopupAddProduct({
  errorMessage,
  vegetables,
  vegetableDescription,
  onchange,
  addDescription,
  selectVegetable,
  isSelectedId,
  children,
}) {
  const formFields = [
    {
      type: 'submit',
      value: 'Valider',
    },
  ];

  return (
    <>
      <h1>Ajouter un produit</h1>
      {children}
      {errorMessage ? (
        <p className="errorMessage" style={{ color: 'red' }}>
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
        <Form formFields={formFields} onSubmit={addDescription} required={true}>
          <label>Description</label>
          <textarea
            className="textaera"
            rows="5"
            cols="50"
            value={vegetableDescription}
            onChange={onchange}
          ></textarea>
        </Form>
      </div>
    </>
  );
}
