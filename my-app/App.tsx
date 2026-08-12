import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, SafeAreaView, ScrollView, Animated , ViewStyle, StyleProp } from 'react-native';
import{ useState, useRef, useEffect, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator , NativeStackScreenProps} from '@react-navigation/native-stack';
import { RadioButton } from 'react-native-paper';


type RootStackParamList = {
    Home: undefined,
    View:{
      NameSend: string;
      SurnameSend: string;
    };
  };

const Stack = createNativeStackNavigator<RootStackParamList>();

type MainScreenProps = NativeStackScreenProps<
RootStackParamList,
'Home'
>;

type ViewDetailsProps = NativeStackScreenProps<
RootStackParamList,
'View'
>;

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Home" component={MainScreen}/>
        <Stack.Screen name= "View" component={ViewDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({ navigation }: MainScreenProps){

  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');

  console.log("App works!");

  return(
    <View>
      <SafeAreaView>
        <ScrollView>

      <Image style={styles.MainImageFlower}
      source={require('./Images/flower.jpg')}/>
      
      <Text style={styles.welcomeTxt}>Welcome to my app!</Text>

      <FadeInView>
      <View 
        style={styles.InputFlex}>
        <Text style={styles.labelTxt}>Enter your Name</Text>
        <TextInput style={styles.InputBoxTxtline} 
        placeholder="Jane"
        autoCapitalize="words"
        autoComplete="given-name"
        onChangeText={newText => setName(newText)} />

        <Text style={styles.labelTxt}>Enter your Surname</Text>
        <TextInput style={styles.InputBoxTxtline}
        placeholder="Doe"
        autoCapitalize="words"
        autoComplete="family-name"
        onChangeText={newText => setSurname(newText)} />
      </View>
      </FadeInView>

      <Button title="Add User"
        onPress={()=> {
          navigation.navigate('View' ,{
            NameSend:Name,
            SurnameSend:Surname
          });
        }} />

      <StatusBar style="auto" />
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

 function ViewDetails({navigation ,route}: ViewDetailsProps){

    const NameGet = route.params.NameSend;
    const SurnameGet = route.params.SurnameSend;
    const [selectedValue, setSelecetdValue] = useState('0');

  return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 25 }}>  Welcome Name: {NameGet} Surname: {SurnameGet} ! </Text>
      <Text>Please choose a language:</Text>
    </View>

    <View style={styles.radioContainer}>
      <View style={styles.radioGroup}>

        <View style={styles.radioButton}>
          <RadioButton.Android
          value="1"
          status={selectedValue == "1" ? 'checked' : 'unchecked'}

          onPress = {() => setSelecetdValue('1')}
          color= "#ff33cc"
         />
         <Text style={styles.radioLabel}> React Native </Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton.Android
          value="1"
          status={selectedValue == "1" ? 'checked' : 'unchecked'}

          onPress = {() => setSelecetdValue('2')}
          color= "#ff33cc"
         />
         <Text style={styles.radioLabel}>Kotlin </Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton.Android
          value="1"
          status={selectedValue == "1" ? 'checked' : 'unchecked'}

          onPress = {() => setSelecetdValue('3')}
          color= "#ff33cc"
         />
         <Text style={styles.radioLabel}> CSS and HTML </Text>
        </View>

        
      </View>
    </View>

  </View>
);
}

interface FadeInViewProps{
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const FadeInView = ({children,style}: FadeInViewProps) => {
  const FadeAnim = useRef( new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(
      FadeAnim,
      {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false
      }
    ).start();
  }, [FadeAnim])

  return(
    <Animated.View style = {{ 
      ...(style as object),
      opacity: FadeAnim
    }}>
      {children}
    </Animated.View>
  )
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
    width:250,
    height:250,
    marginTop:20,
    alignSelf: 'center',
  },

  InputFlex:{
    //flexDirection:'row',
    marginTop: 30,
    justifyContent: 'space-evenly',
  },

  radioContainer: {
    flex:0,
    backgroundColor:'#d966ff',
     justifyContent: 'center',
     alignItems:'center',
    },

  radioButton:{
    flexDirection: 'row',
    alignItems: 'center'
  },

  radioLabel:{
    marginLeft: 5,
    fontSize: 15,
    color: '#8c8c8c'
  },

  radioGroup:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
    elevation: 5,
    shadowColor:' #66004d',

    shadowOffset: {
      width:0,
      height:1,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});
