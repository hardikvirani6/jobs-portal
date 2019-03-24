import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {MapView} from 'expo';
import {Card, Button, Icon} from "react-native-elements";
import Swipe from '../components/Swipe';

class DeckScreen extends React.Component {

    static navigationOptions= {
        title: 'Jobs',
        tabBarIcon: ({ tintColor }) => (
            <Icon size={30} name="description" color={tintColor} />
        ),
    };

    renderCard(job){
        const InitialRegion = {
            latitude: job.latitude,
            longitude: job.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
        };

        return(
            <Card title={job.jobtitle} >
                <View style={{height: 200,}}>
                    <MapView scrollEnabled={false}
                             style={{flex:1,}}
                             cacheEnabled={Platform.OS === 'android' ? true : false}
                             initialRegion={InitialRegion}
                    >
                    </MapView>
                </View>
                <View style={styles.DetailWrappers}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>

                <Text>
                    {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                </Text>
            </Card>
        )
    }

    renderNoMoreCards = () => {
        return(
            <Card title="No more jobs" >
                <Button title="Back To Map"
                        icon={{name: 'my-location'}}
                        large onPress={() => this.props.navigation.navigate('map')}
                        backgroundColor="#03A9F4" />
            </Card>
        )
    }

    render() {
        return (
            <View style={{marginTop:10}}>
                <Swipe data={this.props.jobs}
                       renderCard={this.renderCard}
                       renderNoMoreCards={this.renderNoMoreCards}
                       keyProp="jobkey"
                       onSwipeRight={job => this.props.likeJob(job)}
                />
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
    DetailWrappers: {
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10,
        marginTop:10
    }
});

mapStateToProps = ({ jobs }) => {
    return {jobs: jobs.results};
};

export default connect(mapStateToProps, actions)(DeckScreen);