import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { gray, black } from "../utils/colors";
import { handleInitialData } from "../actions";

class DeckList extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }
  
  render() {
    const { decks } = this.props

    if (decks.length < 1) {
      return <Text style={styles.titleText}>No Deck</Text>
    }

    return (
      <ScrollView style={styles.container}>
      {
          decks.map(({ title, questions }) => {
            return (
              <TouchableOpacity
              onPress={() => this.props.navigation.navigate(
                'DeckDetails',
                { title: { title } }
              )}
            >
              <View style={styles.cell} >
                  <Text style={styles.titleText}>{title}</Text>
                  <Text style={styles.cardsText}>{questions.length} cards</Text>
              </View>
            </TouchableOpacity>
            )
          })
      }
      </ScrollView>
    );
  }
}

DeckList.navigationOptions = {
  title: 'DeckList',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    height: 200,
  },
  titleText: {
    color: black,
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20
  },
  cardsText: {
    color: gray,
    fontSize: 20,
    paddingBottom: 20
  }
});

function mapStateToProps(decks) {
  return {
    decks: Object.values(decks)
  }
}
function mapDispatchToProps(dispatch) {
  return ({
    handleInitialData: () => { dispatch(handleInitialData()) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)

