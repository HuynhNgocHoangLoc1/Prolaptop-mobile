import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

export default function Slider() {
    const slides = [
        {
            key: 'slide1',
            title: 'Slide 1',
            text: 'Description for slide 1',
            img: require('../../assets/slide/2.png'),
        },
        {
            key: 'slide2',
            title: 'Slide 2',
            text: 'Description for slide 2',
            img: require('../../assets/slide/4.png'),
        }
    ];

    const renderSlides = ({ item }) => {
        return (
            <View style={styles.slideContainer}>
                <Image source={item.img} style={styles.img} />
            </View>
            
        );
    };

    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderSlides}
            showNextButton={true}
            showDoneButton={true}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
        />
    );
}

const styles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: 146,
    },
    dotStyle: {
        backgroundColor: 'lightgray',
        width: 4,
        height: 4,
        borderRadius: 5,
        marginHorizontal: 4,
        marginTop: 20,
    },
    activeDotStyle: {
        backgroundColor: 'blue',
        width: 6,
        height: 6,
        borderRadius: 7,
        marginHorizontal: 4,
        marginTop: 20,
    },
});
