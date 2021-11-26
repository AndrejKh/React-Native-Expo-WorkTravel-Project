import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { theme } from './colors';

export default function App() { 
  const [working, setWorking] = useState(true); // work일때 상태를 저장하는 useState 함수 생성
  const travel = () => setWorking(false);
  const work = () => setWorking(true);  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.btnText}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.btnText}>Travel</Text>  
          </TouchableOpacity>
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
    color: 'white',
  },
});
