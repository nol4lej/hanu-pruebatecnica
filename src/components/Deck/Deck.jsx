import './Deck.css'
import Card from '../Card/Card';

const Deck = ({ cards, onClick }) => {
    const isDeckEmpty = cards.length === 0;
    const displayedCards = cards.slice(-3);

    return (
        <div className="deck" onClick={onClick}>
            {!isDeckEmpty && displayedCards.map((card, index) => (
                <Card key={index} card={card} className="card" />
            ))}
        </div>
    );
};


export default Deck;
