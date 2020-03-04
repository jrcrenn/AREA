import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

function AREATouchable(props) {
  const Styles = StyleSheet.create({
    container: {
      alignSelf: props.alignSelf,
      backgroundColor: props.backgroundColor,
      borderRadius: props.borderRadius,
      marginRight: props.marginRight,
      marginLeft: props.marginLeft,
      marginTop: props.marginTop,
      padding: props.padding,
      paddingLeft: props.paddingLeft,
    },
    text: {
      fontSize: props.fontSize,
      fontWeight: props.fontWeight,
      color: props.color,
      textAlign: props.textAlign,
    },
  });
  return (
    <View>
      <TouchableOpacity style={Styles.container} onPress={props.onPress}>
        <Text style={Styles.text}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AREATouchable;
