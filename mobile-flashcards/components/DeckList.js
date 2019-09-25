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
      return (
        <ScrollView style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'DeckDetails',
              { entryId: 'title' }
            )}
          >
            <View style={styles.cell} >
              <Text style={styles.titleText}>DeckList</Text>
              <Text style={styles.cardsText}>3 cards</Text>
            </View>
          </TouchableOpacity>
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
  console.warn(decks)
  return {
    decks
  }
}
function mapDispatchToProps(dispatch) {
  return ({
    handleInitialData: () => { dispatch(handleInitialData()) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)

