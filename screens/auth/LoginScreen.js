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
import LoadingIndicator from "../../components/LoadingIndicator";
import {Colors} from "../../assets/colors/Colors";




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
                    <LoadingIndicator size={100}/>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder='EMAIL'
                            placeholderTextColor='gray'
                            value={state.email.toLowerCase()}
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
                        <OutlinedButton
                            icon='arrow-forward-outline'
                            onPress={onSubmitHandle}
                        >              LOGIN                     </OutlinedButton>
                    </View>

                    <Pressable onPress={() => navigation.navigate('Register')} >
                        <Text style={styles.button}
                        >
                            go 2
                            <Text style={{color: Colors.accent}}> registration</Text>
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
        backgroundColor: 'black',
        alignItems: 'center'

    },
    input: {
        width: 300,
        height: 35,
        paddingHorizontal: 6,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
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
        left: -50,
        top: 150
    }
})
