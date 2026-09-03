import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, SafeAreaView, ScrollView, Animated , ViewStyle, StyleProp, ImageSourcePropType } from 'react-native';
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
    ListSkills: undefined;
  };

const Stack = createNativeStackNavigator<RootStackParamList>();

function isEmpty(value: any) {
  return (
    // null or undefined
    (value == null) ||

    // has length and it's zero
    (value.hasOwnProperty('length') && value.length === 0) ||

    // is an Object and has no keys
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}

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
        <Stack.Screen name= "ListSkills" component={ListSkills}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({ navigation }: MainScreenProps){

  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [Error, setError] = useState(false);

  console.log("App works!");

  return(
    <View>
      <SafeAreaView>
        <ScrollView>

      <Image style={styles.MainImageFlower}
      source={require('./Images/flower.jpg')}/>
      
      <Text style={styles.welcomeTxt}>Welcome to my app!</Text>

      <FadeInView>

      <Text style={Error ? styles.red : styles.blank}>
      {Error ? "Please add all the fields" : ""}
      </Text>

      <View style={styles.InputFlex}>
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

     <Button
  title="Add User"
  onPress={() => {

    if ((isEmpty(Name) == false) && (isEmpty(Surname) == false))
    {
      navigation.navigate('View', {
        NameSend: Name,
        SurnameSend: Surname
      });

      console.log(
        "Name: " + Name +
        " Surname: " + Surname
      );

      setError(false);
    }
    else
    {
      setError(true);
    }

  }}
/>

      <StatusBar style="auto" />
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

 function ViewDetails({navigation ,route}: ViewDetailsProps){

    const NameGet = route.params.NameSend;
    const SurnameGet = route.params.SurnameSend;
    const [selectedValue, setSelectedValue] = useState('0');
    //const [ImageBlock, setImage] = useState<ImageSourcePropType | undefined>(undefined);
    const [iSelected, setIntValue] = useState(0);

  const [blockArray] = useState<ImageSourcePropType[]>([
  undefined,
  require('./Images/ReactNative.png'),
  require('./Images/kotlin.webp'),
  require('./Images/HtmlAndCss.png')
  ]);

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
        onPress={() => setSelectedValue('1')}
        color="#007BFF"
      />
      <Text style={styles.radioLabel}>React Native</Text>
     </View>

    <View style={styles.radioButton}>
      <RadioButton.Android
        value="2"
        status={selectedValue == "2" ? 'checked' : 'unchecked'}
        onPress={() => setSelectedValue('2')}
        color="#007BFF"
      />
    <Text style={styles.radioLabel}>Kotlin</Text>
    </View>

    <View style={styles.radioButton}>
      <RadioButton.Android
        value="3"
        status={selectedValue == "3" ? 'checked' : 'unchecked'}
        onPress={() => setSelectedValue('3')}
        color="#007BFF"
      />
    <Text style={styles.radioLabel}>HTML and CSS</Text>
    </View>
        
      </View>
    </View>

    <View style={{ flex: 1 }}>

  <Text
    style={{
      fontWeight: 'bold',
      flex: 0,
      paddingTop: 40,
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center'
    }}
  >
    View what your favourite programming language says about you :
  </Text>

  <Button
  title="Process"
  onPress={() => {
    setIntValue(Number(selectedValue));
  }}
/>

{/* 
switch (selectedValue){

case "1":
  setImage(require('./Images/ReactNative.png'));
  break;

case "2":
  setImage(require('./Images/kotlin.webp'));
  break;

case "3":
  setImage(require('./Images/HtmlAndCss.png'));
  break;

default:
  setImage(undefined);
}
*/}
    

  <View style={styles.container}>
   <Image
    source={blockArray[iSelected]}
    style={styles.ViewImage}
/>
</View>

<Button
  title="Go to Skills"
  onPress={() => navigation.navigate('ListSkills')}
/>

</View>

</View>
);
}

function ListSkills({navigation}: any){

  const [Skills, setSkills] = useState<string[]>([]);
  const [txtSkill, setSkill] = useState('');

  const displaySkills = () => {

    let arrOutput = [];

    for(let i = 0; i < Skills.length; i++)
    {
      arrOutput.push(
        <Text key={i} style={styles.skillText}>
          {Skills[i]}
        </Text>
      );
    }

    return arrOutput;
  }


  return(
    <View style={styles.appContainer}>

      <SafeAreaView>

      <ScrollView>

      <View style={styles.BannerImage}>
        <Image
        style={styles.ImageBanner}
        source={require('./Images/Skills.webp')}
        />
      </View>


      <Text style={styles.welcomeTxt}>
        List your skills!
      </Text>


      <View style={styles.inputContainer}>

      <TextInput
      style={styles.textInput}
      placeholder="Your skills"
      onChangeText={newText => setSkill(newText)}
      value={txtSkill}
      />


   <Button
  title="Add Skill"
  onPress={() => {

    if (txtSkill !== "")
    {
      setSkills([...Skills, txtSkill]);
      setSkill("");
    }

  }}
/>

      </View>


      <View style={styles.skillContainer}>

        {displaySkills()}

      </View>


      </ScrollView>

      </SafeAreaView>

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

  red: {
  color: 'red',
  fontWeight: 'bold',
  fontSize: 26,
  textAlign: 'center',
},

blank: {
  fontSize: 0,
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
    shadowColor:'#66004d',

    shadowOffset: {
      width:0,
      height:1,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3,
  },

  container: {
  alignItems: 'center',
  justifyContent: 'center',
},

ViewImage: {
  width: 350,
  height: 350,
  alignContent: 'center',
},

appContainer:{
  flex:1,
  padding:50,
  paddingHorizontal:16,
},


BannerImage:{
  height:350,
  alignContent:'center',
},


ImageBanner:{
  width:'100%',
  height:200,
},


inputContainer:{
  flex:1,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  marginBottom:24,
  borderBottomWidth:1,
  borderBottomColor:'#cccccc',
},


textInput:{
  borderWidth:1,
  borderColor:'#cccccc',
  width:'70%',
  margin:8,
  padding:8,
},


skillContainer:{
  flex:5,
},


skillText:{
  fontSize:15,
  marginVertical:5,
  borderBottomWidth:0.5,
  borderBottomColor:'#000000',
},

});
