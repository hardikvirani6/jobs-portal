import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends React.Component {
    componentDidMount(){
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props){
        if(props.token){
            this.props.navigation.navigate('map');
        }
    }

   render() {
        return (
            <View style={styles.container}>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

mapStateToProps = ({auth}) => {
    return {token: auth.token};
};

export default connect(mapStateToProps, actions)(AuthScreen);