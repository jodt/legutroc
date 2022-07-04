import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landingPage">
      <h1>Légu'troc</h1>
      <h2>Planter, cultiver, récolter, échanger....</h2>
      <h3>Légu'troc qu'est ce que c'est ?</h3>
      <section className="intro">
        <p>
          Légu'troc est une application web, qui permet l'échange de fruits et
          légumes entre particuliers. En effet, beaucoup d'entre nous, et plus
          encore depuis la pandémie du COVID, s'adonnent au jardinage. Quel
          plaisir de cultiver ses propres fruits et légumes, et quel bonheur de
          pouvoir s'en nourrir. Cependant le constat est que bien souvent, nous
          avons tendance à récolter bien plus que nos besoins, mais également,
          mère nature étant parfois capricieuse, il arrive que nous ne
          parvenions pas à récolter tout ce que nous avons planté. De là, est
          née l'idée, de créer une application web, permettant l'échange entre
          particuliers des produits issus de sa récolte. Vous avez trop de
          tomates, faites une petite recherche sur légu'troc, par nom de
          produits et/ou par ville, et proposez vos tomates à l'échange contre
          ce qui vous intéresse.
        </p>
      </section>
      <section className="cardsection">
        <div className="card">
          <img
            src="https://zupimages.net/up/22/26/omr2.png"
            height="500px"
            width="700px"
          ></img>
          <p>
            L'application se veut intuitive et ludique. Votre tableau de bord
            est la page principale de l'application. En un coup d'oeil, vous
            pouvez y voir vos produits et les propositions d'échange que vous
            avez reçues; d'accepter, de refuser ces propositions ou de supprimer
            vos produits. Le système de vignettes est simple et lisible, un
            survol de celles-ci affichera les informations relatives au produit.
            Grace aux boutons, vous accédez aux fonctionnalités principales qui
            sont l'ajout d'un produit issu de votre récolte, ou la possibilité
            de proposer un échange.
          </p>
        </div>
      </section>
      <section className="cardsection">
        <div className="card">
          <p>
            Pour ajouter un produit et le rendre disponible à l'échange, rien de
            plus simple. Depuis votre tableau de bord appuyez sur le bouton
            "Ajouter un produit". Une fenêtre s'ouvre. Il ne vous reste plus
            qu'à sélectionner le produit, d'ajouter une petite description
            (comme par exemple la variété du légume, les quantités
            disponibles...) et de valider. Le produit apparaitra directement sur
            votre tableau de bord.
          </p>
          <img src="https://zupimages.net/up/22/26/kfsl.png"></img>
        </div>
      </section>
      <section className="cardsection">
        <div className="card">
          <img src="https://zupimages.net/up/22/26/trp1.png"></img>
          <p>
            Vous recherchez un produit et vous souhaitez proposer un échange ?
            Cliquez sur le bouton "Proposer un échange". Tous les produits
            disponibles s'affichent. Une barre de recherche vous permet de
            filtrer par nom du produit, par ville ou les deux à la fois. Votre
            choix effectué, selectionnez le produit de votre récolte que vous
            souhaitez échanger. Votre proposition apparaitra dans le tableau de
            bord de la personne concernée. Vous serez informé par mail, si votre
            proposition a été acceptée.
          </p>
        </div>
      </section>
      <Link to="/home" className="tryLink">
        Essayez moi!!!
      </Link>
    </div>
  );
}
