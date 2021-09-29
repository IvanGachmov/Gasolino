/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import globalStyles from '../../globalStyles';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import Header from '../../Common/components/UI/Header';
import { GASOLINE_TYPES } from '../../constants';
import { getPrices } from '../actions/gasolinelist';
import HomeBottomNavigation from '../../Home/components/HomeBottomNavigation';
import moment from 'moment';


function GasolineListScreen(props) {



    useEffect(() => {
        if (props.prices !== null && props.prices.length < 4) {
            GASOLINE_TYPES.map(gasstation => {
                props.getPrices(gasstation.name);
            });
        }

    }, []);

    return (
        <View style={styles.container}>
            <Header navigation={props.navigation} isFirstPage={true} />
            <FlatList
                data={props.prices}
                style={styles.homeList}
                keyExtractor={(item, index) => 'key' + item.id + index}
                renderItem={({ item, index }) => (
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}>
                        <View>
                            <Text>{moment(item.date).format('MMM Do YY')}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Text>{`${item.fuel}: ${item.price} ${item.dimension}`}</Text>
                        </View>
                    </View>
                )} />
            <HomeBottomNavigation
                userImage={props.user ? props.user.image : null}
                buttonId={1}
                navigation={props.navigation} />
        </View>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPrices: (fuel) => dispatch(getPrices(fuel)),

    };
};

const mapStateToProps = (state) => {
    return {
        prices: state.gasolinelist.gasolinePrices,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GasolineListScreen);

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


