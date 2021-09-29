import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


export default function TextButton(props) {

    const { btnText, btnStyle, onBtnPress, btnTextStyle } = props;
    return (
        <TouchableOpacity style={btnStyle} onPress={() => onBtnPress()}>
            <Text style={btnTextStyle}>{btnText}</Text>
        </TouchableOpacity>
    );
}



