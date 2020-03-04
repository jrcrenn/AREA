import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import FadeInView from '../FadeInView/FadeInView';

function AnimatedImage(props) {
  const Styles = StyleSheet.create({
    logo: {
      width: props.width,
      height: props.height,
    },
    logoContainer: {
      position: props.position,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
      alignSelf: props.alignSelf,
      top: props.top,
    },
  });

  return (
    <View style={Styles.logoContainer}>
      <FadeInView duration={props.duration} delay={props.delay}>
        <Image style={Styles.logo} source={props.image} />
      </FadeInView>
    </View>
  );
}

export default AnimatedImage;
