import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Folders from "./screens/Folders";
import Contacts from "./screens/Contacts";
import IconButton from "./Ui/IconButton";
import NewFolder from "./screens/NewFolder";
import StartScreen from "./screens/StartScreen";
import ContactDetails from "./screens/ContactDetails";

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name='Start'
              component={StartScreen}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name='Folders'
              component={Folders}
              options={({ navigation }) => ({
                  title: 'Folders',
                  headerRight: ({tintColor}) => (
                      <IconButton
                          icon="add"
                          size={35}
                          color={tintColor}
                          onPress={() => navigation.navigate('NewFolder')}
                      />
                  ),})}
          />
          <Stack.Screen name='Contacts' component={Contacts}/>
            <Stack.Screen name='ContactDetails' component={ContactDetails}/>
          <Stack.Screen
              name='NewFolder'
              component={NewFolder}
              options={{
                  presentation: "modal",
              }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


