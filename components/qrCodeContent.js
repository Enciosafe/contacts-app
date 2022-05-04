import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const QrCodeContent = (props) => {
    return (
        <View style={styles.container}>
            <Text>QR CODE CONTENT</Text>
        </View>
    );
};

export default QrCodeContent;

const styles = StyleSheet.create({
    container: {
        margin: 50
    }
})
