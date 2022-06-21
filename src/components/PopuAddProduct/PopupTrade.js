import React, { useState } from 'react';
import { Form } from '../Form/Form';
import './PopupTrade.css';

export function PopupTrade() {
  const [searchTerm, setSearchTerm] = useState({ term: '', city: '' });
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearchTerm(prev => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="popupTrade">
      <h1>Proposer un échange</h1>
      <Form label={true} formFields={formFields} onSubmit={handleSubmit} />
      <div className="tradeBox">
        <div className="results">
          <h2>Résultats de la Recherche</h2>
        </div>
        <div className="results">
          <h2>Mon produit à échanger</h2>
        </div>
      </div>
    </div>
  );
}
