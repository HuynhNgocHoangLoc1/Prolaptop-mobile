import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

export default function Slider() {
  const sliderRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Quản lý chỉ số slide hiện tại
  const slides = [
    {
      key: "slide1",
      title: "Slide 1",
      text: "Description for slide 1",
      img: require("../../assets/slide/2.png"),
    },
    {
      key: "slide2",
      title: "Slide 2",
      text: "Description for slide 2",
      img: require("../../assets/slide/4.png"),
    },
  ];

  const renderSlides = ({ item }) => {
    return (
      <View style={styles.slideContainer}>
        <Image source={item.img} style={styles.img} />
      </View>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentSlideIndex + 1) % slides.length;
      setCurrentSlideIndex(nextIndex); // Cập nhật chỉ số slide hiện tại
      sliderRef.current?.goToSlide(nextIndex, true); // Chuyển sang slide tiếp theo
    }, 3000); // Tự động chuyển slide sau 3 giây

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [currentSlideIndex, slides.length]);

  return (
    <AppIntroSlider
      ref={sliderRef}
      data={slides}
      renderItem={renderSlides}
      showNextButton={true}
      showDoneButton={true}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      onSlideChange={(index) => setCurrentSlideIndex(index)} // Cập nhật chỉ số khi người dùng thay đổi slide
      renderNextButton={() => null} // Ẩn nút Next
      renderDoneButton={() => null} // Ẩn nút Done
    />
  );
}

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "99%",
    height: 180,
  },
  dotStyle: {
    backgroundColor: "lightgray",
    width: 4,
    height: 4,
    borderRadius: 5,
    // marginHorizontal: 4,
  },
  activeDotStyle: {
    backgroundColor: "blue",
    width: 6,
    height: 6,
    borderRadius: 7,
    marginHorizontal: 4,
  },
});
