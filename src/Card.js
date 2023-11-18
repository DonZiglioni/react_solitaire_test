import React from 'react';
import './Card.css';

const imgBack = 'https://www.deckofcardsapi.com/static/img/back.png';

const Card = ({ card }) => {
    // **  Check to see if there is a card value to display  **
    const checkEmpty = () => {
        if (!card.image) {
            return false;
        }
        //  **  Sets the card image  **
        if (card.isFlipped === true) {
            return <img src={imgBack} alt='cardBack' />
        } else {
            return <img src={card.image} alt='cardImg' />
        }
    }

    //  **  Getting card values for selected card and 
    //  **  the destination card

    const getCardValue = (src) => {
        const suit = src.charAt(src.length - 5);
        const value = src.charAt(src.length - 6);
        return {
            suit: suit,
            value: value,
        }
    }

    return (
        <div className='card'
            draggable={true}
            onDragStart={e => console.log(getCardValue(e.target.src))}
            onDragEnd={e => console.log('Check Suit/Value')}
            // onDragEnter={e => console.log('onDragEnter')}
            onDragOver={e => { e.preventDefault() }}
            onDrop={e => console.log(getCardValue(e.target.src))}>
            {checkEmpty()}
        </div>
    )
}

export default Card;