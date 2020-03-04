import React, { useState, AsyncStorage } from 'react';
import AREATouchableOpacity from '../../../../Components/AREATouchableOpacity/AREATouchableOpacity';
import AREAInput from '../../../../Components/AREAInput/AREAInput';
import AREAText from '../../../../Components/AREAText/AREAText';
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import axios from 'react-native-axios';
import Config from '../../../../../config.json'

function Trello({ navigation }) {
    const [boardName, setBoardName] = useState('');
    const [emailMate, setEmailMate] = useState('');
    const addr = Config.address;

    function createBoard() {
        axios.post(`${addr}/action/trello/board/create`, {
            token: AsyncStorage.getItem("trello-token"),
            name: boardName
        })
            .then(function (response) {
                console.log(response);
                Alert.alert('Creating Board ', `Success: ${response.data}`, [{ text: 'OK' }])
            })
            .catch(function (error) {
                console.log(error);
                Alert.alert('Creating Board ', `${error}`, [{ text: 'OK' }])
            });
    };
    function DeleteBoard() {
        Axios.post(`${addr}/action/trello/board/delete`, {
            token: AsyncStorage.getItem("trello-token"),
            name: boardName
        })
            .then(function (response) {
                Alert.alert('Deleting Board ', `Success: ${response.data}`, [{ text: 'OK' }])
                console.log(response);
            })
            .catch(function (error) {
                Alert.alert('Deleting Board ', `${error}`, [{ text: 'OK' }])
                console.log(error);
            });
    };
    function addingMate() {
        Axios.post(`${addr}/action/trello/user`, {
            token: AsyncStorage.getItem("trello-token"),
            name: boardName,
            user: mateName,
            delete: false
        })
            .then(function (response) {
                Alert.alert('Adding mate to Board ', `Success: ${response.data}`, [{ text: 'OK' }])
                console.log(response);
            })
            .catch(function (error) {
                Alert.alert('Adding mate to Board ', ` ${error}`, [{ text: 'OK' }])
                console.log(error);
            });
    }
    function deletingMate() {
        Axios.post(`${addr}/action/trello/user`, {
            token: AsyncStorage.getItem("trello-token"),
            name: boardName,
            user: mateName,
            delete: true
        })
            .then(function (response) {
                Alert.alert('Deleting mate to Board ', `Success: ${response.data}`, [{ text: 'OK' }])
                console.log(response);
            })
            .catch(function (error) {
                Alert.alert('Deleting mate to Board ', `${error}`, [{ text: 'OK' }])
                console.log(error);
            });
    };


    return(
        <ScrollView>
      <AREAText
        text={"DELETE / CREATE BOARD"}
        justifyContent={'center'}
        alignItems={'center'}
        alignSelf={'center'}
        fontWeight={'bold'}
        fontSize={15}
      />
      <AREAInput
        placeholder={'Name'}
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
        onChange={setBoardName}
        secure={false}
      />
      <AREATouchableOpacity
        text={'Create the board'}
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
        onPress={() => createBoard()}
      />
      <AREATouchableOpacity
        text={'Delete the board'}
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
        onPress={() => DeleteBoard()}
      />
      <AREAText
        text={"INVITE / KICK MATE"}
        justifyContent={'center'}
        alignItems={'center'}
        alignSelf={'center'}
        fontWeight={'bold'}
        marginTop={30} 
        fontSize={15}
      />
      <AREAInput
        placeholder={'Username'}
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
        onChange={setEmailMate}
        secure={false}
      />
      <AREATouchableOpacity
        text={'Invite a mate'}
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
        onPress={() => addingMate()}
      />
      <AREATouchableOpacity
        text={'Kick a mate'}
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
        onPress={() => deletingMate()}
      />
    </ScrollView>
    );
};

export default Trello;