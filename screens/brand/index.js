import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import fakeData from '../../fakeData/Data.json';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const products = fakeData.product && fakeData.product.length > 0 ? fakeData.product : [];

export default function Brand() {
    const navigation = useNavigation();

    const handleClickCategories = (item) => {
        navigation.navigate('ProductDetail', { productItem: item });
    }
   
    return (
        <ScrollView contentContainerStyle={styles.grid}>
            {products.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.productContainer} 
                    onPress={() => handleClickCategories(item)}
                >
                    <View style={styles.product}>
                        <Image style={styles.image} source={{ uri: item.imageUrl }} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>${item.price}</Text>
                        <Text 
                            style={{
                                backgroundColor: item.stockQuantity === 0 ? colors.warning : item.stockQuantity === 1 ? colors.success : colors.green,
                                fontWeight: '700',
                                color: colors.white,
                                width: 90,
                                textAlign: 'center',
                                borderRadius: 20,
                                marginBottom: 8,
                                paddingVertical: 4,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {item.stockQuantity === 0 ? 'sold out' : item.stockQuantity === 1 ? 'On going' : 'in stock'}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    productContainer: {
        width: '48%', // Ensures two items per row with some spacing
        marginBottom: 15,
    },
    product: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 16,
        color: 'red',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
    },
});
