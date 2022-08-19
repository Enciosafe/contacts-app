import {MotiView} from "moti";
import {StyleSheet, View} from "react-native";
import * as React from "react";



export const PulsaringCircle = ({size}: {size: number}) => {



    return (
        <View style={styles.container}>
                <MotiView
                from={{
                    width: size,
                    height: size,
                    borderWidth: 1,
                    shadowOpacity: 0.5,

                }}
                animate={{
                    width: size + 5,
                    height: size + 1,
                    borderWidth: size / 5,
                    shadowOpacity: 1,
                }}
                transition={{
                    type: 'timing',
                    duration: 2000,
                    loop: true,
                }}
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: size / 50,
                    borderColor: 'white',
                    shadowColor: 'white',
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 1,
                    shadowRadius: 20
                }}>
            </MotiView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 100,
        position: 'absolute',
        top: 220,
        left: 0

    },
    imgContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    }
})
