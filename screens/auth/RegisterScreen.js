import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Platform,
    TouchableWithoutFeedback, Keyboard, Text, Pressable, KeyboardAvoidingView
} from "react-native";
import OutlinedButton from "../../Ui/OutlinedButton";
import {authSignUpUser} from '../../store/auth/authOperations'
import {useDispatch} from "react-redux";
import LoadingIndicator from "../../components/LoadingIndicator";



const initialState = {
    nickName: '',
    email: '',
    password: ''
}

const RegisterScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState(initialState);

    const onSubmitHandle = () => {
        dispatch(authSignUpUser(state))
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={2}
            >
                <LoadingIndicator size={100}/>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder='NAME'
                        placeholderTextColor='gray'
                        value={state.nickName}
                        onChangeText={(value) => setState((prevState) => ({...prevState, nickName: value }))}
                    />
                </View>
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
                <View style={styles.btnContainer}>
                    <OutlinedButton icon='happy-outline' onPress={onSubmitHandle}>     [ REGISTRATION ]      </OutlinedButton>
                </View>
                <Pressable onPress={() => navigation.navigate('Login')} >
                    <Text style={styles.button}
                    >
                        already registered ? go 2 LOGIN
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
        alignItems: 'center',
        backgroundColor: 'black'

    },
    input: {
        width: 300,
        height: 50,
        paddingHorizontal: 6,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        fontFamily: 'Qanelas-Regular',
        color: 'gray',
        backgroundColor:'lightgray'
    },
    btnContainer: {
        marginTop: 40
    },
    button: {
        color: 'white',
        position: 'absolute',
        fontFamily: 'Qanelas-Regular',
        fontSize: 16,
        top: 120,
        left: -110,
    }
})
