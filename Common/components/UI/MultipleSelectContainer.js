import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import globalStyles from '../../../globalStyles';
import TickImage from '../../../assets/trip_tick.png';

export default function MultipleSelectContainer({ onAddToMultipleValues, showImage, name, image }) {

    return (
        <TouchableOpacity style={styles.container} onPress={() => onAddToMultipleValues()}>
            <View style={{ width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {image ? <Image source={image} style={styles.logo} /> : null}
                <Text style={showImage ? styles.selectedNameText : styles.nameText}>{name}</Text>
            </View>
            <View style={{ width: '10%' }}>
                <Image source={showImage ? TickImage : null} style={styles.tickImage} />
            </View>

        </TouchableOpacity>);

}

const styles = EStyleSheet.create({
    nameText: {
        color: globalStyles.grey,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '2rem',
    },
    selectedNameText: {
        color: globalStyles.darkGrey,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '2rem',
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        height: '6rem',
        paddingLeft: '2rem',
        paddingRight: '3rem',
    },
    tickImage: {
        width: '4rem',
        height: '4rem',
        resizeMode: 'contain',
    },
    logo: {
        height: '4rem',
        width: '4rem',
        marginRight: '1rem',
        resizeMode: 'contain',
    },

});
