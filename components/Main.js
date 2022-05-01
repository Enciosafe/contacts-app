import React, {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {useRoute} from "../routing";
import db from "../firebase/config";
import {useSelector} from "react-redux";

const Main = () => {
    const [user, setUser] = useState(null)
    const state = useSelector(state => state)

    db.auth().onAuthStateChanged((user) => setUser(user))


    console.log(state)

    useEffect(() => {}, [])

    const routing = useRoute(user)

    return (
        <NavigationContainer>
            {routing}
        </NavigationContainer>
    );
};

export default Main;
