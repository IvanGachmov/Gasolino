import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import globalStyles from '../../../globalStyles';


export default function BottomTabImage({ image, title, pressed, onPress, profileImage }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress()}>
            <Image source={image} style={profileImage ? styles.profileImage : styles.imageStyle} />
        </TouchableOpacity>
    );

}

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        height: '7rem',
        marginTop: '0.5rem'
    },
    imageStyle: {
        width: '5rem',
        height: '5rem',
        resizeMode: 'contain',
    },
    profileImage: {
        width: '5rem',
        height: '5rem',
        borderRadius: '3rem',
        resizeMode: 'cover',
    },
    title: {
        color: globalStyles.grey,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '2rem',
    },
    pressedTitle: {
        color: globalStyles.darkBlue,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '2rem',
    }
});
