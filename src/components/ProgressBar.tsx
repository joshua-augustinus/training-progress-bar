import React, { useEffect, useRef, useState } from "react"
import { ImagePropTypes, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { Easing } from 'react-native-reanimated';
import { ProgressNumber } from "./ProgressNumber";

const {
    timing,
} = Animated;

const BAR_HEIGHT = 16;

interface Props {
    /**
     * Number from 0 to 100
     */
    percentage: number
    style: any,
    animationIndex: number,
    isAnimated: boolean
}

const ProgressBar = React.memo((props: Props) => {
    const windowWidth = useWindowDimensions().width;
    const width = useRef(new Animated.Value(0)).current;
    const [isNumberVisible, setIsNumberVisible] = useState(false);
    const barWidth = windowWidth * 0.9;
    const foregroundBarWidth = barWidth * props.percentage / 100

    useEffect(() => {
        if (!props.isAnimated)
            return;
        const delay = 500 + props.animationIndex * 100;
        const duration = 400;
        const animation1 = timing(width, {
            toValue: foregroundBarWidth,
            duration: duration,
            easing: Easing.inOut(Easing.ease)
        });

        setTimeout(() => {
            animation1.start(() => {
                setIsNumberVisible(true);
            });

        }, delay)
    }, [props.isAnimated]);

    return (
        <TouchableOpacity onPress={() => { }}>
            <View style={props.style}>
                <View style={styles.header}>
                    <Text>Left Text</Text>
                    <ProgressNumber isVisible={isNumberVisible} value={props.percentage} />

                </View>
                <View style={{ ...styles.backgroundBar, width: barWidth }} ></View>

                <Animated.View style={{ ...styles.foregroundBar, width: width, }}></Animated.View>


            </View >
        </TouchableOpacity>


    )
});

export { ProgressBar }

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginRight: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2
    },
    foregroundBar: {
        width: 200,
        backgroundColor: 'orange',
        height: BAR_HEIGHT,
        borderRadius: 10,
        transform: [{ translateY: -BAR_HEIGHT }]
    },
    backgroundBar: {
        width: 200,
        backgroundColor: '#D3D3D3',
        height: BAR_HEIGHT,
        borderRadius: 10
    }
})