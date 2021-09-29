/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import globalStyles from '../../../globalStyles';
import ArrowDown from '../../../assets/arrow_down.png';
import Modal from 'react-native-modal';
import MultipleSelectContainer from './MultipleSelectContainer';
import ClearImg from '../../../assets/clear.png';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
const CustomePicker = React.forwardRef((props, ref) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const prevShown = usePrevious({ showModal, setShowModal });
    const [multipleValues, setMultipleValues] = useState([]);
    const { title, style, onPick, data, selectedValues, fuel } = props;
    const pickerContainer = [styles.pickerContainer];
    const pickerText = [styles.pickerText];
    const errorContainerStyle = [styles.errorContainer];
    const dataToShow = [];

    useEffect(() => {
        if (!multipleValues || (multipleValues && multipleValues.length === 0)) {
            setMultipleValues(selectedValues);
        }
    }, [props.selectedValues]);

    useEffect(() => {
        if (prevShown && prevShown.showModal && !showModal) {
            onPick(multipleValues);
        }
        if (multipleValues && multipleValues.length != 0 && !selectedValue) {
            let newValue = multipleValues[0].name;
            if (multipleValues.length > 1) {
                for (let index = 1; index < multipleValues.length; index++) {
                    newValue = newValue + ', ' + multipleValues[index].name;
                }
            }
            setSelectedValue(newValue);
        }
    }, [multipleValues, showModal, selectedValue]);


    useEffect(() => {
        if (!selectedValue || selectedValue !== props.selectedValue) {
            setSelectedValue(props.selectedValue);
        }
    }, [props.selectedValue]);

    if (data) {
        data.forEach(value => {
            dataToShow.push(value.name);
        });
    }
    if (style) {
        pickerContainer.push(style);
        errorContainerStyle.push(style);
    }

    const onAddToMultipleValues = (value) => {
        if (multipleValues) {
            const index = multipleValues.findIndex(t => t.id === value.id);
            if (index === -1) {
                setMultipleValues(multipleValues => [...multipleValues, value]);
            } else {
                setMultipleValues(multipleValues => multipleValues.filter(e => e !== value));
            }
        } else {
            const multipleValuesCopy = [];
            multipleValuesCopy.push(value);
            setMultipleValues(multipleValuesCopy);

        }
    };


    function findCommonElements2(arr1, arr2) {
        if (arr2) {
            for (let index = 0; index < arr2.length; index++) {
                if (arr1.name === arr2[index].name) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }



    return (
        <View style={pickerContainer} ref={ref}>
            <TouchableOpacity style={styles.pickerContainer2} onPress={() => setShowModal(!showModal)}>
                <View style={styles.pickerTextContainer}>
                    <Text numberOfLines={1} style={pickerText}>{selectedValue ? selectedValue : title}</Text>
                </View>
                <View style={styles.btnImageContainer}>
                    <Image source={ArrowDown} style={styles.btnImage} />
                </View>
            </TouchableOpacity>

            <Modal isVisible={showModal}
                customBackdrop={
                    <TouchableWithoutFeedback onPress={() => setShowModal(!showModal)}>
                        <View style={{ flex: 1, backgroundColor: globalStyles.grey }} />
                    </TouchableWithoutFeedback>
                }>
                <View style={styles.mainContainer}>
                    <View style={styles.alertContainer}>
                        <View style={styles.titleContainer}>
                            <View style={styles.titleTextContainer}>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                            <TouchableOpacity style={styles.clearContainer} onPress={() => setShowModal(!showModal)}>
                                <Image source={ClearImg} style={styles.clearImg} />
                            </TouchableOpacity>
                        </View>
                        {fuel ?
                            <FlatList
                                data={data}
                                multipleValues={multipleValues}
                                contentContainerStyle={styles.matchesContainer}
                                keyExtractor={(item, index) => 'key' + index}
                                renderItem={({ item, index }) => (
                                    <MultipleSelectContainer {...item}
                                        onAddToMultipleValues={() => onAddToMultipleValues(item)}
                                        showImage={multipleValues && multipleValues.includes(item)}
                                    />
                                )} /> :
                            <FlatList
                                data={data}
                                multipleValues={multipleValues}
                                contentContainerStyle={styles.matchesContainer}
                                keyExtractor={(item, index) => 'key' + index}
                                renderItem={({ item, index }) => (
                                    <MultipleSelectContainer {...item}
                                        onAddToMultipleValues={() => onAddToMultipleValues(item)}
                                        showImage={multipleValues.includes(item) || findCommonElements2(item, selectedValues)}
                                    />
                                )} />}
                    </View>
                </View>
            </Modal>
        </View>);

});


export default CustomePicker;

const styles = EStyleSheet.create({
    nameText: {
        color: globalStyles.grey,
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
    pickerText: {
        color: globalStyles.grey,
        fontFamily: globalStyles.fontPoppinsMedium,
        fontSize: '2.4rem',
    },
    pickerContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '1rem',
        paddingVertical: '2rem',
    },
    pickerContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: globalStyles.backgroundGrey,
        height: '8rem',
        marginVertical: '1rem',
        borderWidth: 1,
        borderColor: globalStyles.grey,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '2rem',
    },
    btnImageContainer: {
        width: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnImage: {
        height: '2rem',
        width: '3.5rem',
        resizeMode: 'contain',
    },
    pickerTextContainer: {
        paddingLeft: '1rem',
        width: '95%',
    },
    errorContainer: {
        width: '100%',
        backgroundColor: globalStyles.errorBackground,
        paddingRight: '1.5rem',
        paddingLeft: '3rem',
    },
    errorText: {
        color: globalStyles.error,
        fontFamily: globalStyles.fontUbuntuMedium,
        fontSize: '1.8rem',
    },


    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: '2rem',
    },
    alertContainer: {
        width: '100%',
        maxHeight: '95%',
        paddingVertical: '2rem',
        borderRadius: '0.5rem',
        backgroundColor: globalStyles.backgroundGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '1rem',
    },
    title: {
        color: globalStyles.darkBlue,
        fontSize: '2.4rem',
        fontFamily: globalStyles.fontFamilyBold,
    },
    matchesContainer: {
        paddingTop: '2rem',
    },
    crownContainer: {
        width: '10%',
    },
    titleTextContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearContainer: {
        width: '10%',
    },
    crownImg: {
        height: '2rem',
        width: '3rem',
        resizeMode: 'contain',
    },
    clearImg: {
        height: '1.5rem',
        width: '1.5rem',
        resizeMode: 'contain',
    },

});
