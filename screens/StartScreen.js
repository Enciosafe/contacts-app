import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Pressable, Alert, SafeAreaView} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import {useDispatch} from "react-redux";
import {authSignOutUser} from "../store/auth/authOperations";
import {Colors} from "../assets/colors/Colors";
import RollingBar from "../Ui/RollingBar";




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
                <View style={{marginHorizontal: "25%"}}>
                    <OutlinedButton icon="enter-outline" onPress={enterHandler}  >  FOLDERS   </OutlinedButton>
                    <OutlinedButton icon="man-outline" onPress={profileHandler}  >   PROFILE    </OutlinedButton>
                    <OutlinedButton icon="log-out-outline" onPress={signOutHandler}  >   LOGOUT   </OutlinedButton>
                </View>
                <SafeAreaView style={styles.rollingBar}>
                    <RollingBar/>
                </SafeAreaView>
                <Pressable
                    style={[styles.button, styles.version]}
                    onPress={() => {
                        Alert.alert('small fixes');
                    }}
                >
                    <Text style={styles.versionText}>version 1.3.1</Text>
                </Pressable>

            </View>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        left: '40%',
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
        marginBottom: 200,
        marginHorizontal: '14%'
    },
    rollingBar: {
        position: 'absolute',
        bottom: 70
    }
})
