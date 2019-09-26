import { ADD_DECK, ADD_CARD_TO_DECK, RECEIVE_DECKS, DELETE_DECK } from '../actions'

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
          questions: [...questions, action.card]
        }
      }
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case DELETE_DECK:
      var newState = state
      newState[action.title] = undefined
      delete state[action.title]
      return {
        ...newState,
      }
    default :
      return state
  }
}

export default entries