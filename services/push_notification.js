import {Permissions, Notifications} from 'expo';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const PUSH_ENDPOINT = 'https://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    debugger
    let previousToken = await AsyncStorage.getItem('pushtoken');
    debugger
    if(previousToken){
        debugger
        return;
    }
    else {
        debugger
        let {status} = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

        if(status !== 'granted'){
            return;
        }

        let token = await Notifications.getExponentPushTokenAsync();
        await axios.post(PUSH_ENDPOINT, {token: {token}});
        AsyncStorage.setItem('pushtoken', token)
    }
}
