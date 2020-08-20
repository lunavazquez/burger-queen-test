import React from 'react';
import './card.css';

export default function Card({ image, item, handleClick }) {
  return (
    <div
      className="card shadow"
      style={{ backgroundImage: `url(${image})` }}
      onClick={handleClick}
    >
      <div className="name">{item}</div>
    </div>
  );
}
