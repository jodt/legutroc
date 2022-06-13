import React from 'react';
import './Dashboard.css';

export class Dashboard extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="DashboardHeader">
          <h1>Bienvenue sur votre jardin</h1>
        </div>
        <div className="body">
          <div className="Menu">
            <button className="menuButton">Mon compte</button>
            <button className="menuButton">Ajouter un produit</button>
            <button className="menuButton">Proposer un échange</button>
          </div>
          <div className="DashboardlPanel">
            <div className="title">
              <h3 className="maProduction">Ma Production</h3>
              <h3 className="mesPropositions">Mes propositions</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
