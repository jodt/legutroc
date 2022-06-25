import React, { useContext, useEffect, useState } from 'react';
import './MyTrades.css';
import { UserContext } from '../../contexts/userContext';
import { tradedProd } from '../../api/production/tradedProd';
import { getTrades } from '../../api/trades/getTrades';
import { Link } from 'react-router-dom';

export function Mytrades() {
  const user = useContext(UserContext);
  const [trades, setTrades] = useState([]);

  const fetchAcceptedTrades = () => {
    tradedProd(user.id).then(response => {
      response.production.map(prod => {
        getTrades(prod.id).then(response => {
          response.trades.map(trade => {
            if (trade.status === 'Accepted') {
              setTrades(prev => [
                ...prev,
                <tr>
                  <td>{trade.traderOneProductionInfo.vegetable.name}</td>
                  <td>{trade.traderTwoProductionInfo.vegetable.name}</td>
                  <td>{trade.traderTwoProductionInfo.description}</td>
                  <td>{trade.traderTwoProductionInfo.user.lastName}</td>
                  <td>{trade.traderTwoProductionInfo.user.firstName}</td>
                  <td>{trade.traderTwoProductionInfo.user.city}</td>
                </tr>,
              ]);
            }
          });
        });
      });
    });
  };

  useEffect(() => {
    fetchAcceptedTrades();
  }, []);
  return (
    <div className="mytrades">
      <h1>Mes échanges</h1>
      <table>
        <thead>
          <tr>
            <th>Mon produit</th>
            <th>Mon échange</th>
            <th>Description</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Ville</th>
          </tr>
        </thead>
        <tbody>{trades}</tbody>
      </table>
      <Link to="/dashboard" className="dashboardLink">
        Retourner sur mon dashboard
      </Link>
    </div>
  );
}
