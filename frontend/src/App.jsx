// client/src/App.js
import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardContents = Array.from({ length: 18 }, (_, i) => i + 1);
    const allCards = [...cardContents, ...cardContents]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(allCards);
    setMatchedPairs(0);
    setFlippedCards([]);
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || card.isFlipped || card.isMatched) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;
      if (firstCard.content === card.content) {
        setMatchedPairs(matchedPairs + 1);
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.content === card.content ? { ...c, isMatched: true } : c
          )
        );
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
        }, 1000);
      }
      setFlippedCards([]);
    }
  };

  return (
    <div className="App">
      <h1>Card Guessing Game</h1>
      <button onClick={initializeGame}>Reset Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
      {matchedPairs === 18 && <div className="win-message">Congratulations! You've won!</div>}
    </div>
  );
}

export default App;
