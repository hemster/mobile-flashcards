import { AsyncStorage } from 'react-native'

export const UDACICARDS_STORAGE_KEY = 'UdaciCards:decks'

// debuug init
export async function initFakeData() {
    const data = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }
    console.warn(UDACICARDS_STORAGE_KEY);
    console.warn(JSON.stringify(data));
    await AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(data))
}

export function getDecks() {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
        .then((results) => {
            console.warn(results)
            const decks = JSON.parse(results)
            console.warn(decks)
            return decks
        })
}

export function getDeck(id) {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
        .then((results) => {
            const decks = JSON.parse(results)
            const deckTitle = Object.keys(decks).filter((deck) => deck.title === id)
            if (deckTitle.length > 0) {
                return deckTitle[0]
            }
            return null
        })
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

// card => {question, answer}
export function addCardToDeck({ title, card }) {
    return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: [ card ]
        }
    }))
}
