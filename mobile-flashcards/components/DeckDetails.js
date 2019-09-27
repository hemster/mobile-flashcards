import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { gray, black, purple, white } from "../utils/colors";
import { handleDeleteDeck } from "../actions/index";
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'

class DeckDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }

  handleAddCard = (title) => {
    this.props.navigation.navigate(
      'AddCard',
      { title }
    )
  }
  
  handleStartQuiz = (title) => {
    this.props.navigation.navigate(
      'Quiz',
      { title }
    )
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    const { deck, handleDeleteDeck } = this.props
    if (deck === null) {
      return (<Text style={styles.titleText}>This Deck does not exist!</Text>)
    }

    const { title, questions } = deck

    return (
      <View style={styles.container}>
        <View style={styles.cell} >
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.cardsText}>{questions.length} {questions.length > 1 ? "Cards" : "Card"}</Text>
        </View>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={() => this.handleAddCard(title)}>
          <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={() => this.handleStartQuiz(title)}>
          <Text style={styles.submitBtnText}>Start quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={handleDeleteDeck}>
          <Text style={styles.submitBtnText}>Delete deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  titleText: {
    color: black,
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardsText: {
    color: gray,
    fontSize: 20,
    paddingBottom: 20,
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginVertical: 10
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params
  const deck = decks[title]
  return { deck: deck === undefined? null : deck }
}


function mapDispatchToProps(dispatch, { navigation }) {
  const { title } = navigation.state.params
  return ({
    handleDeleteDeck: () => { dispatch(handleDeleteDeck(title)) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)




