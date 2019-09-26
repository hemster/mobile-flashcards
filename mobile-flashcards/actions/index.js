import { getDecks, saveCardToDeck, saveDeckTitle } from "../utils/api";
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const DELETE_DECK = 'DELETE_DECK'

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCardToDeck(title, question, answer) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card: { question, answer },
  }
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title
  }
}

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([
      getDecks(),
    ])
      .then(([decks]) => {
        dispatch(receiveDecks(decks))
      })
  }
}

export function handleDeleteDeck(title) {
  return (dispatch) => {
    return Promise.all([
      deleteDeck(title),
    ])
      .then(() => {
        dispatch(deleteDeck(title))
      })
  }
}

export function handleAddCardToDeck(title, question, answer ) {
  return (dispatch) => {
    return Promise.all([
      saveCardToDeck(title, question, answer),
    ])
      .then(() => {
        dispatch(addCardToDeck(title, question, answer))
      })
  }
}

export function handleAddCDeck(title) {
  return (dispatch) => {
    return Promise.all([
      saveDeckTitle(title),
    ])
      .then(() => {
        dispatch(addDeck(title))
      })
  }
}
