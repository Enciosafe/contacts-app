import { FC, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, Pressable, Text, Image, View } from 'react-native';
import Animated, {SharedValue, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import {changeAccentColor} from "../assets/colors/Colors";



interface  CircleProps {
    index: number,
    color: string,
    position: SharedValue<number>
    rollButton?: () => void
    isLead?: boolean
    rotation?: SharedValue<number>
}


const ACCENT_COLORS = [
    '#DB504A',
    "#FF6F59",
    "#254441",
    "#43AA8B",
    "#B2B09B",
    "#BAB25B"
]



const { width } = Dimensions.get('window')
const dotOffset = width / 6;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Circle: FC<CircleProps> = ({ color, isLead, index , position, rollButton, rotation}) => {
    const defaultSharedValue = useSharedValue(dotOffset * index + 3)
    const calculatePosition = useSharedValue(0)


    // @ts-ignore
    const style = useAnimatedStyle(() => {
        'worklet';
        calculatePosition.value = withSpring(position.value, {
            stiffness: 50,
            mass: 0.7
        })

        const scaleValue = calculatePosition.value - 3 > defaultSharedValue.value ? 1 : 0
        const restDisplacementNumber = calculatePosition.value - 3 > defaultSharedValue.value ? 1 : 20

        if(isLead && calculatePosition.value <= 10) {
            rotation!.value = 0
        } else {
            rotation!.value = Math.PI * (calculatePosition.value / width) * 1.5
        }

        return {
            position: "absolute",
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: color,
            zIndex: isLead ? 10 : 1,
            justifyContent: 'center',
            alignItems: 'center',
            left: isLead ? undefined : defaultSharedValue.value,
            transform: [
                {
                    scale: isLead ? 1 : withSpring(scaleValue, {
                        mass: 0.5,
                        restDisplacementThreshold: restDisplacementNumber
                    })
                },
                {
                    translateX: isLead
                        ? withSpring(position.value, {
                            stiffness: 50,
                            mass: 0.7
                        })
                        : 1,
                },
                {
                    rotate: isLead ? withSpring(`${rotation?.value}rad`) : `${0}rad`
                }
            ]
        }
    })
    return <AnimatedPressable style={style} onPress={() => {
        isLead || calculatePosition.value >= 10 ? rollButton?.() : undefined
    }}>
        <View style={styles.buttonContent}>
            {isLead ? (
                <Text style={styles.plusButton}>+</Text>
            ) :
                null
            }
        </View>
    </AnimatedPressable>
}


export default function RollingBar() {

    const position = useSharedValue(6)
    const rotation = useSharedValue(Math.PI)
    const [accentColor, setAccentColor] = useState('#028090');

    const rollButton = () => {
        'worklet';
        if(position.value === dotOffset * 5 + 3) {
            position.value = 6
        } else {
            position.value = dotOffset * 5 + 3;
        }
    }

    const changeTheme = (color: string) => {
        'worklet';
        setAccentColor(color)
        changeAccentColor(accentColor)
    }



    return (
        <View style={styles.menuContainer}>
                {ACCENT_COLORS.map((buttonColor, index) => {
                    return (
                        <Circle
                            key={index}
                            index={index}
                            color={buttonColor}
                            position={position}
                            rotation={rotation}
                            isLead={index === 5}
                            rollButton={index === 5 ? rollButton : () => changeTheme(buttonColor)}
                        />
                    )
                })}
            </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        height: 100,
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    buttonContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusButton: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: -3
    },
});
