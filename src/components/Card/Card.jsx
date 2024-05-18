import './Card.css'

const figureSymbols = {
    spade: "♠",
    heart: "♥",
    club: "♣",
    diamond: "♦"
};

const Card = ({ card, className }) => {
    const { figure, value } = card
    const color = (figure === 'heart' || figure === 'diamond') ? 'red' : 'black';

    return (
        <div className={`card ${className}`} style={{ color }}>
            <div className='card__content'>
                <div className="card__top__container">
                    <div className='card__box'>
                        <div>{value}</div>
                        <div>{figureSymbols[figure]}</div>
                    </div>
                </div>
                <div className="card__center__container">{figureSymbols[figure]}</div>
                <div className="card__bottom__container">
                    <div className='card__box inverted__box'>
                        <div>{value}</div>
                        <div>{figureSymbols[figure]}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card