import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Text>Welcome to my app</Text>

      <Text>Enter your Name</Text>
      <TextInput placeholder="Jane"/>
      <Text>Enter your Surname</Text>
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
});
