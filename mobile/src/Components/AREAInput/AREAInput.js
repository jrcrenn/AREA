import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

function AREAInput(props) {
  const Styles = StyleSheet.create({
    container: {
      alignSelf: props.alignSelf,
      backgroundColor: props.backgroundColor,
      borderRadius: props.borderRadius,
      margin: props.margin,
      marginTop: props.marginTop,
      padding: props.padding,
      paddingLeft: props.paddingLeft,
      fontSize: props.fontSize,
      fontWeight: props.fontWeight,
    },
  });

  return (
    <View>
      <TextInput
        secureTextEntry={props.secure}
        style={Styles.container}
        placeholder={props.placeholder}
        underlineColorAndroid={props.underlineColorAndroid}
        onChangeText={text => props.onChange(text)}
      />
    </View>
  );
}

export default AREAInput;
