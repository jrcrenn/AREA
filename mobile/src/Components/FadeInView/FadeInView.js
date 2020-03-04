import React, {useEffect} from 'react';
import {Animated} from 'react-native';

function FadeInView(props) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      duration: props.duration,
      toValue: 1,
      delay: props.delay,
    }).start();
  });

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
}

export default FadeInView;
