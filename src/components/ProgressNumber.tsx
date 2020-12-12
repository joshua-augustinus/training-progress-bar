import React, { useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, Text, View } from "react-native"
import { ExploreButton } from "./ExploreButton";


interface Props {
    isVisible: boolean,
    value: number
}

const EXPLORE_WIDTH = 100;

const ProgressNumber = (props: Props) => {
    const scale = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(EXPLORE_WIDTH)).current;
    const [exploreIsVisible, setExploreIsVisible] = useState(false);

    const transformArray = [{ scaleY: scale }, { translateX: translateX }];
    const text = props.value + ' %'

    useEffect(() => {
        if (props.isVisible) {
            const animation1 = Animated.spring(scale, {
                useNativeDriver: true,
                toValue: 1,
                bounciness: 16
            })

            const animation2 = Animated.spring(translateX, {
                useNativeDriver: true,
                toValue: 0,
                bounciness: 0
            })

            animation1.start(() => {
                animation2.start();
                setExploreIsVisible(true);
            });
        }
    }, [props.isVisible]);


    return (
        <View style={styles.container}>
            <Animated.View style={{ justifyContent: 'center', transform: transformArray }}>
                <Text >{text}</Text>

            </Animated.View>
            <ExploreButton width={EXPLORE_WIDTH} isVisible={exploreIsVisible} />
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