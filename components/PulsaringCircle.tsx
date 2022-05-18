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
                    borderWidth: 10,
                    shadowOpacity: 0.5,

                }}
                animate={{
                    width: size + 10,
                    height: size + 10,
                    borderWidth: size / 10,
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
                    shadowRadius: 10
                }}>
            </MotiView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'black',
        marginBottom: 100,
        position: 'absolute',
        top: 205,
        left: -5

    },
    imgContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    }
})
