import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import menuIcon from '../../../assets/menu.png';
import BackArrow from '../../../assets/back_arrow.png';
import tbtLogo from '../../../assets/images/tbt_logo.png';
import globalStyles from '../../../globalStyles';

export default function Header({ navigation, isFirstPage, isTripPage }) {
    return (
        <View style={styles.container}  >
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backArrowImageContainer} onPress={() => isTripPage ? navigation.navigate("Home") : navigation.pop()}>
                    <Image source={isFirstPage ? null : BackArrow} style={styles.backArrowImage} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.title}>Gasolino</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image source={menuIcon} style={styles.drawerImage} />
                </TouchableOpacity>
            </View>
        </View>);
}

const styles = EStyleSheet.create({
    container: {
        height: '7rem',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: globalStyles.darkGreen,
    },
    backgroundImage: {
        width: '100%',
        height: '7rem',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backArrowImage: {
        width: '4rem',
        height: '4rem',
        resizeMode: 'contain',
    },
    backArrowImageContainer: {
        paddingHorizontal: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '2rem'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: '2rem'
    },
    drawerImage: {
        width: '6rem',
        height: '6rem',
        resizeMode: 'contain',
    },
    title: {
        color: globalStyles.white,
        fontSize: "5rem",
        fontFamily: globalStyles.fontPoppinsBold,
        textAlign: 'center',
    },
});


