import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import globalStyles from '../../../globalStyles';
import Modal from "react-native-modal";
import TextButton from './TextButton';


export default function ModalWithImage(props) {

    const onGoButtonPressed = () => {
        props.onShowModalDialog();
        props.onGo();
    }

    return (
        <Modal isVisible={props.showModalDialog}
            customBackdrop={
                <TouchableWithoutFeedback onPress={() => props.onShowModalDialog()}>
                    <View style={{ flex: 1, backgroundColor: globalStyles.grey }} />
                </TouchableWithoutFeedback>
            }>
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Image style={styles.image} source={props.image} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.brand_name}</Text>
                </View>
                <View style={styles.datePickerContainer}>
                    <Text>Address: {props.address}</Text>
                    <Text>Work time: {props.worktime}</Text>
                    <Text>Phone: {props.phone}</Text>
                    <Text>Services: {props.services}</Text>
                    <Text>Payments: {props.payments}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TextButton
                        btnText={'GO'}
                        btnTextStyle={styles.modalButtonText}
                        btnStyle={styles.yesButton}
                        onBtnPress={() => onGoButtonPressed()} />
                </View>
            </View>
        </Modal>);

}

const styles = EStyleSheet.create({
    mainContainer: {
        justifyContent: "space-between",
        alignItems: 'center',
        width: "100%",
        paddingVertical: "4rem",
        borderRadius: '1rem',
        backgroundColor: globalStyles.backgroundGrey
    },
    imageContainer: {
        width: "100%",
    },
    image: {
        width: "45rem",
        height: '35rem',
        resizeMode: 'cover',
    },
    titleContainer: {
        width: '100%',
        paddingHorizontal: '2rem',
        paddingVertical: '3rem',
    },
    title: {
        color: globalStyles.grey,
        fontSize: "2.4rem",
        fontFamily: globalStyles.fontPoppinsRegular,
    },
    datePickerContainer: {
        width: '100%',
        paddingBottom: '3rem',
        paddingHorizontal: '2rem'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalButtonText: {
        color: globalStyles.white,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '2.4rem',
    },
    yesButton: {
        backgroundColor: globalStyles.darkGreen,
        paddingVertical: '1rem',
        paddingHorizontal: '3rem',
        marginRight: '0.5rem',
        borderRadius: '0.5rem'
    },


});
