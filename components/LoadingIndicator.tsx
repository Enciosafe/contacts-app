import * as React from 'react';
import {View, StyleSheet} from 'react-native'
import {MotiImage, MotiView} from 'moti'

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
                <View style={styles.imgContainer}>
                    <MotiImage
                        style={{
                            width: 227,
                            height: 200,
                        }}
                        from={{
                            rotate: "0deg",
                        }}
                        animate={{
                            rotate: "360deg",
                        }}
                        transition={{
                            loop: true,
                            repeatReverse: false,
                            type: "timing",
                            duration: 2000,
                        }}
                        source={require("./../assets/img/transparentLogo.png")}
                    />
                </View>
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
    },
    imgContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    }
})
