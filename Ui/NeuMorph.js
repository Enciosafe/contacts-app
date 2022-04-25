import React from 'react';
import {StyleSheet, SafeAreaView, Text, View} from "react-native";

const gray = '#91A1BD'

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
        backgroundColor: "#e3eaf3",
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#E2ECFD",
        borderWidth: 1
    },
    topShadow: {
        shadowOffset: {
            width: -6,
            height: -6
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: "#fffcfc"
    },
    bottomShadow: {
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: "#c0c2ce"
    }
})
