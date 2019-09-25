import { ADD_DECK, ADD_CARD_TO_DECK, RECEIVE_DECKS } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case ADD_DECK :
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        },
      }
    case ADD_CARD_TO_DECK :
      const questions = state[action.title].questions
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [...questions, card]
        }
      }
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    default :
      return state
  }
}

export default entries