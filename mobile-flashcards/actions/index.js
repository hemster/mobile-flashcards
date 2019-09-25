import { getDecks } from "../utils/api";
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCardToDeck(title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card,
  }
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([
      getDecks(),
    ])
      .then((decks) => {
        console.warn('receiveDecks')
        dispatch(receiveDecks(decks))
      })
  }
}