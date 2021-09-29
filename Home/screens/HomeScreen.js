/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import globalStyles from '../../globalStyles';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import Header from '../../Common/components/UI/Header';
import { getNews } from '../actions/trips';
import HomeBottomNavigation from '../components/HomeBottomNavigation';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


function HomeScreen(props) {

    const [account, setAcc] = useState(null);

    AsyncStorage.getItem('ivan.gachmov@gmail.com').then(email => {
        const acc = JSON.parse(email);
        setAcc(acc);
    });

    useEffect(() => {
        props.getNews('lpg');
        props.getNews('gasoline');
    }, []);


    return (
        <View style={styles.container}>
            <Header navigation={props.navigation} isFirstPage={true} />
            <FlatList
                data={props.news}
                style={styles.homeList}
                keyExtractor={(item, index) => 'key' + item.id + index}
                renderItem={({ item, index }) => (
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}>
                        <View>
                            <Text>{moment(item.date).format('MMM Do YY')}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{item.text}</Text>
                        </View>
                    </View>
                )} />
            <HomeBottomNavigation
                userImage={props.user ? props.user.image : null}
                buttonId={0}
                navigation={props.navigation} />
        </View>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        getNews: (fuel) => dispatch(getNews(fuel)),

    };
};

const mapStateToProps = (state) => {
    return {
        news: state.news.news,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: globalStyles.backgroundGrey,
        zIndex: 0,
    },
    homeList: {
        paddingBottom: '3rem',
        backgroundColor: globalStyles.backgroundGrey,
    },
});


