import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { retrieveProd } from '../../api/production/retrieveProd';
import { clearProd } from '../../api/production/clearProd';
import { addProd } from '../../api/production/addProd';
import { Button } from '../../components/Button/Button';
import { PopupAddProduct } from '../../components/PopuAddProduct/PopupAddProduct';
import { TradesBar } from '../../components/TradesBar/TradesBar';
import { UserContext } from '../../contexts/userContext';
import './Dashboard.css';

export function Dashboard() {
  const user = useContext(UserContext);
  const [productions, setProductions] = useState([]);
  const [prodIdToClear, setProdIdToClear] = useState(null);
  const [vegetableToAdd, setVegetableToAdd] = useState(null);
  const [trades, setTrades] = useState([]);
  const [onHover, setOnHover] = useState(false);
  const [vegetableInfos, setVegetableInfos] = useState('');
  const [popUp, setPopup] = useState(false);

  const fetchData = async () => {
    retrieveProd(user.id).then(value =>
      value.production.map(prod =>
        setProductions(prev => [
          ...prev,
          {
            id: prod.id,
            name: prod.vegetable.name,
            image: prod.vegetable.image,
            description: prod.description,
            vegetableId: prod.vegetable.id,
          },
        ])
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (vegetableToAdd) {
      addProd(user.id, vegetableToAdd).then(() => {
        fetchData();
      });
    }
    return () => {
      setProductions([]);
    };
  }, [vegetableToAdd]);

  useEffect(() => {
    if (prodIdToClear) {
      clearProd(user.id, prodIdToClear);
    }
  }, [prodIdToClear]);

  const displayPopup = () => {
    setPopup(!popUp);
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
    setTrades(prev => prev.filter((item, index) => index !== targetIndex));
  };

  const displayVegetableInfos = target => {
    setOnHover(!onHover);
    setVegetableInfos(target.description);
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
        <PopupAddProduct
          onclick={addProduction}
          onDisplay={displayPopup}
          productions={productions}
        />
      )}
      <div className="DashboardHeader">
        <h1>Bonjour {user.firstName} et Bienvenue sur votre jardin</h1>
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
            {onHover ? <p>{vegetableInfos}</p> : ''}
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
