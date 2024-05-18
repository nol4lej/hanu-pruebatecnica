import { useCallback, useEffect, useState } from 'react';
import shuffle from '../utils/shuffle';
import initialSet from '../data/initialSet';
import getRandomValue from '../utils/randomValue';

const useGameLogic = () => {

    const [randomValue, setRandomValue] = useState(getRandomValue(initialSet))
    const [leftDeck, setLeftDeck] = useState(shuffle(initialSet));
    const [centerDeck, setCenterDeck] = useState([]);
    const [rightDeck, setRightDeck] = useState([]);
    const [isWinner, setIsWinner] = useState(false)

    const checkWinCondition = useCallback(() => {
        const leftLast = leftDeck[leftDeck.length - 1];
        const centerLast = centerDeck[centerDeck.length - 1];
        const rightLast = rightDeck[rightDeck.length - 1];

        if (leftLast && centerLast && rightLast && 
            leftLast.value === randomValue && 
            centerLast.value === randomValue && 
            rightLast.value === randomValue) {
                setIsWinner(true)
        }
    }, [leftDeck, centerDeck, rightDeck, randomValue]);

    const moveCard = useCallback((fromDeck, setFromDeck, toDeck, setToDeck) => {
        if (isWinner) return;
        if (fromDeck.length > 0) {
            const cardToMove = fromDeck[fromDeck.length - 1];
            setFromDeck(fromDeck.slice(0, -1));
            setToDeck([...toDeck, cardToMove]);
        }
    }, [isWinner]);

    const handleDeckClick = useCallback((deck) => {
        return () => {
            if (deck === leftDeck) {
                moveCard(leftDeck, setLeftDeck, centerDeck, setCenterDeck);
            } else if (deck === centerDeck) {
                moveCard(centerDeck, setCenterDeck, rightDeck, setRightDeck);
            } else {
                moveCard(rightDeck, setRightDeck, leftDeck, setLeftDeck);
            }
        };
    }, [leftDeck, centerDeck, rightDeck, moveCard]);

    const resetGame = useCallback(() => {
        setLeftDeck(shuffle(initialSet));
        setCenterDeck([]);
        setRightDeck([]);
        setRandomValue(getRandomValue(initialSet));
        setIsWinner(false)
    }, []);

    useEffect(() => {
        checkWinCondition();
    }, [leftDeck, centerDeck, rightDeck, checkWinCondition]);

    return {
        isWinner,
        randomValue,
        leftDeck,
        centerDeck,
        rightDeck,
        handleDeckClick,
        resetGame
    };
};

export default useGameLogic;