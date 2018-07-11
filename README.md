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
import { View, Text } from 'react-native';
import { SwipeDel } from 'react-native-swipe-del';

class Demo extends Component {
    render() {
        return (
            <SwipeDel handleDelete={() => console.log('delete')}>
                {/*内容content*/}
                <View style={{backgroundColor: 'pink', height: 100}}>
                    <Text>item内容</Text> 
                </View>
            </SwipeDel>
        );
    }
}

AppRegistry.registerComponent('Demo', () => Demo);

```