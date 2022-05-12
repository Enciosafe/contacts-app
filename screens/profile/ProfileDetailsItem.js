import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

export const ProfileDetailsItem = ({name, description, email, facebook, instagram, telegram, whatsUp, phone}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>{name}</Text>
            </View>
            <View>
                <Text>{description}</Text>
            </View>
            <View>
                <Text>{email}</Text>
            </View>
            <View>
                <Text>{phone}</Text>
            </View>
            <View>
                <Text>{instagram}</Text>
            </View>
            <View>
                <Text>{facebook}</Text>
            </View>
            <View>
                <Text>{telegram}</Text>
            </View>
            <View>
                <Text>{whatsUp}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

