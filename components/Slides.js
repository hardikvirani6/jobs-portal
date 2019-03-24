import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {Button, } from 'react-native-elements';
const {width, height} = Dimensions.get('window');

class Slides extends Component {
    renderSlides(){
        return this.props.data.map((slide, index) => {
            return(
                <View key={slide.text} style={[styles.slideStyle, {backgroundColor: slide.color}]}>
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlide(index)}
                </View>
            );
        })
    }

    renderLastSlide(index){
        if(index === this.props.data.length - 1){
            return(
                <Button title="Onwards!" onPress={this.props.onComplete} buttonStyle={styles.buttonStyle}></Button>
            )
        }
    }

    render(){
        return(
          <ScrollView horizontal style={{flex:1, }} pagingEnabled>
              {this.renderSlides()}
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    slideStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width
    },
    textStyle:{
        fontSize: 30,
        color: 'white',
    },
    buttonStyle: {
        marginTop:15,
        backgroundColor:'#0288D1'
    }
});

export default Slides;