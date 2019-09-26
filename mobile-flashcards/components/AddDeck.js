import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity, Platform, TextInput, Keyboard } from 'react-native';
import { gray, black, purple, white } from "../utils/colors";
import { handleAddCDeck } from "../actions/index";

class AddDeck extends Component {
  state = {
    title: ''
  }

  handleSubmit = () => {
    const { title } = this.state
    this.props.handleAddCDeck(title)
    this.setState(() => ({
      title: ''
    }))
  }

  handleChange = (title) => {
    this.setState({ title });
  }

  render() {
    const { title } = this.state

    const shouldDisableSubmit = title === ''

    return (
      <View style={styles.container}>
        <View style={styles.cell} >
          <Text style={styles.titleText}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Deck title'}
            onChangeText={text => this.handleChange(text)}
            onSubmitEditing={Keyboard.dismiss}
            value={title}
          />
        </View>
        <TouchableOpacity
          style={shouldDisableSubmit ?
            (Platform.OS === 'ios' ? styles.iosSubmitBtnDisabled : styles.AndroidSubmitBtnDisabled) : (Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn)}
          onPress={() => this.handleSubmit()}
          disabled={shouldDisableSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AddDeck.navigationOptions = {
  title: 'AddDeck',
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
  titleText: {
    color: black,
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    width: 300,
    marginVertical: 10
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

function mapDispatchToProps(dispatch) {
  return ({
    handleAddCDeck: (title) => { dispatch(handleAddCDeck(title)) }
  })
}

export default connect(null, mapDispatchToProps)(AddDeck)




