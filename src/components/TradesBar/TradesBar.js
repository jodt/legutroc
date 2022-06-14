import React from 'react';
import { Vegetable } from '../Vegetable/Vegetable';
import './TradesBar.css';

export default function TradesBar({ products, trades }) {
  return (
    <div className="tradesBar">
      {console.log(products)}
      <div className="production">
        <Vegetable products={products} />
      </div>
      <div className="trade">
        {trades.map(trade => {
          return <Vegetable exchange={true} key={trade.id} products={trade} />;
        })}
      </div>
    </div>
  );
}
