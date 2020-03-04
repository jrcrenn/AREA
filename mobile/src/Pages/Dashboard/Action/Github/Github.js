import React, { useState, AsyncStorage } from 'react';
import AREATouchableOpacity from '../../../../Components/AREATouchableOpacity/AREATouchableOpacity';
import AREAInput from '../../../../Components/AREAInput/AREAInput';
import AREAText from '../../../../Components/AREAText/AREAText';
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import axios from 'react-native-axios';
import Config from '../../../../../config.json'

function Github({ navigation }) {
  const [repo, setRepoName] = useState('');
  const [username, setUserName] = useState('');

  const addr = Config.address;

  function createRepo() {
    axios.post(`${addr}/action/github/create`, {
      // token: AsyncStorage.getItem("github-token"),
      repo: repo
    })
      .then(function (response) {
        console.log(`repo "${repoName}" was created!`);
        console.log(response);
        Alert.alert('Creating Repo', `Success: ${response.data}`, [{ text: 'OK' }])
      })
      .catch(function (error) {
        Alert.alert('Creating Repo', `${error}`, [{ text: 'OK' }])
        console.log(error);
      });
  }

  function deleteRepo() {
    axios.post(`${addr}/action/github/delete`, {
      // token: AsyncStorage.getItem("github-token"),
      repo: repo
    })
      .then(function (response) {
        console.log(`repo "${repoName}" was deleted!`);
        console.log(response);
        Alert.alert('Deleting Repo', `Success: ${response.data}`, [{ text: 'OK' }])
      })
      .catch(function (error) {
        Alert.alert('Deleting Repo', `${error}`, [{ text: 'OK' }])
        console.log(error);
      });
  }

  function inviteUser() {
    axios.post(`${addr}/action/github/invit`, {
      // token: AsyncStorage.getItem("github-token"),
      repo: repo,
      user: username
    })
      .then(function(response) {
        console.log(response);
        Alert.alert('invite contributor', `Success: ${response.data}`, [{ text: 'OK' }])
      })
      .catch(function(error) {
        Alert.alert('adding contributor', ` ${error}`, [{ text: 'OK' }])
        console.log(error);
      });
  };

  function kickUser() {
    axios.post(`${addr}/action/github/kick`, {
      // token: AsyncStorage.getItem("github-token"),
      repo: repo,
      user: username
    })
      .then(function(response) {
        Alert.alert('kicked contributor', `Success: ${response.data}`, [{ text: 'OK' }])
        console.log(response);
      })
      .catch(function(error) {
        Alert.alert('kicked contributor', ` ${error}`, [{ text: 'OK' }])

        console.log(error);
      });
  }

  return (
    <ScrollView>
      <AREAText
        text={"DELETE / CREATE"}
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
        onChange={setRepoName}
        secure={false}
      />
      <AREATouchableOpacity
        text={'Create the repo'}
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
        onPress={() => createRepo()}
      />
      <AREATouchableOpacity
        text={'Delete the repo'}
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
        onPress={() => deleteRepo()}
      />
      <AREAText
        text={"INVITE / KICK"}
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
        onChange={setUserName}
        secure={false}
      />
      <AREATouchableOpacity
        text={'Invite an contributor'}
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
        onPress={() => inviteUser()}
      />
      <AREATouchableOpacity
        text={'Kick a contributor'}
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
        onPress={() => kickUser()}
      />
    </ScrollView>
  );
}

export default Github;