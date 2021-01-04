import React, { useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, Text, View } from "react-native"
import { ExploreButton } from "./ExploreButton";


interface Props {
    isVisible: boolean,
    value: number,
    delay: number
}

const EXPLORE_WIDTH = 100;

const ProgressNumber = (props: Props) => {
    const scale = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(EXPLORE_WIDTH)).current;
    const [exploreIsVisible, setExploreIsVisible] = useState(false);

    const transformArray = [{ scaleY: scale }];
    const text = props.value + ' %'

    useEffect(() => {
        if (props.isVisible) {
            const animation1 = Animated.spring(scale, {
                useNativeDriver: true,
                toValue: 1,
                bounciness: 16,
                delay: props.delay
            })


            animation1.start(() => {
            });
        }
    }, [props.isVisible]);


    return (
        <View style={styles.container}>
            <Animated.View style={{ justifyContent: 'center', transform: transformArray, flexDirection: 'row' }}>
                <Text >{text}</Text>
                <ExploreButton width={EXPLORE_WIDTH} isVisible={true} />

            </Animated.View>
        </View>
    )
}

export { ProgressNumber }


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center'
    }
})