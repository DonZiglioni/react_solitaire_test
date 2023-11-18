import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from 'axios';
import './Game.css';

const Game = () => {
    //  **  Set the shape of the 'game board' on component mounting
    const INITIAL_STATE = [
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        ['empty', {}, {}, {}, {}, {}, {}, {}],
        ['empty', 'empty', {}, {}, {}, {}, {}, {}],
        ['empty', 'empty', 'empty', {}, {}, {}, {}, {}],
        ['empty', 'empty', 'empty', 'empty', {}, {}, {}, {}],
        ['empty', 'empty', 'empty', 'empty', 'empty', {}, {}, {}],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', {}, {}],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', {}],
    ];

    const [gameArray, setGameArray] = useState(INITIAL_STATE);
    const [deckId, setDeckId] = useState("");
    const [cardCount, setCardCount] = useState(0);
    const [card, setCard] = useState({});

    //  **  Make API Call to retrieve new, shuffled deck of cards & deck ID

    useEffect(() => {
        axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then((res) => {
                setDeckId(res.data.deck_id);
                setCardCount(res.data.remaining);
            })
    }, [])

    //  **  Function to retrieve a single card from the deck of cards API

    const dealCard = async () => {
        const res = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        setCardCount(res.data.remaining);
        setCard(res.data.cards[0]);
        return res.data.cards[0];
    }

    //  **  Function to deal all 52 cards into the Game Array.
    //  **  It also creates a new key:value pair for the Card component
    //  **  called "isFlipped", and flips over the first 16 cards when dealt

    const dealGame = async () => {
        let flipCount = 1;
        //  **  Loop through Game Array  **
        for (let i = 0; i < gameArray.length; i++) {
            for (let j = 0; j < gameArray[i].length; j++) {
                //  **  Check to see if the card can be placed in the array  **
                //  **  If so, deal the card into it's proper place  **
                if (gameArray[i][j] !== 'empty') {
                    let getCard = await dealCard();
                    gameArray[i][j] = getCard;
                    //  **  Adds "isFlipped" key and sets to true or false  **
                    if (flipCount <= 16) {
                        gameArray[i][j]['isFlipped'] = true;
                        flipCount++;
                    } else if (flipCount > 16) {
                        gameArray[i][j]['isFlipped'] = false;
                    }
                }
            }
        }
    }

    return (
        <div className="game">
            <button onClick={dealGame}>Click Me</button>
            <div className="game-grid">
                {gameArray.map((r) => {
                    let idx = 0;
                    return r.map((e) => <Card card={e} key={idx += 1} />)
                })}
            </div>
        </div>
    )
}

export default Game;