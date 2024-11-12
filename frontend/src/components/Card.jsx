// client/src/Card.js
import React from 'react';
import '../App.css';

function Card({ card, onClick }) {
  return (
    <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={() => onClick(card)}>
      {card.isFlipped || card.isMatched ? (
        <div className="card-content">{card.content}</div>
      ) : (
        <div className="card-back"></div>
      )}
    </div>
  );
}

export default Card;
