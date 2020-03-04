import React, { useState } from 'react';

import { ScrollView, KeyboardAvoidingView, Linking, AsyncStorage } from 'react-native';
import AREATouchableOpacity from '../../Components/AREATouchableOpacity/AREATouchableOpacity';


function Option({ navigation }) {
    const [statusGitHub, setStatusGitHub] = useState('#FF0000');
    const [statusTrello, setStatusTrello] = useState('#FF0000');
    const [statusSlack, setStatusSlack] = useState('#FF0000');
    const [statusTwitch, setStatusTwitch] = useState('#FF0000');
    const [statusYammer, setStatusYammer] = useState('#FF0000');
    const [statusFacebook, setStatusFacebook] = useState('#FF0000');

    function githubConnect() {
        if (statusGitHub == '#00FF00')
            setStatusGitHub('#FF0000');
        else
            setStatusGitHub('#00FF00');
    }
    function trelloConnect() {
        if (statusTrello == '#00FF00')
            setStatusTrello('#FF0000');
        else
            setStatusTrello('#00FF00');
    }
    function SlackConnect() {
        if (statusSlack == '#00FF00')
            setStatusSlack('#FF0000');
        else
            setStatusSlack('#00FF00');
    }
    function TwitchConnect() {
        if (statusTwitch == '#00FF00')
            setStatusTwitch('#FF0000');
        else
            setStatusTwitch('#00FF00');
    }
    function YammerConnect() {
        if (statusYammer == '#00FF00')
            setStatusYammer('#FF0000');
        else
            setStatusYammer('#00FF00');
    }
    function FacebookConnect() {
        if (statusFacebook == '#00FF00')
            setStatusFacebook('#FF0000');
        else
            setStatusFacebook('#00FF00');
    }

    function Disconnect() {
        AsyncStorage.clear();
        navigation.navigate('HomeScreen');
    }

    return (
        <ScrollView>
            <AREATouchableOpacity
                text={'Connect to GitHub'}
                alignSelf={'stretch'}
                backgroundColor={statusGitHub}
                borderRadius={20}
                marginRight={10}
                marginLeft={10}
                marginTop={50}
                padding={5}
                paddingLeft={10}
                fontSize={20}
                fontWeight={'bold'}
                color={'#ffffff'}
                textAlign={'center'}
                onPress={() => githubConnect()}
            />

            <AREATouchableOpacity
                text={'Connect to Trello'}
                alignSelf={'stretch'}
                backgroundColor={statusTrello}
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
                onPress={() => trelloConnect()}
            />

            <AREATouchableOpacity
                text={'Connect to Trello'}
                alignSelf={'stretch'}
                backgroundColor={statusSlack}
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
                onPress={() => SlackConnect()}
            />

            <AREATouchableOpacity
                text={'Connect to Twitch'}
                alignSelf={'stretch'}
                backgroundColor={statusTwitch}
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
                onPress={() => TwitchConnect()}
            />
            <AREATouchableOpacity
                text={'Connect to Yammer'}
                alignSelf={'stretch'}
                backgroundColor={statusYammer}
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
                onPress={() => YammerConnect()}
            />
            <AREATouchableOpacity
                text={'Connect to Facebook'}
                alignSelf={'stretch'}
                backgroundColor={statusFacebook}
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
                onPress={() => FacebookConnect()}
            />

            <AREATouchableOpacity
                text={'Disconnect AREA'}
                alignSelf={'stretch'}
                backgroundColor={'#FFA500'}
                borderRadius={20}
                marginRight={10}
                marginLeft={10}
                marginTop={70}
                padding={5}
                paddingLeft={10}
                fontSize={20}
                fontWeight={'bold'}
                color={'#ffffff'}
                textAlign={'center'}
                onPress={() => Disconnect()}
            />
        </ScrollView>
    );
}

export default Option;