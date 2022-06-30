import React from 'react';
import { Vegetable } from '../Vegetable/Vegetable';
import './TradesBar.css';

export function TradesBar({
  products,
  trades,
  prodIndex,
  removeProduction,
  removeTrade,
  acceptedTrade,
  onHover,
}) {
  return (
    <div className="tradesBar">
      <div className="production">
        <Vegetable
          deletable={true}
          products={products}
          prodIndex={prodIndex}
          removeProduction={removeProduction}
          onHover={onHover}
        />
      </div>
      <div className="trade">
        {trades.map((trade, index) => {
          if (products.id === trade.prodId)
            return (
              <Vegetable
                exchange={true}
                deletable={true}
                key={trade.id}
                products={trade}
                Tradeindex={index}
                removeTrade={removeTrade}
                onHover={onHover}
                acceptedTrade={acceptedTrade}
              />
            );
        })}
      </div>
    </div>
  );
}
