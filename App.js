import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {store} from './store/index'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import {useEffect, useState} from "react";
import 'react-native-gesture-handler'
import {useRoute} from "./routing";


let customFonts = {
    'Qanelas-Regular': require('./assets/fonts/Qanelas-Regular.ttf'),
    'Qanelas-Bold': require('./assets/fonts/Qanelas-Bold.ttf')
}

export default function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const routing = useRoute(false)

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


