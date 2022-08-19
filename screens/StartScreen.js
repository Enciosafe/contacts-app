import React from 'react';
import {View, StyleSheet, Text, Pressable, Alert} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import {useDispatch} from "react-redux";
import {authSignOutUser} from "../store/auth/authOperations";
import {Colors} from "../assets/colors/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";




const StartScreen = ({navigation}) => {
   const dispatch = useDispatch()


    const enterHandler = () => {
        navigation.navigate('Folders')
    }

    const profileHandler = () => {
        navigation.navigate('Profile')
    }

    const signOutHandler = () => {
       dispatch(authSignOutUser())
   }



    return (
            <View style={styles.container}>
                <View style={styles.titleContainer} >
                    <Text style={styles.title}>QUICKmE</Text>
                </View>
                <OutlinedButton icon="enter-outline" onPress={enterHandler}  >  FOLDERS   </OutlinedButton>
                <OutlinedButton icon="man-outline" onPress={profileHandler}  >   PROFILE    </OutlinedButton>
                <OutlinedButton icon="log-out-outline" onPress={signOutHandler}  >   LOGOUT   </OutlinedButton>

                <Pressable
                    style={[styles.button, styles.version]}
                    onPress={() => {
                        Alert.alert('NEW!! \n' +
                            '  1. Хранение картинок на сервере \n' +
                            '  2. Хабтики (виброотклик) \n' +
                            '  3. Обновление по свайпу вниз\n' +
                            '  4. Три папки в ряд\n' +
                            '  5. Поправил пульсацию\n' +
                            '  6. Редактирование контакта\n' +
                            '  7. Отображение значков тех соц.сетей которые указаны\n' +
                            '  8. Поле адрес у контакта и кликабельная плашка с перенаправлением на карту по этому адресу\n' +
                            '  9. Стили названия');
                    }}
                >
                    <Text style={styles.versionText}>version 1.2.0</Text>
                </Pressable>

            </View>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    title: {
        color: Colors.accent,
        fontFamily: 'Qanelas-Regular',
        fontSize: 56
    },
    version: {
        color: Colors.accent,
        position: "absolute",
        bottom: 30,
        borderWidth: 1,
        borderColor: Colors.accent,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Colors.accent
    },
    versionText: {
        color: 'black',
    },
    titleContainer: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingHorizontal: 30,
        flexDirection: 'row',
        borderWidth: 1,
        borderBottomColor: Colors.fill,
        borderLeftColor: Colors.primal,
        borderRightColor: Colors.primal,
        borderTopColor: Colors.fill,
        borderRadius: 15,
        position: "absolute",
        top: 120
    },
})
