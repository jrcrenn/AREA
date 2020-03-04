import React, {useState, AsyncStorage} from 'react';
import {ScrollView, KeyboardAvoidingView} from 'react-native';
import AREATouchableOpacity from '../../Components/AREATouchableOpacity/AREATouchableOpacity';
import AREAInput from '../../Components/AREAInput/AREAInput';
import axios from 'react-native-axios';
import shittyQs from 'shitty-qs';

import config from '../../../config.json';

function Login({navigation}) {
  const [email, setEmail] = useState('clement.scherpereel@epitech.eu');
  const [password, setPassword] = useState('toto');
  const [authToken, setAuthToken] = useState('');


  async function setTokenRegister() {
      await AsyncStorage.setItem("AreaToken", authToken);
  }


  const addr = config.address + config.login;
   function login () {
    data = {
      email: email,
      password: password
    };
    console.log(addr);
    console.log(data);

  axios.post(addr, data,
      {
        "headers": {
          'Content-Type': 'application/json',
        }})
    .then(function (response) {
      console.log(response.data.authToken, "token");
      setAuthToken(response.data.authToken);
      // await AsyncStorage.setItem('authToken', response.data.authToken);
      setTokenRegister();
      navigation.navigate('Dashboard');
    })
    .catch(error => console.log(error));
    ;
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={'position'} enabled>
        <AREAInput
          placeholder={'Email'}
          underlineColorAndroid={'transparent'}
          alignSelf={'stretch'}
          backgroundColor={'#e5e5e5'}
          borderRadius={20}
          margin={10}
          marginTop={50}
          padding={5}
          paddingLeft={10}
          fontSize={20}
          fontWeight={'bold'}
          onChange={setEmail}
          secure={false}
        />
        <AREAInput
          placeholder={'Password'}
          underlineColorAndroid={'transparent'}
          alignSelf={'stretch'}
          backgroundColor={'#e5e5e5'}
          borderRadius={20}
          margin={10}
          marginTop={0}
          padding={5}
          paddingLeft={10}
          fontSize={20}
          fontWeight={'bold'}
          onChange={setPassword}
          secure={true}
        />
        <AREATouchableOpacity
          text={'Login'}
          alignSelf={'stretch'}
          backgroundColor={'#ff0000'}
          borderRadius={20}
          marginRight={10}
          marginLeft={10}
          marginTop={10}
          padding={5}
          paddingLeft={10}
          fontSize={20}
          fontWeight={'bold'}
          color={'#ffffff'}
          textAlign={'center'}
          onPress={() => login()}
        />
        <AREATouchableOpacity
          text={'Register'}
          alignSelf={'stretch'}
          backgroundColor={'#ff0000'}
          borderRadius={20}
          marginRight={10}
          marginLeft={10}
          marginTop={10}
          padding={5}
          paddingLeft={10}
          fontSize={20}
          fontWeight={'bold'}
          color={'#ffffff'}
          textAlign={'center'}
          onPress={() => navigation.navigate('Register')}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Login;
