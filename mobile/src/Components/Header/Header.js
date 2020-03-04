import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import FadeInView from '../FadeInView/FadeInView';

function Header(props) {
  const Styles = StyleSheet.create({
    header: {
      flexDirection: props.flexDirection,
      justifyContent: props.justifyContent,
    },
    logoServices: {
      width: props.width,
      height: props.height,
    },
  });

  return (
    <View>
      <View style={Styles.header}>
        <FadeInView duration={props.duration} delay={props.delay[0]}>
          <Image style={Styles.logoServices} source={props.firstLogo} />
        </FadeInView>
        <FadeInView duration={props.duration} delay={props.delay[1]}>
          <Image style={Styles.logoServices} source={props.secondLogo} />
        </FadeInView>
      </View>
      <View style={Styles.header}>
        <FadeInView duration={props.duration} delay={props.delay[2]}>
          <Image style={Styles.logoServices} source={props.thirdLogo} />
        </FadeInView>
      </View>
    </View>
  );
}

export default Header;
