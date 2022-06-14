import React from 'react';
import TradesBar from '../../components/TradesBar/TradesBar';
import './Dashboard.css';

const production = [
  {
    id: 1,
    name: 'Tomate',
    img: require('../../assets/images/tomate.png'),
  } /*,
  {
    id: 2,
    name: 'poireau',
    img: require('../../assets/images/poireau.png'),
  },
  {
    id: 2,
    name: 'poireau',
    img: require('../../assets/images/kiwi.png'),
  },*/,
];

const trades = [
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
];

export function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="DashboardHeader">
        <h1>Bienvenue sur votre jardin</h1>
      </div>
      <div className="body">
        <div className="aside">
          <div className="Menu">
            <button className="menuButton">Mon compte</button>
            <button className="menuButton">Ajouter un produit</button>
            <button className="menuButton">Proposer un échange</button>
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
          {production.map(products => {
            return <TradesBar key={products.id} products={products} trades={trades}/>;
          })}
        </div>
      </div>
    </div>
  );
}

/*export class Dashboard extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="DashboardHeader">
          <h1>Bienvenue sur votre jardin</h1>
        </div>
        <div className="body">
          <div className="aside">
            <div className="Menu">
              <button className="menuButton">Mon compte</button>
              <button className="menuButton">Ajouter un produit</button>
              <button className="menuButton">Proposer un échange</button>
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
            <TradesBar />
          </div>
        </div>
      </div>
    );
  }
}*/
