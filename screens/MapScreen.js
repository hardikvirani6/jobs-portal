import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {MapView} from 'expo';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {Button, Icon} from "react-native-elements";
import * as Progress from 'react-native-progress';

class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
        tabBarIcon: ({ tintColor }) => (
            <Icon size={30} name="my-location" color={tintColor} />
        ),
    };

    state = {
        mapLoaded: false,
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09,
        },
        progress: 0,
        indeterminate: true,
    };

    componentDidMount(){
        this.setState({mapLoaded:true})
    }

    onRegionChangeComplete = (region) => {
        console.log('region',region);
        this.setState({region});
    };

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, ()  => {
            this.props.navigation.navigate('deck');
        });
    };

    render() {
        if(!this.state.mapLoaded){
            return(
                <View style={{flex:1, justifyContent:'center'}}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <MapView region={this.state.region} style={styles.container}
                         onRegionChangeComplete={this.onRegionChangeComplete} />
                <View style={styles.btnContainer}>
                    <Button large title="Search this area"
                            backgroundColor="#009688"
                            icon={{name:'search'}}
                            onPress={this.onButtonPress}
                    />
                </View>
                {/*<Progress.Circle progress={0.1} size={100} />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnContainer: {
        bottom:20,
        position:'absolute',
        left:0,
        right:0
    },

    circles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    proggress: {
        margin: 10,
    },
});

mapStateToProps = ({auth}) => {
    return {token: auth.token};
};

export default connect(mapStateToProps, actions)(MapScreen);