import React from 'react';
import {View} from 'react-native';
import FadeInView from '../FadeInView/FadeInView';
import Fade from '../Fade/Fade';

function AnimatedGradient(props) {
  return (
    <View>
      <FadeInView duration={props.duration} delay={props.delay}>
        <Fade
          color={props.upColor}
          height={props.upHeight}
          direction={props.upDirection}>
          <View />
        </Fade>
        <Fade
          color={props.downColor}
          height={props.downHeight}
          direction={props.downDirection}>
          <View />
        </Fade>
      </FadeInView>
    </View>
  );
}

export default AnimatedGradient;
