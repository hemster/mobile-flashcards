import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DeckListScreen from '../screens/DeckListScreen';
import AddDeckScreen from '../screens/AddDeckScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const DeckListStack = createStackNavigator(
  {
    DeckList: DeckListScreen,
  },
  config
);

DeckListStack.navigationOptions = {
  tabBarLabel: 'DeckList',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

DeckListStack.path = '';

const AddDeckStack = createStackNavigator(
  {
    AddDeck: AddDeckScreen,
  },
  config
);

AddDeckStack.navigationOptions = {
  tabBarLabel: 'AddDeck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

AddDeckStack.path = '';

const tabNavigator = createBottomTabNavigator({
  DeckListStack,
  AddDeckStack,
});

tabNavigator.path = '';

export default tabNavigator;
