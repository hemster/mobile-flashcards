import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function DeckDetails() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoAddDeckView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <Text>DeckDetails</Text>
    </ScrollView>
  );
}

DeckDetails.navigationOptions = {
  title: 'DeckDetails',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
