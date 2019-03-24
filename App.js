import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {Provider, } from 'react-redux';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingScreen';
import ReviewScreen from './screens/ReviewScreen';
import store from './store';
import registerNotification from './services/push_notification';
import Expo, { Notifications} from 'expo';

class App extends Component {
    componentDidMount(){
        debugger
        registerNotification();
        debugger
        Notifications.addListener((notification) => {
            const {data: {text}, origin} = notification;

            if(origin === 'received' && text) {
                Alert.alert(
                    'New Push Notification',
                    text,
                    [{text: 'Ok.'}]
                );
            }
        });
    }

  render() {
      const MainNavigation = TabNavigator({
          welcome: {screen: WelcomeScreen},
          auth: {screen: AuthScreen},
          main: {
              screen: TabNavigator({
                  map: {screen: MapScreen},
                  deck: {screen: DeckScreen},
                  review: {
                      screen: StackNavigator({
                          review: {screen: ReviewScreen},
                          settings: {screen: SettingScreen}
                      })
                  }
              }, {
                  tabBarPosition: 'bottom',
                  tabBarOptions: {
                      labelStyle: {fontSize:12}
                  }
              })
          }
      }, {
          navigationOptions: {
              tabBarVisible: false
          },
          lazyLoad: true
      });

      return (
          <Provider store={store}>
              <MainNavigation/>
          </Provider>
    );
  }
}

export default App;