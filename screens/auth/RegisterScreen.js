import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard, Text, Pressable
} from "react-native";
import OutlinedButton from "../../Ui/OutlinedButton";



const initialState = {
    name: '',
    email: '',
    password: ''
}

const RegisterScreen = ({navigation}) => {
    const [state, setState] = useState(initialState);

    const onSubmitHandle = () => {
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
                        placeholder='NAME'
                        value={state.email}
                        onChangeText={(value) => setState((prevState) => ({...prevState, name: value }))}
                    />
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder='EMAIL'
                        value={state.email}
                        onChangeText={(value) => setState((prevState) => ({...prevState, email: value }))}
                    />
                </View>
                <View style={styles.form}>
                    <TextInput
                        value={state.password}
                        style={styles.input}
                        placeholder='PASSWORD'
                        secureTextEntry
                        onChangeText={(value) => setState((prevState) => ({...prevState, password: value }))}/>
                </View>
                <OutlinedButton icon='happy-outline' onPress={onSubmitHandle}>SIGN UP</OutlinedButton>
                <Pressable onPress={() => navigation.navigate('Login')} >
                    <Text style={styles.button}
                    >
                        already registered ? go 2 sign in
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default RegisterScreen;

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
        top: 250
    }
})
