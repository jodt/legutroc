import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { PopupAddProduct } from '../../components/PopuAddProduct/PopupAddProduct';
import TradesBar from '../../components/TradesBar/TradesBar';
import './Dashboard.css';

export function Dashboard() {
  const [productions, setProductions] = useState([
    {
      id: 1,
      name: 'Tomate',
      img: require('../../assets/images/tomate.png'),
    },
    {
      id: 2,
      name: 'poireau',
      img: require('../../assets/images/poireau.png'),
    },
    /*{
      id: 2,
      name: 'poireau',
      img: require('../../assets/images/kiwi.png'),
    },*/
  ]);
  const [trades, setTrades] = useState([
    {
      id: 2,
      name: 'poireau',
      img: require('../../assets/images/poireau.png'),
    },
    {
      id: 2,
      name: 'poireau',
      img: require('../../assets/images/kiwi.png'),
    },
  ]);

  const [popUp, setPopup] = useState(false);

  const displayPopup = () => {
    setPopup(!popUp);
  };

  const addProduction = target => {
    setProductions(prev => [...prev, target]);
  };
  const removeProduction = targetIndex => {
    setProductions(prev => prev.filter((item, index) => index !== targetIndex));
  };

  const removeTrade = targetIndex => {
    setTrades(prev => prev.filter((item, index) => index !== targetIndex));
  };

  /*const addProduction = ({ vegetable }) => {
    setProductions(prev => {
      if prev.includes(vegetable.id) {
        return prev.filter
      }
      [...prev, vegetable]
    })
  };*/

  return (
    <div className="Dashboard">
      {popUp && (
        <PopupAddProduct onclick={addProduction} onDisplay={displayPopup} />
      )}
      <div className="DashboardHeader">
        <h1>Bienvenue sur votre jardin</h1>
      </div>
      <div className="body">
        <div className="aside">
          <div className="Menu">
            <Button nameButton={'Mon compte'} />
            <Button nameButton={'Ajouter un produit'} onclick={displayPopup} />
            <Button nameButton={'Proposer un échange'} />
          </div>
          <div className="informations">
            <h2>Informations</h2>
          </div>
        </div>
        <div className="DashboardlPanel">
          <div className="title">
            <h3 className="maProduction">Ma Production</h3>
            <h3 className="mesPropositions">Mes propositions</h3>
          </div>
          {productions.map((products, index) => {
            return (
              <TradesBar
                key={products.id}
                products={products}
                trades={trades}
                prodIndex={index}
                removeProduction={removeProduction}
                removeTrade={removeTrade}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
