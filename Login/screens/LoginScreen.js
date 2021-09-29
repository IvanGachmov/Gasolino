import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../../globalStyles';
import EStyleSheet from 'react-native-extended-stylesheet';
import DefaultInput from '../../Common/components/UI/DefaultInput';
import EmailImage from '../../assets/login_user.png';
import PasswordImage from '../../assets/create_account_password_field.png';
import CancelImage from '../../assets/login_close_icon.png';
import TextButton from '../../Common/components/UI/TextButton';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [forgotPassMode, setForgotPassMode] = useState(false);

    const onLoginPressed = () => {
        if (forgotPassMode) {
            props.sendEmail(email);
        } else {
            AsyncStorage.getItem(email).then(email => {
                if (email) {
                    AsyncStorage.setItem('IsLoggedIn', 'true');
                    props.onLoggin(true);
                    console.log(props);
                }
            });
        }
    };

    const onForgotPasswordPressed = () => { setForgotPassMode(true) };
    const onRegisterScreenPressed = () => { props.navigation.navigate('RegisterScreen'); };

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity style={styles.cancelImageContainer} onPress={() => {
                        if (forgotPassMode) {
                            setForgotPassMode(false);
                        } else {
                            props.navigation.pop()
                        }
                    }}>
                        <Image style={styles.cancelImage} source={CancelImage} />
                    </TouchableOpacity>
                </View>
                <DefaultInput
                    placeholderText="Your e-mail address"
                    inputValue={email}
                    onChangeText={setEmail}
                    keyboardType={'email-address'}
                    onFocus={() => console.log('error')}
                    image={EmailImage} />
                {!forgotPassMode ? <DefaultInput
                    placeholderText="Password"
                    inputValue={password}
                    onChangeText={setPassword}
                    password={true}
                    onFocus={() => console.log('error')}
                    image={PasswordImage} /> : null}
                <TextButton
                    btnText={!forgotPassMode ? "Login" : "Send email"}
                    btnStyle={styles.btnStyle}
                    btnTextStyle={styles.btnTextStyle}
                    onBtnPress={onLoginPressed} />
                {!forgotPassMode ? <TextButton
                    btnText={'Forgot password?'}
                    btnStyle={styles.forgotBtnContainerStyle}
                    btnTextStyle={styles.forgotBtnTextStyle}
                    onBtnPress={onForgotPasswordPressed} /> : null}
            </View>
            <View style={styles.singUpContainer}>
                <Text style={styles.dontHaveText}>Don't have an account?</Text>
                <TextButton
                    btnText={'Sign up'}
                    btnTextStyle={styles.signUpBtnText}
                    btnStyle={styles.singUpBtnContainer}
                    onBtnPress={onRegisterScreenPressed} />
            </View>

        </View >

    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: globalStyles.backgroundGrey,
        paddingHorizontal: '1.5rem',
        justifyContent: 'space-between',
    },
    mainContainer: {
        width: '100%',
    },
    cancelContainer: {
        flexDirection: 'row',
        height: '10rem',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '2rem',
    },
    cancelImage: {
        width: '3.5rem',
        height: '3.5rem',
        resizeMode: 'contain',
    },
    cancelImageContainer: {
        paddingHorizontal: '2rem',
    },
    btnStyle: {
        backgroundColor: globalStyles.darkBlue,
        borderRadius: '3rem',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '6rem',
        textAlign: 'center',
        marginTop: '1rem',
    },
    btnTextStyle: {
        color: globalStyles.white,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '2.4rem',
    },
    forgotBtnTextStyle: {
        color: globalStyles.darkBlue,
        fontFamily: globalStyles.fontPoppinsMedium,
        fontSize: '2.4rem',
    },
    forgotBtnContainerStyle: {
        marginTop: '1rem',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '2rem',
    },
    singUpContainer: {
        width: '100%',
        height: '8rem',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: globalStyles.grey,
        borderBottomWidth: 0.5,
        borderBottomColor: globalStyles.grey,
        flexDirection: 'row',
        marginBottom: '7rem',
    },
    signUpBtnText: {
        color: globalStyles.red,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '2.4rem',
    },
    singUpBtnContainer: {
        paddingHorizontal: '0.5rem',
    },
    dontHaveText: {
        color: globalStyles.grey,
        fontFamily: globalStyles.fontPoppinsMedium,
        fontSize: '2.4rem',
    },
});



export default connect(null, null)(LoginScreen);
