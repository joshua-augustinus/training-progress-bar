import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { ProgressBar } from '@src/components/ProgressBar';

/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const randomPercent = () => {
    return Math.floor(Math.random() * 100);
}

const viewabilityConfig = {
    minimumViewTime: 500,
    itemVisiblePercentThreshold: 90
}

let itemArray = [];
for (let i = 0; i < 30; i++) {
    itemArray.push({
        index: i,
        value: randomPercent(),
        isAnimated: false,
        animationIndex: 0
    });
}



const MasterScreen = (props: Props) => {
    const [data, setData] = useState(itemArray);
    const [extraData, setExtraData] = useState(null);
    useEffect(() => {

    }, []);

    const onMenuPress = () => {
        console.log(props.navigation.state);// { key: 'Home', routeName: 'Home' }
        console.log("Menu pressed");
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    const renderItem = ({ item, index }) => {
        item.index = index;
        return (<ProgressBar percentage={item.value} style={styles.bar} animationIndex={item.animationIndex} key={index} isAnimated={item.isAnimated} />)

    }

    const onViewableItemsChanged = React.useRef((info) => {
        const changedItems = info.viewableItems;
        let animationIndex = 0;
        for (let i = 0; i < changedItems.length; i++) {
            const item = changedItems[i];
            if (!item.isAnimated) {
                const dataItem = data[item.index];
                dataItem.isAnimated = true;
                dataItem.animationIndex = animationIndex;
                animationIndex++;

            }

        }

        if (animationIndex > 0) {
            setExtraData(new Date());
        }
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ backgroundColor: 'yellow' }}
                    onPress={() => onMenuPress()}>
                    <Text>Menu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList viewabilityConfig={viewabilityConfig}
                    extraData={extraData}
                    showsVerticalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged.current} data={data}
                    keyExtractor={item => item.index.toString()} renderItem={renderItem} />


            </View>
        </SafeAreaView>

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }

const styles = StyleSheet.create({
    bar: {
        marginVertical: 0
    }
})