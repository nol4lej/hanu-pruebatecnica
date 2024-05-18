import { useCallback, useEffect, useState } from 'react';
import shuffle from '../utils/shuffle';
import initialSet from '../data/initialSet';
import getRandomValue from '../utils/randomValue';

const useGameLogic = () => {

    const [randomValue, setRandomValue] = useState(getRandomValue(initialSet))
    const [decks, setDecks] = useState({
        leftDeck: shuffle(initialSet),
        centerDeck: [],
        rightDeck: []
    });
    const [isWinner, setIsWinner] = useState(false)

    const checkWinCondition = useCallback(() => {
        const { leftDeck, centerDeck, rightDeck } = decks;
        const leftLast = leftDeck[leftDeck.length - 1];
        const centerLast = centerDeck[centerDeck.length - 1];
        const rightLast = rightDeck[rightDeck.length - 1];

        if (leftLast && centerLast && rightLast &&
            leftLast.value === randomValue &&
            centerLast.value === randomValue &&
            rightLast.value === randomValue) {
            setIsWinner(true);
        }
    }, [decks, randomValue]);

    const moveCard = useCallback((fromDeckName, toDeckName) => {
        if (isWinner) return;

        setDecks(prevDecks => {
            const fromDeck = prevDecks[fromDeckName];
            if (fromDeck.length === 0) return prevDecks;

            const cardToMove = fromDeck[fromDeck.length - 1];
            const newFromDeck = fromDeck.slice(0, -1);
            const newToDeck = [...prevDecks[toDeckName], cardToMove];

            return {
                ...prevDecks,
                [fromDeckName]: newFromDeck,
                [toDeckName]: newToDeck
            };
        });
    }, [isWinner]);

    const handleDeckClick = useCallback((deckName) => {
        return () => {
            if (deckName === 'leftDeck') {
                moveCard('leftDeck', 'centerDeck');
            } else if (deckName === 'centerDeck') {
                moveCard('centerDeck', 'rightDeck');
            } else {
                moveCard('rightDeck', 'leftDeck');
            }
        };
    }, [moveCard]);

    const resetGame = useCallback(() => {
        setDecks({
            leftDeck: shuffle(initialSet),
            centerDeck: [],
            rightDeck: []
        });
        setRandomValue(getRandomValue(initialSet));
        setIsWinner(false);
    }, []);

    useEffect(() => {
        checkWinCondition();
    }, [decks, checkWinCondition]);

    return {
        isWinner,
        randomValue,
        decks,
        handleDeckClick,
        resetGame
    };
};

export default useGameLogic;