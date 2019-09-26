import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function Quiz() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoAddDeckView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <Text>Quiz</Text>
    </ScrollView>
  );
}

Quiz.navigationOptions = {
  title: 'Quiz',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
