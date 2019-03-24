import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import {connect} from 'react-redux';
import {MapView} from 'expo';
import {clearLikedJobs} from '../actions';
import { Button} from "react-native-elements";

class SettingScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return{
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 24 : 0,
            }
        }
    };

    render() {
        return (
            <View>
                <Button title="Reset Liked Jobs!"
                        large icon={{name: 'delete-forever'}}
                        onPress={this.props.clearLikedJobs}
                        backgroundColor="#F44336" />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});


export default connect(null, {clearLikedJobs})(SettingScreen);