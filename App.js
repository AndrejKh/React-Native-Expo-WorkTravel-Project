import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@toDos";

export default function App() { 
  const [working, setWorking] = useState(true); // work일때 상태를 저장하는 useState 함수 생성
  const [text, setText] = useState(""); // 입력한 Text의 상태를 저장하는 useState 함수 생성
  const [toDos, setToDos] = useState({}); // toDos의 상태를 저장하는 useState 함수 생성
  useEffect(() => {
    loadToDos();
  }, []);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);  
  const onChangeText = (payload) => setText(payload); // payload = event
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }; 
  const loadToDos = async() => {
    const string = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(string));
  };
  const addToDo = async () => {
    if(text === "") {
      return
    }
    const newToDos = { ...toDos, [Date.now()]: {text, working} }; 
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={styles.header}>
          <TouchableOpacity onPress={work}>
            <Text style={{ ...styles.btnText, color: working ? "white" : theme.grey }}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={travel}>
            <Text style={{ ...styles.btnText, color: !working ? "white" : theme.grey }}>Travel</Text>  
          </TouchableOpacity> 
        </View>
        <View>
          <TextInput 
            style={styles.input}
            value={text} 
            placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
            onChangeText={onChangeText} 
            onSubmitEditing={addToDo}  
            returnKeyType="done"
          />
          <ScrollView>
            {Object.keys(toDos).map(key =>
              toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>
                  {toDos[key].text}
                </Text>
                <TouchableOpacity>
                  <Text>
                    X
                </Text>
                </TouchableOpacity>
              </View>
              ) : null
            )}
          </ScrollView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    marginVertical: 20,
  },
  toDo: {
    backgroundColor: theme.toDoBackground,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight:"500",
  }
});
