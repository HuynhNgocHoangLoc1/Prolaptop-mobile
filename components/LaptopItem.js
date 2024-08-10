import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

export default function LaptopItem(props) {
    const { item } = props;
    
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={{ uri: item.imageUrl }} style={styles.img} />
            <View style={styles.main}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={{
                    backgroundColor: item.stockQuantity == 0 ? colors.warning : item.stockQuantity == 1 ? colors.success : colors.green,
                    fontWeight: '700',
                    color: colors.white,
                    width: 90,
                    textAlign: 'center',
                    borderRadius: 20,
                    marginBottom: 8,
                    paddingVertical: 4,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {item.stockQuantity == 0 ? 'sold out' : item.stockQuantity == 1 ? 'On going' : 'in stock'}
                </Text>
                <View style={styles.details}>
                    <View style={styles.price}>
                        <Image source={require('../assets/icons/ui-elements/coin.png')} style={styles.coin} />
                        <Text style={{ color: colors.text }}>{item.price}</Text>
                    </View>
                    <View style={styles.chip}>
                        <Image source={require('../assets/icons/ui-elements/chip.png')} style={styles.cpu} />
                        <Text style={{ color: colors.text }}>{item.chip}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: 10,
        flexDirection: "row",
        marginVertical: 7,
        borderColor: colors.gray,
        borderWidth: 1.4,
        marginHorizontal: 10,
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
        overflow: "hidden",  
        height: 200, // Allow height to be determined by content
        width: 350
        
    },
    img: {
        width: 110,
        height: 110,
        resizeMode: "cover",
        borderRadius: 10,
        marginRight: 10,
        borderColor: colors.dark_gray,
        borderWidth: 0.5,
    },
    main: {
        backgroundColor: "white",
        flex: 1,
        flexDirection: "column", // Change direction to column
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        color: colors.subText,
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 20
    },
    coin: {
        width: 18,
        height: 18,
        marginEnd: 4,
        tintColor: colors.text
    },
    price: {
        color: colors.subText,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    cpu: {
        width: 28,
        height: 21,
        marginEnd: 4,
        tintColor: colors.text
    },
    chip: {
        color: colors.subText,
        flexDirection: "row",
        alignItems: "center"
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
