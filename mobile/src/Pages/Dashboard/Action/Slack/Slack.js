import React, { useState, AsyncStorage } from 'react';
import AREATouchableOpacity from '../../../../Components/AREATouchableOpacity/AREATouchableOpacity';
import AREAInput from '../../../../Components/AREAInput/AREAInput';
import AREAText from '../../../../Components/AREAText/AREAText';
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import axios from 'react-native-axios';
import Config from '../../../../../config.json'

function Slack({ navigation }) {
    const [mess, setMess] = useState();
    const [conv, setConv] = useState();

    const addr = Config.address;
    function createConv() {
        axios.post(`${addr}/action/slack/create`, {
            token: localStorage.getItem("slack-token"),
            name: conv
        })
            .then(function (response) {
                Alert.alert('Creating Conversation', `Success: ${response.data}`, [{ text: 'OK' }])
                console.log(response);
            })
            .catch(function (error) {
                Alert.alert('Creating Conversation', `${error}`, [{ text: 'OK' }])
                console.log(error);
            });
    };
    function sendingMessage() {
        axios.post(`${addr}/action/slack/send`, {
            token: localStorage.getItem("slack-token"),
            name: conv,
            message: mess
        })
            .then(function (response) {
                Alert.alert('Sending message to Conversation', `Success: ${response.data}`, [{ text: 'OK' }])
                console.log(response);
            })
            .catch(function (error) {
                Alert.alert('Sending message to Conversation', `${error}`, [{ text: 'OK' }])
                console.log(error);
            });
    }

    return(
    <ScrollView>
    <AREAInput
        placeholder={'Message'}
        underlineColorAndroid={'transparent'}
        alignSelf={'stretch'}
        backgroundColor={'#e5e5e5'}
        borderRadius={20}
        margin={10}
        marginTop={10}
        padding={5}
        paddingLeft={10}
        fontSize={20}
        fontWeight={'bold'}
        onChange={setMess}
        secure={false}
      />
      <AREAInput
        placeholder={'Conversation Name'}
        underlineColorAndroid={'transparent'}
        alignSelf={'stretch'}
        backgroundColor={'#e5e5e5'}
        borderRadius={20}
        margin={10}
        marginTop={10}
        padding={5}
        paddingLeft={10}
        fontSize={20}
        fontWeight={'bold'}
        onChange={setConv}
        secure={false}
      />
      <AREATouchableOpacity
        text={'Create Conv'}
        alignSelf={'stretch'}
        backgroundColor={'#808000'}
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
        onPress={() => createConv()}
      />
      <AREATouchableOpacity
        text={'Send message to the conv'}
        alignSelf={'stretch'}
        backgroundColor={'#808000'}
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
        onPress={() => sendingMessage()}
      />
      </ScrollView>
    );
}

export default Slack;