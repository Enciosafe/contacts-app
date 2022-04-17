import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Folders from "./screens/Folders";

import IconButton from "./Ui/IconButton";
import NewFolder from "./screens/NewFolder";
import StartScreen from "./screens/StartScreen";
import ContactDetails from "./screens/ContactDetails";
import {store} from './store/index'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import {useEffect, useState} from "react";
import ContactsList from "./screens/ContactsList";
import ContactTestScreen from "./screens/ContactTestScreen";

const Stack = createNativeStackNavigator()

let customFonts = {
    'Qanelas-Regular': require('./assets/fonts/Qanelas-Regular.ttf'),
    'Qanelas-Bold': require('./assets/fonts/Qanelas-Bold.ttf')
}


export default function App() {
    const [isFontLoaded, setIsFontLoaded] = useState(false);

    const loadFonts = async () => {
        await Font.loadAsync(customFonts);
        setIsFontLoaded(true)
    }

    useEffect(() => {
        loadFonts()
    }, [loadFonts]);


    if(!isFontLoaded) {
        return <AppLoading/>
    }

    return (
        <>
      <Provider store={store}>
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
                          title: '',
                          headerTitleStyle: {
                              fontFamily: 'Qanelas-Regular'
                          },
                          headerTransparent: true,
                          headerRight: ({tintColor}) => (
                              <IconButton
                                  icon="add"
                                  size={15}
                                  color={tintColor}
                                  onPress={() => navigation.navigate('NewFolder')}
                              />
                          ),
                          headerBackTitleVisible: false,
                          headerTintColor: 'black'
                      })}
                  />
                  <Stack.Screen name='ContactsList' component={ContactsList}/>
                  <Stack.Screen name='ContactDetails' component={ContactDetails}/>
                  <Stack.Screen
                      name='NewFolder'
                      component={NewFolder}
                      options={{
                          presentation: "modal",
                      }}/>
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
    </>
  );
}


