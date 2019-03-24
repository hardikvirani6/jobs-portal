import React from 'react';
import { StyleSheet, Text, View, Platform, Dimensions, ScrollView, Linking } from 'react-native';
import {Button, Icon, Card} from 'react-native-elements';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {MapView} from 'expo';

class ReviewScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return{
            title: 'Review Jobs',
            tabBarIcon: ({ tintColor }) => (
                <Icon size={30} name="favorite" color={tintColor} />
            ),
            headerRight: <Icon size={30} name="settings" color="rgba(0,122,255,1)" onPress={() => { navigation.navigate('settings') }}></Icon>,
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 24 : 0,
                marginRight:10
            }
            }
        };

    renderLikedJobs(){
        return this.props.likedJobs.map(job => {
            const {company, formattedRelativeTime, url, latitude, longitude, jobtitle, jobkey } = job;

            const InitialRegion = {
                latitude,
                longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04
            };

            return(
              <Card title={jobtitle} key={jobkey}>
                  <View style={{height:150}}>
                      <MapView scrollEnabled={false}
                               style={{flex:1,}}
                               cacheEnabled={Platform.OS === 'android' ? true : false}
                               initialRegion={InitialRegion}
                      >
                      </MapView>
                      <View style={styles.DetailWrappers}>
                          <Text style={{fontStyle:'italic'}}>{company}</Text>
                          <Text style={{fontStyle:'italic'}}>{formattedRelativeTime}</Text>
                      </View>
                      <Button title="Apply Now!"
                              backgroundColor="#03A9F4"
                              onPress={() => {Linking.openURL(url)}} />
                  </View>
              </Card>
            );
        })
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
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


mapStateToProps = (state) => {
    return {likedJobs: state.likedJobs};
};

export default connect(mapStateToProps, actions)(ReviewScreen);