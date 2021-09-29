/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    View,
    PermissionsAndroid,
    Platform,
    Image,
} from 'react-native';
import globalStyles from '../../globalStyles';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import Header from '../../Common/components/UI/Header';
import HomeBottomNavigation from '../../Home/components/HomeBottomNavigation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { getNearby, getGasstation } from '../actions/gasstations';
import { GASSTATIONS } from '../../constants';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import ModalWithImage from '../../Common/components/UI/ModalWithImage';


function HomeScreen(props) {

    const [pointOfInterest, setPointOfInterest] = useState(null);
    const [isModalShow, setShowModal] = useState(false);

    const [
        currentLongitude,
        setCurrentLongitude,
    ] = useState('...');
    const [
        currentLatitude,
        setCurrentLatitude,
    ] = useState('...');
    const [
        locationStatus,
        setLocationStatus,
    ] = useState('');

    useEffect(() => {
        if (currentLatitude !== '...') {
            if (props.gasstations !== undefined && props.gasstations !== null && props.gasstations.length === 0) {
                props.getNearbyGasstations(42.6977, 23.3219);
            }
        }
    }, [currentLatitude, currentLongitude]);


    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        subscribeLocationLocation();
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
    }, []);

    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                setLocationStatus('You are Here');

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Longitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000,
            },
        );
    };

    const subscribeLocationLocation = () => {
        let watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change

                setLocationStatus('You are Here');
                console.log(position);

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Latitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000,
            },
        );
    };


    const onMarkerPress = (item) => {
        props.getGasstation(item.id);
        setShowModal(true);
    };

    return (
        <View style={styles.container}>
            <Header navigation={props.navigation} isFirstPage={true} />
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    showsUserLocation={true}
                    followUserLocation={true}
                    maxZoomLevel={15}
                    minZoomLevel={15}
                    initialRegion={{
                        latitude: currentLatitude !== '...' ? Number(currentLatitude) : 42.6977,
                        longitude: currentLongitude !== '...' ? Number(currentLongitude) : 23.3219,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <MapViewDirections
                        origin={{ latitude: 42.6977, longitude: 23.3219 }}
                        destination={pointOfInterest ? pointOfInterest : null}
                        apikey={'AIzaSyCc8l-Bz_5kJKyh8BSuQHW2WGZsSJ01V5s'} // insert your API Key here
                        strokeWidth={4}
                        strokeColor={globalStyles.activeGreen}
                    />
                    {props.gasstations ? props.gasstations.map((item, i) =>
                        <Marker
                            key={i}
                            index={i} {...item}
                            coordinate={{
                                latitude: item.lat,
                                longitude: item.lon,
                            }}
                            onPress={() => onMarkerPress(item)}
                            description={'This is a marker in React Natve'}>
                            <Image source={GASSTATIONS.find(function (element) { return element.id === item.brand_id; }) ? GASSTATIONS.find(function (element) { return element.id === item.brand_id; }).image : null} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
                        </Marker>) : null}
                </MapView>
            </View>
            <HomeBottomNavigation
                userImage={props.user ? props.user.image : null}
                buttonId={2}
                navigation={props.navigation} />
            {isModalShow ? <ModalWithImage
                showModalDialog={isModalShow}
                image={props.gasstation ? GASSTATIONS.find(function (element) { return element.id === props.gasstation.brand_id; }) ? GASSTATIONS.find(function (element) { return element.id === props.gasstation.brand_id; }).image : null : null}
                {...props.gasstation}
                onGo={() => setPointOfInterest({ latitude: props.gasstation.lat, longitude: props.gasstation.lon })}
                onPress={() => { props.navigation.pop(); }}
                onShowModalDialog={() => setShowModal(!isModalShow)} /> : null}
        </View>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNearbyGasstations: (lat, lon) => dispatch(getNearby(lat, lon)),
        getGasstation: (id) => dispatch(getGasstation(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        gasstations: state.gasstations.nearbyGasstations,
        gasstation: state.gasstations.gasstation,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = EStyleSheet.create({
    container: {
        height: '92%',
        width: '100%',
    },
    map: {
        flex: 1,
    },
});


