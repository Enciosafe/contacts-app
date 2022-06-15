import { StatusBar } from 'expo-status-bar';
import {store} from './store/index'
import {Provider} from 'react-redux'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import {useEffect, useState} from "react";
import 'react-native-gesture-handler'
import Main from "./components/Main";
import {LogBox} from "react-native";




let customFonts = {
    'Qanelas-Regular': require('./assets/fonts/Qanelas-Regular.ttf'),
    'Qanelas-Bold': require('./assets/fonts/Qanelas-Bold.ttf')
}

export default function App() {
    LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);
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
                <StatusBar style="light" />
                <Main/>
            </Provider>
        </>
    )
}


