import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const FolderItem = ({id, title, description}) => {

    const navigation = useNavigation()

    const onOpenContactHandler = () => {
        navigation.navigate('Contacts')
    }
    return (
        <Pressable style={({pressed}) => [styles.box, pressed && styles.pressed]} onPress={onOpenContactHandler}>
            <View style={styles.titleBox}>
                <Text style={styles.insideText}>{title}</Text>
            </View>
        </Pressable>
    );
};

export default FolderItem;

const styles = StyleSheet.create({
    box: {
        marginHorizontal: 5,
        marginTop: 10,
        width: 120,
        height: 120,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 15,

    },
    titleBox: {
        marginTop: 80,
        backgroundColor: 'gray',
        opacity: .5,
    },
    insideText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
    },
    pressed: {
        opacity: .7,
        backgroundColor: 'black'
    }
})
