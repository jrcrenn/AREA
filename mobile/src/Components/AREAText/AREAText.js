import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function AREAText(props) {
  const Styles = StyleSheet.create({
    container: {
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
      alignSelf: props.alignSelf,
    },
    text: {
      fontWeight: props.fontWeight,
      fontSize: props.fontSize,
    },
  });

  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>{props.text}</Text>
    </View>
  );
}

export default AREAText;
