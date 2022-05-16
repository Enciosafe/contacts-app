import * as React from 'react';
import {View, StyleSheet} from 'react-native'
import { MotiView } from 'moti'
import { Colors } from '../assets/colors/Colors';

const LoadingIndicator = ({size}: {size: number}) => {
    return (
        <View style={styles.container}>
            <MotiView
                from={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: 0.5,
                    shadowOpacity: 0.5,

                }}
                animate={{
                    width: size + 20,
                    height: size + 20,
                    borderRadius: (size / 2) + 20,
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
            <MotiView
                from={{
                    shadowOpacity: 0.5,
                    rotate: 0,
                    borderWidth: 0.5,
                }}
                animate={{
                    shadowOpacity: 1,
                    rotate: 90,
                    borderWidth: 1,
                }}
                transition={{
                    type: 'timing',
                    duration: 5000,
                    loop: true,
                }}
                style={{
                    width: size,
                    borderWidth: size / 40,
                    borderColor: Colors.accent,
                    shadowColor: Colors.accent,
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    position: 'absolute',
                    bottom: size / 2
                }}
            >
            </MotiView>
            </MotiView>
        </View>

    );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
    container: {
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'black',
        marginBottom: 100
    }
})
