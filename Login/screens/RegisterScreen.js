/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, findNodeHandle, UIManager } from 'react-native';
import globalStyles from '../../globalStyles';
import EStyleSheet from 'react-native-extended-stylesheet';
import DefaultInput from '../../Common/components/UI/DefaultInput';
import EmailImage from '../../assets/login_user.png';
import PasswordImage from '../../assets/create_account_password_field.png';
import AvatarImage from '../../assets/avatar_image.png';
import TextButton from '../../Common/components/UI/TextButton';
import { getGasstations } from '../actions/auth';
import { GASOLINE_TYPES, GASSTATIONS } from '../../constants';
import CustomePicker from '../../Common/components/UI/CustomePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux';

function RegisterScreen(props) {
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [fuels, setFuels] = useState([]);
    const [petrolStations, setPetrolStations] = useState([]);
    const [emailIncorrect, setEmailIncorrect] = useState(false);
    const [error, setError] = useState(null);
    const [passIncorrect, setPassIncorrect] = useState(false);
    const [confirmPassIncorrect, setConfirmPassIncorrect] = useState(false);
    const [firstNameIncorrect, setFirstNameIncorrect] = useState(false);
    const [lastNameIncorrect, setLastNameIncorrect] = useState(false);
    const scrollView = useRef();
    const emailRef = useRef();
    const firstNameRef = useRef();
    const secondNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    useEffect(() => {
        props.getGasstations();
    }, []);

    useEffect(() => {
        if (props.token) {
            props.onLoggin(true);
        }
    }, [props.token]);

    useEffect(() => {
        if (error !== null) {
            if (email !== null) {
                setError(null);
                setEmailIncorrect(false);
            } else if (firstName !== null) {
                setError(null);
                setFirstNameIncorrect(false);
            } else if (lastName != null) {
                setError(null);
                setLastNameIncorrect(false);
            } else if (password !== null) {
                setError(null);
                setPassIncorrect(false);
            } else if (confirmPassword != null) {
                setError(null);
                setConfirmPassIncorrect(false);
            }
        }

    }, [email, firstName, lastName, password, confirmPassword, error]);

    const measurement = element => {
        const handle = findNodeHandle(element.current);
        UIManager.measureLayoutRelativeToParent(
            handle,
            (e) => { console.error(e); },
            (x, y, w, h) => {
                scrollView.current.scrollTo({ x: x, y: y, animated: true });
            });
    };

    const onRegisterPress = () => {
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            fuels: fuels,
            petrolStations: petrolStations,
        };
        if (checkForEmptyFields()) {
            AsyncStorage.setItem(email, JSON.stringify(data));
            AsyncStorage.setItem('IsLoggedIn', 'true');
            props.navigation.pop();
        }
    };

    const checkForEmptyFields = () => {
        if (!firstName) {
            setFirstNameIncorrect(true);
            setError('Please provide non empty first name');
            measurement(firstNameRef);
            return false;
        }
        if (!lastName) {
            setLastNameIncorrect(true);
            setError('Please provide non empty surname');
            measurement(secondNameRef);
            return false;
        }
        if (!password) {
            setPassIncorrect(true);
            setError('Please provide non empty password');
            measurement(passwordRef);
            return false;
        }
        if (password.length < 6) {
            setPassIncorrect(true);
            setError('Please provide more secure password');
            measurement(passwordRef);
            return false;
        }
        if (!confirmPassword) {
            setConfirmPassIncorrect(true);
            setError('Please provide non empty confirm password');
            measurement(passwordConfirmRef);
            return false;
        }
        if (password !== confirmPassword) {
            setConfirmPassIncorrect(true);
            setError('The confirm password do not match');
            measurement(passwordConfirmRef);
            return false;
        }
        if (!email) {
            setEmailIncorrect(true);
            setError('Please provide non empty email address');
            measurement(emailRef);
            return false;
        }
        if (email) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email) === false) {
                setEmailIncorrect(true);
                setError('Please provide correct email address');
                measurement(emailRef);
                return false;
            }
        }
        setFirstNameIncorrect(false);
        setLastNameIncorrect(false);
        setPassIncorrect(false);
        setConfirmPassIncorrect(false);
        setEmailIncorrect(false);
        return true;
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                keyboardShouldPersistTaps={'handled'}
                ref={scrollView}
                style={styles.container}>
                <View style={styles.createAccountTextContainer}>
                    <Text style={styles.createText}>CREATE</Text>
                    <Text style={styles.accountText}>ACCOUNT</Text>
                </View>
                <View style={styles.registerBarContainer}>
                    <View style={styles.registerBarTitleContainer}>
                        <Text style={styles.registerBarTitle}>Main Account Info</Text>
                        <Text style={styles.registerBarText}>(required)</Text>
                    </View>
                </View>
                <View style={styles.mainRegisterContainer}>
                    <View style={styles.registerFieldsContainer}>
                        <DefaultInput
                            placeholderText="Your first name"
                            inputValue={firstName}
                            ref={firstNameRef}
                            onChangeText={setFirstName}
                            keyboardType={'email-address'}
                            onFocus={() => console.log('error')}
                            image={AvatarImage}
                            incorrectInput={firstNameIncorrect}
                            error={error} />
                        <DefaultInput
                            placeholderText="Your last name"
                            inputValue={lastName}
                            ref={secondNameRef}
                            onChangeText={setLastName}
                            keyboardType={'email-address'}
                            onFocus={() => console.log('error')}
                            image={AvatarImage}
                            incorrectInput={lastNameIncorrect}
                            error={error} />
                        <DefaultInput
                            placeholderText="Password"
                            inputValue={password}
                            ref={passwordRef}
                            onChangeText={setPassword}
                            password={true}
                            onFocus={() => console.log('error')}
                            image={PasswordImage}
                            incorrectInput={passIncorrect}
                            error={error} />
                        <DefaultInput
                            placeholderText="Confirm password"
                            inputValue={confirmPassword}
                            ref={passwordConfirmRef}
                            onChangeText={setConfirmPassword}
                            password={true}
                            onFocus={() => console.log('error')}
                            image={PasswordImage}
                            incorrectInput={confirmPassIncorrect}
                            error={error} />
                        <DefaultInput
                            placeholderText="Your e-mail address"
                            ref={emailRef}
                            inputValue={email}
                            onChangeText={setEmail}
                            keyboardType={'email-address'}
                            onFocus={() => console.log('error')}
                            image={EmailImage}
                            incorrectInput={emailIncorrect}
                            error={error} />
                    </View>
                </View>
                <View style={styles.registerBarContainer}>
                    <View style={styles.registerBarTitleContainer}>
                        <Text style={styles.registerBarTitle}>Optional Account Info</Text>
                        <Text style={styles.registerBarText}>(optional)</Text>
                    </View>
                </View>
                <View style={styles.mainRegisterContainerLessOpacity}>
                    <View style={styles.registerFieldsContainer}>
                        <CustomePicker
                            title={'Select fuels'}
                            incorrectInput={false}
                            onPick={setFuels}
                            data={GASOLINE_TYPES}
                            multiple={true}
                            fuel={true}
                            isDisabled={false}
                            selectedValues={fuels}
                        />
                        <CustomePicker
                            title={'Select prefered gasstations'}
                            incorrectInput={false}
                            onPick={setPetrolStations}
                            data={GASSTATIONS}
                            multiple={true}
                            isDisabled={false}
                            selectedValues={petrolStations}
                        />
                    </View>
                </View>
                <View style={styles.registerBarContainer}>
                    <TextButton
                        btnText={'CREATE ACCOUNT'}
                        btnTextStyle={styles.btnTextCreateAccount}
                        btnStyle={styles.btnContainerCreateAccount}
                        onBtnPress={onRegisterPress} />
                </View>
                <View style={styles.footer} />
            </ScrollView >
        </View>

    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: globalStyles.backgroundGrey,
        paddingHorizontal: '1.5rem',
    },
    createAccountTextContainer: {
        width: '100%',
        paddingTop: '3rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    createText: {
        color: globalStyles.darkBlue,
        fontFamily: globalStyles.fontPoppinsRegular,
        fontSize: '6rem',
    },
    accountText: {
        color: globalStyles.darkGreen,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '6rem',
        marginTop: '-3rem',
    },
    registerBarContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingVertical: '2rem',
    },
    registerBarTitle: {
        color: globalStyles.darkGrey,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '2.4rem',
    },
    registerBarText: {
        color: globalStyles.darkGrey,
        fontFamily: globalStyles.fontPoppinsRegular,
        fontSize: '2.4rem',
        marginLeft: '0.5rem',
    },
    registerBarTitleContainer: {
        width: '92%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    mainRegisterContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    mainRegisterContainerLessOpacity: {
        width: '100%',
        flexDirection: 'row',
    },
    registerFieldsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    avatarImage: {
        width: '16rem',
        height: '16rem',
        borderRadius: '8rem',
        resizeMode: 'cover',
    },
    btnTextCreateAccount: {
        color: globalStyles.white,
        fontFamily: globalStyles.fontPoppinsBold,
        fontSize: '2.4rem',
    },
    btnContainerCreateAccount: {
        width: '90%',
        backgroundColor: globalStyles.darkGreen,
        paddingHorizontal: '2rem',
        paddingVertical: '1rem',
        borderRadius: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        height: '10rem',
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        getGasstations: () => dispatch(getGasstations()),
    };
};

export default connect(null, mapDispatchToProps)(RegisterScreen);
