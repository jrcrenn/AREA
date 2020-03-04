import React from 'react';
import AREATouchableOpacity from '../../Components/AREATouchableOpacity/AREATouchableOpacity';
import { ScrollView } from 'react-native';


function Dashboard({ navigation }) {


    return (
        <ScrollView>
            <AREATouchableOpacity
                text={'Do something with GitHub'}
                alignSelf={'stretch'}
                backgroundColor={'#00FFFF'}
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
                onPress={() => navigation.navigate('Github')}
            />
            <AREATouchableOpacity
                text={'Do something with Trello'}
                alignSelf={'stretch'}
                backgroundColor={'#00FFFF'}
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
                onPress={() => navigation.navigate('Trello')}
            />
            <AREATouchableOpacity
                text={'Do something with Slack'}
                alignSelf={'stretch'}
                backgroundColor={'#00FFFF'}
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
                onPress={() => navigation.navigate('Slack')}
            />
            <AREATouchableOpacity
                text={'Option'}
                alignSelf={'stretch'}
                backgroundColor={'#0000ff'}
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
                onPress={() => navigation.navigate('Option')}
            />
        </ScrollView>
    );
}

export default Dashboard;