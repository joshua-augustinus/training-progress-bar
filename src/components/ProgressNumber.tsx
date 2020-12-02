import React, { useEffect, useRef } from "react"
import { Animated, Text } from "react-native"


interface Props {
    isVisible: boolean,
    value: number
}

const ProgressNumber = (props: Props) => {
    const scale = useRef(new Animated.Value(0)).current;

    const transformArray = [{ scale: scale }];
    const text = props.value + ' %'

    useEffect(() => {
        if (props.isVisible) {
            const animation1 = Animated.spring(scale, {
                useNativeDriver: true,
                toValue: 1,
                bounciness: 16
            })

            animation1.start();
        }
    }, [props.isVisible]);


    return (
        <Animated.Text style={{ transform: transformArray }}>{text}</Animated.Text>

    )
}

export { ProgressNumber }
