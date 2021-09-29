import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import homeActive from '../../assets/active_home.png';
import home from '../../assets/home.png';
import searchActive from '../../assets/active_home_discover_trip.png';
import search from '../../assets/search_button.png';
import favorites from '../../assets/favorites.png';
import activeFavorites from '../../assets/active_favorites.png';

import BottomTabImage from '../../Common/components/UI/BottomTabImage';


export default function HomeBottomNavigation({ navigation, buttonId }) {
    return (
        <View>
            <View style={styles.container}>
                <BottomTabImage
                    image={buttonId === 0 ? homeActive : home}
                    pressed={buttonId === 0}
                    onPress={() => { navigation.navigate('Home'); }} />
                <BottomTabImage
                    image={buttonId === 2 ? activeFavorites : favorites}
                    pressed={buttonId === 2}
                    onPress={() => { navigation.navigate('Map'); }} />
                <BottomTabImage
                    image={buttonId === 1 ? searchActive : search}
                    pressed={buttonId === 1}
                    onPress={() => { navigation.navigate('Gasoline'); }} />
            </View>
        </View>
    );

}

const styles = EStyleSheet.create({
    container: {
        width: '100%',
        height: '8rem',
        paddingHorizontal: '2rem',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 2,
    },
});
