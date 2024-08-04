import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'


export default function profile() {
  return (
    <View style={styles.container}>
    <ImageBackground style={styles.background} source={require('../../assets/images/profileBackground.png')} >
    </ImageBackground>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    profile: {
        width: '100%',
        flex: 2.6,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
})