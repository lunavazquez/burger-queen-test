import React from 'react';

import { ReactComponent as CancelIcon } from '../Icons/cancel.svg';
import './resume.css';

function formatPrice(int) {
  return parseFloat(int).toFixed(2);
}

export default function Resume({ dishes, handleRemove }) {
  console.log(dishes);

  let total = 0;

  for (let dish of dishes) {
    console.log('hola', dish);
    const { sizes, complements, sizeId, complementId } = dish;

    const { price } = sizes.find(({ id }) => sizeId === id);
    total += price;

    if (complementId) {
      const complement = complements.find(({ id }) => complementId === id);
      total += complement.price;
    }
    console.log(total);
  }

  if (!dishes.length) return <div className="resume white" />;

  return (
    <div className="resume shadow black">
      <h3 className="title yellow">Total</h3>
      <div className="items">
        {dishes.map((dish, index) => {
          const {
            id,
            item,
            sizeId,
            complementId,
            sizes,
            complements = [],
            accompanimentId,
            accompaniment,
          } = dish;
          const { price, size } = sizes.find(({ id }) => sizeId === id);

          let complement;
          let accomp;

          if (complementId) {
            complement = complements.find(({ id }) => complementId === id);
          }

          if (accompanimentId) {
            accomp = accompaniment.find(({ id }) => accompanimentId === id);
          }

          console.log({ accomp });

          return (
            <div key={index} className="item">
              <div className="dishname">
                <p className="bold">
                  {`${item} ${
                    (accompanimentId && ` con ${accomp.item || accomp.name}`) ||
                    ''
                  }`}
                </p>
                <CancelIcon
                  className="icon-delete"
                  onClick={() => handleRemove(id)}
                />
              </div>
              <div className="element">
                <p>
                  Tamaño: <b className="blue">{size}</b>
                </p>
                <p className="yellow">${formatPrice(price)}</p>
              </div>
              {!!complementId && (
                <div key={complementId} className="element">
                  <p>
                    Más: <b className="blue">{complement.item}</b>
                  </p>
                  <p className="yellow">${formatPrice(complement.price)}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="total">
        <button className="button">{`Ordenar: $${formatPrice(total)}`}</button>
      </div>
    </div>
  );
}
