import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { gray, black, purple, white, green, red } from "../utils/colors";
import { handleDeleteDeck } from "../actions/index";
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'

class Quiz extends Component {
  state = {
    index: 0,
    correctAnswer: 0,
    showAnswer: false
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
    const { deck, questions } = this.props
    if (deck === null) {
      return (
        <View style={styles.container}>
          <View style={styles.cell} >
            <Text style={styles.titleText}>This Deck does not exist!</Text>
          </View>
        </View>
      )
    }

    if (questions.length < 1) {
      return (
        <View style={styles.container}>
          <View style={styles.cell} >
            <Text style={styles.titleText}>This is no question in this Deck!</Text>
          </View>
        </View>
      )
    }

    const { index, correctAnswer, showAnswer } = this.state
    const questionCount = questions.length
    if (index === questions.length) {
      return(
        <View style={styles.container}>
          <View style={styles.cell} >
            <Text style={styles.titleText}>{`Your Score is ${(correctAnswer / questionCount) * 100} %`}</Text>
          </View>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={() => this.setState({
              index: 0,
              correctAnswer: 0,
              showAnswer: false
            })}>
            <Text style={styles.submitBtnText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.AndroidCorrectBtn}
            onPress={() => this.props.goBack()}>
            <Text style={styles.submitBtnText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    const { question, answer } = questions[index].question

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{`${index + 1}/${questionCount}`}</Text>
        <View style={styles.cell} >
        {
            showAnswer ? <Text style={styles.titleText}>{answer}</Text> 
              : <Text style={styles.titleText}>{question}</Text>
        }
        </View>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={() => this.setState({ showAnswer: !showAnswer })}>
          <Text style={styles.submitBtnText}>{showAnswer? "Question " : "Answer"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.AndroidCorrectBtn}
          onPress={() => this.setState({ index: index + 1, correctAnswer: correctAnswer + 1 })}>
          <Text style={styles.submitBtnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosInCorrectBtn : styles.AndroidInCorrectBtn}
          onPress={() => this.setState({ index: index + 1 })}>
          <Text style={styles.submitBtnText}>Incorrect</Text>
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
  iosCorrectBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginVertical: 10
  },
  AndroidCorrectBtn: {
    backgroundColor: green,
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
  iosInCorrectBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginVertical: 10
  },
  AndroidInCorrectBtn: {
    backgroundColor: red,
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

Quiz.navigationOptions = {
  title: 'Quiz',
};

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params
  const deck = decks[title]
  if (deck === undefined) {
    return {deck: null}
  }
  return { 
    deck,
    questions: deck.questions
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)




