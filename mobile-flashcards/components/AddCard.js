import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity, Platform, TextInput, Keyboard } from 'react-native';
import { gray, black, purple, white } from "../utils/colors";
import { handleAddCardToDeck } from "../actions/index";

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleSubmit = () => {
    const { question, answer} = this.state
    this.props.handleAddCardToDeck({ question, answer })
    this.setState(() => ({
      question: '',
      answer: ''
    }))
  }

  handleQuestionChange = (question) => {
    this.setState({ question });
  }

  handleAnswerChange = (answer) => {
    this.setState({ answer });
  }

  render() {
    const { title } = this.props
    const { question, answer } = this.state

    const shouldDisableSubmit = question === '' || answer === ''

    return (
      <View style={styles.container}>
        <View style={styles.cell} >
          <TextInput
            style={styles.textInput}
            placeholder={'Question'}
            onChangeText={text => this.handleQuestionChange(text)}
            onSubmitEditing={Keyboard.dismiss}
            value={question}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Answer'}
            onChangeText={text => this.handleAnswerChange(text)}
            onSubmitEditing={Keyboard.dismiss}
            value={answer}
          />
        </View>
        <TouchableOpacity
          style={shouldDisableSubmit?
          (Platform.OS === 'ios' ? styles.iosSubmitBtnDisabled : styles.AndroidSubmitBtnDisabled) : (Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn)}
          onPress={this.handleSubmit}
        disabled={shouldDisableSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AddCard.navigationOptions = {
  title: 'AddCard',
};

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
  textInput: {
    height: 40, 
    borderColor: gray, 
    borderWidth: 1,
    width: 300,
    marginVertical:10
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
  iosSubmitBtnDisabled: {
    backgroundColor: gray,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginVertical: 10
  },
  AndroidSubmitBtnDisabled: {
    backgroundColor: gray,
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
  return { title }
}


function mapDispatchToProps(dispatch, { navigation }) {
  const { title } = navigation.state.params
  return ({
    handleAddCardToDeck: ({ question, answer }) => { dispatch(handleAddCardToDeck(title, { question, answer })) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)




