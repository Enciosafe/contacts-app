import React from 'react';
import {StyleSheet, View} from "react-native";
import {Colors} from "../assets/colors/Colors";


const NeuMorph = ({children, size, style}) => {
    return (
        <View style={styles.topShadow}>
            <View style={styles.bottomShadow}>
                    <View style={[
                        styles.inner,
                        {width: size || 40, height: size || 40, borderRadius: size / 2 || 40 / 2},
                        style
                    ]}
                >
                        {children}
                    </View>
            </View>
        </View>
    );
};

export default NeuMorph;

const styles = StyleSheet.create({
    inner: {
        backgroundColor: Colors.primal,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.primal,
        borderWidth: 1
    },
    topShadow: {
        shadowOffset: {
            width: -2,
            height: -2
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: Colors.accent
    },
    bottomShadow: {
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: Colors.accent
    }
})
