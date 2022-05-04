import React from 'react'
import {View, Text, StyleSheet} from "react-native";

const ProfileDetails = () => {
    return (
        <View style={styles.container}>
            <Text>ProfileDetails</Text>
        </View>
    );
};

export default ProfileDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
