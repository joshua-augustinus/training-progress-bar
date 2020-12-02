import React, { useEffect, useRef } from "react"
import { ImagePropTypes, StyleSheet, useWindowDimensions, View } from "react-native"
import Animated, { Easing } from 'react-native-reanimated';

const {
    Clock,
    Value,
    set,
    cond,
    startClock,
    clockRunning,
    timing,
    debug,
    stopClock,
    block,
} = Animated;


interface Props {
    /**
     * Number from 0 to 100
     */
    percentage: number
}

const ProgressBar = (props: Props) => {
    const windowWidth = useWindowDimensions().width;
    const width = useRef(new Animated.Value(0)).current;
    const barWidth = windowWidth * 0.9;
    const foregroundBarWidth = barWidth * props.percentage / 100

    useEffect(() => {
        const duration = 1000;
        const animation1 = timing(width, {
            toValue: foregroundBarWidth,
            duration: duration,
            easing: Easing.inOut(Easing.ease)
        });

        setTimeout(() => {
            animation1.start();

        }, 500)
    }, []);

    return (
        <View>
            <View style={{ ...styles.backgroundBar, width: barWidth }} ></View>
            <View style={{ flexDirection: 'row' }}>

                <Animated.View style={{ ...styles.foregroundBar, width: width, }}></Animated.View>

            </View>

        </View >

    )
}

export { ProgressBar }

const styles = StyleSheet.create({
    foregroundBar: {
        width: 200,
        backgroundColor: 'orange',
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        transform: [{ translateY: -20 }]
    },
    backgroundBar: {
        width: 200,
        backgroundColor: '#D3D3D3',
        height: 20,
        borderRadius: 10
    }
})