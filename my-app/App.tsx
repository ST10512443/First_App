import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import{ useState } from 'react';

export default function App() {

const [Name,setName] = useState('');
const [Surname,setSurname] = useState('');

console.log("App works!");

  return (
    <View>

      <Image style={styles.MainImageFlower}
      source={require('./Images/flower.jpg')}/>
      
      <Text style={styles.welcomeTxt}>Welcome to my app!</Text>

      <View style={styles.InputFlex}>
        <Text style={styles.labelTxt}>Enter your Name</Text>
        <TextInput style={styles.InputBoxTxtline} 
        placeholder="Jane"
        onChangeText={newText => setName(newText)} />

        <Text style={styles.labelTxt}>Enter your Surname</Text>
        <TextInput style={styles.InputBoxTxtline}
        placeholder="Doe"
        onChangeText={newText => setSurname(newText)} />
      </View>

      <Button title="Add User"
        onPress={()=>(
          console.log("Name: " + Name + "    Surname:" + Surname)

        )}
      />



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
  },

  InputBoxTxtline: {
   borderBottomWidth: 1,
  },

  MainImageFlower:{
    paddingTop: 50,
    justifyContent:'center',
    alignItems: 'center',
    width:250,
    height:250,
    marginTop:20,
  },

  InputFlex:{
    //flexDirection:'row',
    marginTop: 30,
    justifyContent: 'space-evenly',
  },
});
