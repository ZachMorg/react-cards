import React, {useState, useEffect} from 'react';
import Card from './Card';
import axios from 'axios';

const API_URL = 'https://deckofcardsapi.com/api/deck';

const Deck = function(){
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);
    const [shuffling, setShuffling] = useState(false);

    useEffect(function getDeck(){
        async function getAPI(){
            const res = await axios.get(`${API_URL}/new/shuffle`);
            setDeck(res.data);
        }
        getAPI();
    }, []);

    const draw = async function(){
        try{
            const res = await axios.get(`${API_URL}/${deck.deck_id}/draw/`);

            if(res.data.error){
                throw new Error(res.data.error);
            }

            const card = res.data.cards[0];

            setCards(c => [...c, {id: card.code, name: card.value+' of '+card.suit, image: card.image}]);
        }
        catch(err){
            alert(err);
        }
    }

    const shuffle = async function(){
        setShuffling(true);
        try{
            await axios.get(`${API_URL}/${deck.deck_id}/shuffle/`);
            setCards([]);
        }
        catch(err){
            alert(err);
        }
        finally{
            setShuffling(false);
        }
    }

    const renderShuffleButton = function(){
        if(!deck){
            return null;
        }
        return(
            <button
                onClick={shuffle}
                disabled={shuffling}>
                Shuffle deck
            </button>
        );
    }

    const renderDrawButton = function(){
        if(!deck){
            return null;
        }
        return(
            <button
                onClick={draw}
                disabled={shuffling}>
                Draw card
            </button>
        )
    }

    return(
        <div>
            {renderShuffleButton()}
            {renderDrawButton()}
            <div>{
                cards.map(c => (
                    <Card key={c.id} name={c.name} image={c.image} />
                ))}
            </div>
        </div>
    )
}

export default Deck;