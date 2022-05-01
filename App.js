import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {store} from './store/index'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import {useEffect, useState} from "react";
import 'react-native-gesture-handler'
import {useRoute} from "./routing";
import db from './firebase/config'



let customFonts = {
    'Qanelas-Regular': require('./assets/fonts/Qanelas-Regular.ttf'),
    'Qanelas-Bold': require('./assets/fonts/Qanelas-Bold.ttf')
}

export default function App() {
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [user, setUser] = useState(null)
    // const [isAuth, setIsAuth] = useState(false)

    db.auth().onAuthStateChanged((user) => setUser(user) )
    const routing = useRoute(user)


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
                    {routing}
                </NavigationContainer>
            </Provider>
        </>
    )
}


