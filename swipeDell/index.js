/**
 * @author venoral
 * @description 侧滑删除组件
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PanResponder, Animated } from 'react-native';

const DURATION = 300;
const DEFAULT_OFFSET = 0;
const DEL_BTN_WIDTH = 80;
const MAX_OFFSET = 150;
const EASING_COEFFICIENT = 0.3;

export default class SwipeDel extends Component {
    constructor(props) {
        super(props);
        this._previousOffset = DEFAULT_OFFSET; // 先前偏移量
        this.state = {
            currentOffset: new Animated.Value(this._previousOffset) // 当前偏移量
        };
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onMoveShouldSetPanResponder:(e, gestureState) => true,    
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
            onShouldBlockNativeResponder: (evt, gestureState) => false
        });
    }

    _handlePanResponderMove(evt, gestureState) {
        const dx = Math.abs(gestureState.dx);
        this.props.shouldParentEnable && this.props.shouldParentEnable(dx); // 可选项（父组件ScrollView是否响应滚动事件）
        let nowOffset = -this._previousOffset + gestureState.dx;
        nowOffset = nowOffset > DEFAULT_OFFSET ? DEFAULT_OFFSET : nowOffset; // 禁止右滑超出屏幕
        if (nowOffset < -MAX_OFFSET) { // 缓动拉伸
            nowOffset = (nowOffset - (-MAX_OFFSET)) * EASING_COEFFICIENT + (-MAX_OFFSET)
        }
        this.state.currentOffset.setValue(-nowOffset);
    }

    _handlePanResponderEnd(evt, gestureState) {
        const offset = this.state.currentOffset._value;
        if (Math.abs(offset) <= DEL_BTN_WIDTH) { // 偏移距离<=删除按钮宽度（关闭）
            this._previousOffset = DEFAULT_OFFSET;
        } else { // 偏移距离>删除按钮宽度（打开）
            this._previousOffset = DEL_BTN_WIDTH;          
        }
        
        this._animateTo(this._previousOffset);
    }

    _animateTo(toValue, duration = DURATION) {
        Animated.spring(this.state.currentOffset, {
            toValue,
            duration
        }).start();
    }

    _handleDelete() {
        this.props.handleDelete && this.props.handleDelete();
    }

    getLowerRender() {
        const { currentOffset } = this.state;

        return (<View style={styles.swipeLower}>
            <Animated.View style={[styles.swipeLowerRight, {width: currentOffset}]}>
                <TouchableOpacity style={[styles.delTextContainer]} onPress={this._handleDelete.bind(this)}>
                    <Text style={styles.delText} numberOfLines={1}>delete</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>);
    }

    render() {
        const { currentOffset } = this.state;
        
        return (
            <View style={[styles.swipeContainer, this.props.style]}>
                {/*隐藏在下层的View*/}
                { this.getLowerRender() }
                {/*覆盖在上层的View*/}
                <Animated.View style={[{right: currentOffset}]} {...this._panResponder.panHandlers}>
                    {this.props.children}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    swipeContainer: {
        width: '100%',
        overflow: 'hidden'
    },
    swipeLower: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        ...StyleSheet.absoluteFillObject
    },
    swipeLowerRight: {
        backgroundColor: '#FF5555'
    },
    swipeUpper: {
        
    },
    delTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    delText: {
        color: '#fff'
    }
});