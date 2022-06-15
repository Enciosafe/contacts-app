import React, {useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {useRoute} from "../navigation/routing";

import {useDispatch, useSelector} from "react-redux";
import {authStateChangeUser} from "../store/auth/authOperations";

const Main = () => {
    const {stateChanged} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authStateChangeUser())
    }, [])

    const routing = useRoute(stateChanged)

    return (
        <NavigationContainer>
            {routing}
        </NavigationContainer>
    );
};

export default Main;
