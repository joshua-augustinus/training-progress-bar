import React, { useEffect, useRef } from "react"
import { Animated, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';


interface Props {
    isVisible: boolean,
    width: number
}

const ExploreButton = (props: Props) => {
    const translateX = useRef(new Animated.Value(500)).current;

    const transformArray = [{ translateX: translateX }];

    useEffect(() => {
        if (props.isVisible) {
            const animation1 = Animated.spring(translateX, {
                useNativeDriver: true,
                toValue: 0,
                bounciness: 0
            });
            animation1.start();

        }

    }, [props.isVisible]);

    return (
        <Animated.View style={[styles.container, { width: props.width, transform: transformArray }]}>

            <Text style={styles.exploreText}>EXPLORE</Text>
            <Icon name="arrow-right" size={30} color="white" />
        </Animated.View>
    )
}

export { ExploreButton }


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#29b2cf',
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 6
    },
    exploreText: {
        color: 'white',
        marginLeft: 6
    }
})