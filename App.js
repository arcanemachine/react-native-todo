/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState } from 'react';
import type {Node} from 'react';
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App: () => Node = () => {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const textInputRef = useRef();

  // list
  const Item = ({ id, description }) => (
    <View>
      <Text style={[styles.sectionDescription, styles.textCenter]}>
        {id + 1}. {description}
      </Text>
      <Button
        onPress={() => todoItemDelete(id)}
        title="X"
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <Item id={item.id} description={item.description} />
  );

  const todoItemCreate = () => {
    if (text.length) {
      setTodos(todos => [...todos, {
        id: todos.length,
        description: text,
      }]);
    }
    setText('');
  };

  const todoItemDelete = (id) => {
    let state = [...todos].filter(todo => todo.id !== id); // delete the todo
    todoUpdateIds(state);
    setTodos(state);
  };

  function todoUpdateIds(state) {
    return state.forEach((todo, i) => state[i].id = i);
  }

  return (
    <SafeAreaView>
      {/*<StatusBar />*/}
        <View style={[ styles.sectionContainer ]}>
          <Text style={[ styles.sectionTitle, styles.textCenter ]}>
            Todo List
          </Text>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            value={text}
            onChangeText={text => setText(text)}
            onSubmitEditing={() => { todoItemCreate(); }}
          />
          <Button
            title="Create"
            style={styles.button}
            accessiblityLabel="Create new task"
            onPress={todoItemCreate}
          />
        </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 8,
    borderWidth: 1,
  },
  button: {
    margin: 8,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  textCenter: {
    textAlign: 'center'
  },
  textBold: {
    fontWeight: '700',
  },
});

export default App;
