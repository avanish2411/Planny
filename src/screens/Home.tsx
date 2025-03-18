import { StyleSheet, ScrollView, View } from 'react-native';
import React from 'react';
import AddTodoList from '../components/AddTodoList';
import AddExpenseList from '../components/AddExpenseList';
import AddNotes from '../components/AddNotes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = () => {
  const insets = useSafeAreaInsets();

  const screens = [<AddTodoList />, <AddExpenseList />, <AddNotes />];

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top }]}>
      {screens.map((Component, index) => (
        <View key={index}>{Component}</View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
});

export default Home;
