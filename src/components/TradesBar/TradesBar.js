import React from 'react';
import { Vegetable } from '../Vegetable/Vegetable';
import './TradesBar.css';

export default function TradesBar({
  products,
  trades,
  prodIndex,
  removeProduction,
  removeTrade,
}) {
  return (
    <div className="tradesBar">
      <div className="production">
        <Vegetable
          deletable={true}
          products={products}
          prodIndex={prodIndex}
          removeProduction={removeProduction}
        />
      </div>
      <div className="trade">
        {trades.map((trade, index) => {
          return (
            <Vegetable
              exchange={true}
              deletable={true}
              key={trade.id}
              products={trade}
              indexTrade={index}
              removeTrade={removeTrade}
            />
          );
        })}
      </div>
    </div>
  );
}
