import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import images from "../../constants/images";
import UITab from "../../navigation/UITab";


export default function Profile() {
  return (
    <View style={styles.container}>
    <ImageBackground style={styles.background} source={images.profileBackground} >
    </ImageBackground>
    <UITab style={styles.tab} />

    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    background: {
        width: '100%',
        height : 300,    
        flex: 2.6,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
     
})