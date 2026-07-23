import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View>

      <Text style={styles.welcomeTxt}>Welcome to my app!</Text>
    

      <Text style={styles.labelTxt}>Enter your Name</Text>
      <TextInput placeholder="Jane"/>

      <View style={styles.line}></View>

      <Text style={styles.labelTxt}>Enter your Surname</Text>
      <TextInput placeholder="Doe"/>


      <Button title="Add User"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeTxt : {
   paddingTop: 50,
   color:'blue',
   fontWeight: 'bold',
   fontSize: 30,
   textAlign: 'center'
  },

  labelTxt: {
    fontWeight: "bold",
    fontSize: 18,
  },

  line: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 15,
  },
});
