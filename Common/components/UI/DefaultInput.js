import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Text } from 'react-native';
import globalStyles from '../../../globalStyles';
import EStyleSheet from 'react-native-extended-stylesheet';

const DefaultInput = React.forwardRef((props, ref) => {

    const { inputValue, onChangeText, placeholderText,
        password, keyboardType, onFocus, image,
        incorrectInput, error, extraField, extraFieldText, style, mainTextInput } = props;

    const containerStyle = [styles.container];
    if (incorrectInput) {
        containerStyle.push({ borderColor: globalStyles.red })
    }
    if (mainTextInput) {
        containerStyle.push(styles.mainTextInputStyle)
    }

    return (
        <View style={style ? style : { width: '100%' }} ref={ref}>
            <View style={containerStyle}>
                <View style={styles.imageContainer}>
                    <Image source={image} style={extraField ? styles.extraFieldImage : styles.image} />
                </View>
                <View style={styles.inputContainer}>
                    {extraField ? <Text style={styles.extraFieldText}>{extraFieldText}</Text> : null}
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholderTextColor={incorrectInput ? globalStyles.red : globalStyles.textBlue}
                        placeholder={placeholderText}
                        value={inputValue}
                        onChangeText={onChangeText}
                        onFocus={onFocus}
                        secureTextEntry={password}
                        keyboardType={keyboardType}
                        style={styles.inputText}
                        autoCapitalize="none" />
                </View>
            </View>
            {incorrectInput ?
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View> : null
            }
        </View>
    );
});


export default DefaultInput;

const styles = EStyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: globalStyles.backgroundGrey,
        paddingHorizontal: '0.5rem',
        minHeight: '8rem',
        marginVertical: '1rem',
        borderWidth: 1,
        borderColor: globalStyles.grey,
        alignItems: 'center',
        zIndex: 0,
    },
    mainTextInputStyle: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: globalStyles.backgroundGrey,
        paddingHorizontal: '0.5rem',
        minHeight: '8rem',
        marginVertical: '1rem',
        borderWidth: 0.5,
        borderColor: globalStyles.grey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4rem',
    },
    image: {
        width: '3rem',
        height: '3rem',
        resizeMode: 'contain',
    },
    imageContainer: {
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        justifyContent: 'center',
    },
    inputText: {
        color: globalStyles.grey,
        fontFamily: globalStyles.fontPoppinsMedium,
        fontSize: '2.4rem',
    },
    incorrectInputText: {
        color: globalStyles.red,
        fontFamily: globalStyles.fontPoppinsMedium,
        fontSize: '2.4rem',
    },
    errorContainer: {
        width: '100%',
        backgroundColor: globalStyles.errorBackground,
        minHeight: '3rem',
        maxHeight: '10rem',
        paddingRight: '1.5rem',
        paddingLeft: '3rem',
    },
    errorText: {
        color: globalStyles.red,
        fontFamily: globalStyles.fontPoppinsMedium,
        fontSize: '2rem',
    },
    extraFieldText: {
        color: globalStyles.darkGrey,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '2rem',
        paddingTop: '1rem',
        marginBottom: '-2rem',
        paddingLeft: '0.5rem'
    },
    extraFieldImage: {
        width: '5rem',
        height: '5rem',
        resizeMode: 'contain',
    }
});


