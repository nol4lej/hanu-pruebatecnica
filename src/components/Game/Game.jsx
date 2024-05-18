import './Game.css';
import Deck from '../Deck/Deck';
import ValueToOrder from '../ValueToOrder/ValueToOrder';
import RestartButton from '../RestartButton/RestartButton';
import useGameLogic from '../../hooks/useGameLogic';

const Game = () => {

    const {
        isWinner,
        randomValue,
        decks,
        handleDeckClick,
        resetGame
    } = useGameLogic();

    return (
        <div className="game__container">
            <div className="menu__container">
                <ValueToOrder value={randomValue} />
                <RestartButton setters={resetGame} />
            </div>
            <div className="decks__container">
                <div className='decks__content'>
                    <Deck cards={decks.leftDeck} onClick={handleDeckClick('leftDeck')} />
                    <Deck cards={decks.centerDeck} onClick={handleDeckClick('centerDeck')} />
                    <Deck cards={decks.rightDeck} onClick={handleDeckClick('rightDeck')} />
                </div>
            </div>
            {
                isWinner &&
                <div className='winner__message__container'>
                    <p className='winner__message'>EXCELENTE! LOS HAZ LOGRADO!</p>
                </div>
            }
        </div>
    );
};

export default Game;
