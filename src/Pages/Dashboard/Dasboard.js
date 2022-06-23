import React, { useContext, useEffect, useState } from 'react';
import { addProd } from '../../api/production/addProd';
import { Button } from '../../components/Button/Button';
import { clearProd } from '../../api/production/clearProd';
import { deleteTrade } from '../../api/trades/deleteTrade';
import { getTrades } from '../../api/trades/getTrades';
import { PopupContainer } from '../../components/Popup/PopupContainer';
import { retrieveProd } from '../../api/production/retrieveProd';
import { TradesBar } from '../../components/TradesBar/TradesBar';
import { UserContext } from '../../contexts/userContext';
import './Dashboard.css';

export function Dashboard() {
  const user = useContext(UserContext);
  const [productions, setProductions] = useState([]);
  const [prodIdToClear, setProdIdToClear] = useState(null);
  const [vegetableToAdd, setVegetableToAdd] = useState(null);
  const [trades, setTrades] = useState([]);
  const [tradeIdToClear, setTradeIdToClear] = useState(null);
  //const [onHover, setOnHover] = useState(false);
  const [vegetableInfos, setVegetableInfos] = useState({
    userfirstName: '',
    userCIty: '',
    description: '',
  });
  const [popUp, setPopup] = useState({ display: false, popupName: '' });

  const fetchDataTrades = async userIdProd => {
    getTrades(userIdProd).then(value => {
      value.trades.map(trade =>
        setTrades(prev => [
          ...prev,
          {
            id: trade.id,
            name: trade.traderTwoProductionInfo.vegetable.name,
            image: trade.traderTwoProductionInfo.vegetable.image,
            description: trade.traderTwoProductionInfo.description,
            vegetableId: trade.traderTwoProductionInfo.vegetable.id,
            userfirstName: trade.traderTwoProductionInfo.user.firstName,
            userlastName: trade.traderTwoProductionInfo.user.lastName,
            userCIty: trade.traderTwoProductionInfo.user.city,
            prodId: trade.traderOneProductionInfo.id,
          },
        ])
      );
    });
  };

  const fetchDataProd = async () => {
    retrieveProd(user.id).then(value =>
      value.production.map(prod => {
        setProductions(prev => [
          ...prev,
          {
            id: prod.id,
            name: prod.vegetable.name,
            image: prod.vegetable.image,
            description: prod.description,
            vegetableId: prod.vegetable.id,
          },
        ]);
        fetchDataTrades(prod.id);
      })
    );
  };

  useEffect(() => {
    fetchDataProd();
  }, []);

  useEffect(() => {
    if (vegetableToAdd) {
      addProd(user.id, vegetableToAdd).then(() => {
        fetchDataProd();
      });
    }
    return () => {
      setProductions([]);
      setTrades([]);
    };
  }, [vegetableToAdd]);

  useEffect(() => {
    if (prodIdToClear) {
      clearProd(user.id, prodIdToClear);
    }
  }, [prodIdToClear]);

  useEffect(() => {
    if (tradeIdToClear) {
      deleteTrade(tradeIdToClear);
    }
  }, [tradeIdToClear]);

  /*useEffect(() => {
    const trade = true;
    if (trade) {
      setTrades([]);
    }
  });*/

  const displayPopup = e => {
    setPopup(prev => ({
      display: !prev.display,
      popupName: e.target.name,
    }));
  };

  const closePopup = () => {
    setPopup(prev => ({
      display: !prev.display,
      popupName: '',
    }));
  };

  const addProduction = target => {
    /*const isInProduction = productions.some(
      element => target.id === element.vegetableId
    );
    if (!isInProduction) {*/
    setVegetableToAdd({
      userId: user.id,
      vegetableId: target.id,
      description: target.description,
    });
  }; /*else {
      setErrorMessage('Ce légume est déja dans la production');
    }
  };*/

  const removeProduction = targetIndex => {
    setProdIdToClear(productions[targetIndex].id);
    setProductions(prev => prev.filter((item, index) => index !== targetIndex));
  };

  const removeTrade = targetIndex => {
    setTradeIdToClear(trades[targetIndex].id);
    setTrades(prev => prev.filter((item, index) => index !== targetIndex));
  };

  const displayVegetableInfos = target => {
    if (target) {
      const { userfirstName, userlastName, userCIty, description } = target;
      setVegetableInfos(prev => ({
        ...prev,
        userfirstName: userfirstName ? 'Prénom : ' + userfirstName : '',
        userlastName: userlastName ? 'Nom : ' + userlastName : '',
        userCIty: userCIty ? 'Ville: ' + userCIty : '',
        description: 'Produit: ' + description,
      }));
    } else {
      setVegetableInfos({});
    }
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
      {popUp.display && (
        <PopupContainer
          onclick={addProduction}
          onDisplay={displayPopup}
          productions={productions}
          popupName={popUp.popupName}
          closePopup={closePopup}
          onHover={displayVegetableInfos}
          vegetableInfos={vegetableInfos}
        />
      )}
      <div className="DashboardHeader">
        <h1>Bonjour {user.firstName} et Bienvenue sur votre jardin</h1>
      </div>
      <div className="body">
        <div className="aside">
          <div className="Menu">
            <Button nameButton={'Mon compte'} />
            <Button
              name={'addProduct'}
              nameButton={'Ajouter un produit'}
              onclick={displayPopup}
            />
            <Button
              name={'tradeProduct'}
              nameButton={'Proposer un échange'}
              onclick={displayPopup}
            />
          </div>
          <div className="informations">
            <h2>Informations</h2>
            <div className="infoContent">
              {vegetableInfos && !popUp.display ? (
                <>
                  {vegetableInfos.userfirstName && (
                    <p>{vegetableInfos.userfirstName}</p>
                  )}
                  {vegetableInfos.userlastName && (
                    <p>{vegetableInfos.userlastName}</p>
                  )}
                  {vegetableInfos.userCIty && <p>{vegetableInfos.userCIty}</p>}
                  <p>{vegetableInfos.description}</p>
                </>
              ) : (
                ''
              )}
            </div>
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
                onHover={displayVegetableInfos}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
