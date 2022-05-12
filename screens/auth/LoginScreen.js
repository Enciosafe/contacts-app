import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard, Pressable, Text
} from "react-native";
import OutlinedButton from "../../Ui/OutlinedButton";
import {useDispatch} from "react-redux";
import {authSignInUser} from "../../store/auth/authOperations";



const initialState = {
    email: '',
    password: ''
}

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState(initialState);

    const onSubmitHandle = () => {
        dispatch(authSignInUser(state))
        setState(initialState)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={2}
            >
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder='EMAIL'
                        placeholderTextColor='gray'
                        value={state.email}
                        onChangeText={(value) => setState((prevState) => ({...prevState, email: value }))}
                    />
                </View>
                <View style={styles.form}>
                    <TextInput
                        value={state.password}
                        style={styles.input}
                        placeholder='PASSWORD'
                        placeholderTextColor='gray'
                        secureTextEntry
                        onChangeText={(value) => setState((prevState) => ({...prevState, password: value }))}/>
                </View>
                <OutlinedButton icon='arrow-forward-outline' onPress={onSubmitHandle}>SIGN IN</OutlinedButton>
                <Pressable onPress={() => navigation.navigate('Register')} >
                    <Text style={styles.button}
                    >
                        go 2 sign up
                     </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 80,

    },
    input: {
        paddingHorizontal: 6,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        fontFamily: 'Qanelas-Regular',
    },
    button: {
        position: 'absolute',
        fontFamily: 'Qanelas-Regular',
        fontSize: 16,
        left: 60,
        top: 270
    }
})
