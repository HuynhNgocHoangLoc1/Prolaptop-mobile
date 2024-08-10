import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

export default function LaptopItem(props) {
    const {item} = props;
    // console.log(item);
  return (
    <TouchableOpacity style={styles.container}>
       <Image source={{uri : item.imageUrl}} style={styles.img}/>
    </TouchableOpacity>  
  )
}

const styles = StyleSheet.create({
    container : {
        
    },
    img : {
        width : 200,
        height : 200
    }
})