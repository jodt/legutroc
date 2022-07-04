import React, { useState, useContext, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import { search } from '../../api/searchVegetables/search';
import { UserContext } from '../../contexts/userContext';
import { Vegetable } from '../Vegetable/Vegetable';
import { postTrade } from '../../api/trades/postTrade';
import { checkIfTradeExist } from '../../api/trades/checkIfTradeExist';
import './PopupTrade.css';
import '../../animations/animation.css';
import { inAnimation, outAnimation } from '../../animations/constants';

export function PopupTrade({
  productions,
  onHover,
  vegetableInfos,
  /*closePopup,*/
  children,
}) {
  const user = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState({ term: '', city: '' });
  const [searchResult, setSearchResult] = useState([]);
  const [vegetable1ForTrade, setvegetable1ForTrade] = useState({
    productId: '',
  });
  const [vegetable2ForTrade, setvegetable2ForTrade] = useState({
    productId: '',
  });
  const [tradeAlreadyExist, setTradeAlreadyExist] = useState(false);
  const [registeredTrade, setRegisteredTrade] = useState(false);

  const fetchprod = (city, term) => {
    search(city, term).then(value => {
      value.production.map(prod => {
        if (prod.user.id !== user.id) {
          setSearchResult(prev => [
            ...prev,
            {
              description: prod.description,
              id: prod.id,
              image: prod.vegetable.image,
              name: prod.vegetable.name,
              vegetableId: prod.vegetable.id,
              userfirstName: prod.user.firstName,
              userlastName: prod.user.lastName,
              userCIty: prod.user.city,
            },
          ]);
        }
      });
    });
  };

  const clearSelects = () => {
    setTradeAlreadyExist(false);
    setRegisteredTrade(false);
    setSearchTerm(prev => ({ ...prev, term: '', city: '' }));
    setvegetable1ForTrade(prev => ({ ...prev, productId: '' }));
    setvegetable2ForTrade(prev => ({ ...prev, productId: '' }));
  };

  useEffect(() => {
    if (vegetable1ForTrade.productId && vegetable2ForTrade.productId) {
      checkIfTradeExist(
        vegetable1ForTrade.productId,
        vegetable2ForTrade.productId
      ).then(response => {
        if (response === 200) {
          setTradeAlreadyExist(true);
        }
      });
    }
  }, [vegetable1ForTrade, vegetable2ForTrade]);

  useEffect(() => {
    if (tradeAlreadyExist || registeredTrade) {
      const timer = setTimeout(() => {
        clearSelects();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [tradeAlreadyExist, registeredTrade]);

  useEffect(() => {
    fetchprod(searchTerm.city, searchTerm.term);
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearchTerm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectVegetable1 = product => {
    setTradeAlreadyExist(false);
    setvegetable1ForTrade(prev => ({
      ...prev,
      productId: product.id,
    }));
  };

  const selectVegetable2 = product => {
    setTradeAlreadyExist(false);
    setvegetable2ForTrade(prev => ({
      ...prev,
      productId: product.id,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchResult([]);
    clearSelects();
    fetchprod(searchTerm.city, searchTerm.term);
  };

  const handleClick = () => {
    postTrade(vegetable1ForTrade.productId, vegetable2ForTrade.productId).then(
      response => {
        if (response.status === 201) {
          setRegisteredTrade(true);
        }
      }
    );
  };

  const formFields = [
    {
      id: 'search',
      name: 'term',
      label: 'Légume:',
      type: 'text',
      value: searchTerm.term,
      onChange: handleChange,
    },
    {
      id: 'city',
      name: 'city',
      label: 'Ville :',
      type: 'text',
      value: searchTerm.city,
      onChange: handleChange,
    },
    {
      type: 'submit',
      value: 'Rechercher',
    },
  ];

  return (
    <div className="popupTrade">
      {tradeAlreadyExist ? (
        <p className="tradeAllReadyExist">Vous avez déjà proposé cet échange</p>
      ) : (
        ''
      )}
      {registeredTrade ? (
        <p
          className="tradeAllReadyExist"
          style={{ backgroundColor: '#a6fcca', color: '#434343' }}
        >
          Echange enregistré avec succés
        </p>
      ) : (
        ''
      )}
      <h1>Proposer un échange</h1>
      {children}
      <Form
        label={true}
        formFields={formFields}
        onSubmit={handleSubmit}
        required={false}
      />
      <div className="tradeBox">
        <div className="results">
          <h2>Résultats de la Recherche</h2>
          {searchResult.map((products, index) => {
            return (
              <Vegetable
                key={index + products.name}
                deletable={false}
                products={products}
                onHover={onHover}
                onclick={selectVegetable1}
                isSelected={vegetable1ForTrade.productId}
              >
                {vegetableInfos.userfirstName ? (
                  <div
                    key={index}
                    className="productInfos"
                    style={
                      vegetableInfos.description ? inAnimation : outAnimation
                    }
                  >
                    <p>{vegetableInfos.userfirstName}</p>
                    <p>{vegetableInfos.userlastName}</p>
                    <p>{vegetableInfos.userCIty}</p>
                    <p>{vegetableInfos.description}</p>
                  </div>
                ) : (
                  ''
                )}
              </Vegetable>
            );
          })}
        </div>
        <div className="results">
          <h2>Mon produit à échanger</h2>
          {productions.map((products, index) => {
            return (
              <Vegetable
                key={index + products.name}
                deletable={false}
                products={products}
                onclick={selectVegetable2}
                isSelected={vegetable2ForTrade.productId}
              />
            );
          })}
        </div>
        <Button
          name={'valider'}
          nameButton={'Valider'}
          disabled={
            !(vegetable1ForTrade.productId && vegetable2ForTrade.productId) ||
            tradeAlreadyExist
          }
          onclick={handleClick}
        />
      </div>
    </div>
  );
}
