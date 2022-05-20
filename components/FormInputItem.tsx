import * as React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {Colors} from "../assets/colors/Colors";


const FormInputItem: ({
                          maxLength,
                          value,
                          onChangeText,
                          keyboardType,
                          title
                      }: { maxLength: number; value: any; onChangeText: any; keyboardType: any; title: string }) => JSX.Element = ({ maxLength, value, onChangeText, keyboardType, title}) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <TextInput style={[styles.input, styles.text]}
                keyboardType={keyboardType}
                maxLength={maxLength}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export default FormInputItem;

const styles = StyleSheet.create({
    input: {
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: Colors.input,
        borderRadius: 5,
    },
    text: {
        fontFamily: 'Qanelas-Regular',
        color: 'gray'
    },
    title: {
        color: Colors.primal,
        fontFamily: 'Qanelas-Bold',
    }
})
