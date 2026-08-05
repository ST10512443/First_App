import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, SafeAreaView, ScrollView, Animated , ViewStyle, StyleProp } from 'react-native';
import{ useState, useRef, useEffect, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator , NativeStackScreenProps} from '@react-navigation/native-stack';


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

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Text> Name: {NameGet} Surname: {SurnameGet} </Text>
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
});
