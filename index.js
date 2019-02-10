import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';


export default class HSNZ extends Component {
    constructor(props){
        super(props);
        this.style = this.props.style;
    }
    render(){
        return(
            <View style={this.style}>
                <View>
                    {this.props.children}
                </View>
            </View>
        );
    }
}