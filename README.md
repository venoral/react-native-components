# react-native-swipe-del

## Demo


## Introduction

This component is based on reactNative generation, the aim is to provide the ability to swipe left and delete item, with a good animation effect.

## Installation

Run `npm install --save react-native-swipe-del`.


# Usage

Example code:

```JavaScript
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, AppRegistry, Alert } from 'react-native';
import { SwipeDel } from 'react-native-swipe-del';

class Demo extends Component {
    
    render() {
        return (
            <SwipeDel style={{marginTop: 20}} handleDelete={() => {
                Alert.alert('Alert Title', null,[
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                ]);
            }}>
                {/*内容content*/}
                <View style={styles.itemWrap}>
                    <Text style={styles.itemText}>item content</Text> 
                </View>
            </SwipeDel>
        );
    }
}

const styles = StyleSheet.create({
    itemWrap: {
        backgroundColor: '#FFF5DB',
        alignItems: 'center',
        paddingVertical: 40
    },
    itemText: {
        color: '#9D7618'
    }
});


AppRegistry.registerComponent('Demo', () => Demo);

```