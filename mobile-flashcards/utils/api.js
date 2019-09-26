import { AsyncStorage } from 'react-native'

export const UDACICARDS_STORAGE_KEY = 'UdaciCards:decks'

export function getDecks() {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
        .then((results) => {
            const decks = JSON.parse(results)
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

export function saveCardToDeck(title, question, answer) {
    return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: [{ question, answer } ]
        }
    }))
}

export function deleteDeck(title) {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[title] = undefined
            delete data[title]
            AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(data))
        })
}