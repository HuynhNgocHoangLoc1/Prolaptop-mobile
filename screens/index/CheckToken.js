import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import mailApi from '../../repositories/mailApi';

export default function CheckToken() {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params; 
    const [otp, setOtp] = useState(['', '', '', '']); 
    const inputRefs = useRef([]); // Sử dụng useRef để lưu trữ các tham chiếu đến các input

    const handleConfirm = async () => {
        const otpCode = otp.join(''); // Chuyển mảng thành chuỗi

        try {
            const response = await mailApi.confirmMail({ email, otp: otpCode }); // Gửi email và otp
            // console.log(response.data);
            Alert.alert("Success", "OTP verified successfully.");
            navigation.navigate('ChangePassword', { email }); // Điều hướng đến trang đổi mật khẩu
        } catch (error) {
            console.error('Error details:', error); // Log the entire error
            Alert.alert("Error", error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    // Hàm xử lý khi người dùng nhập OTP
    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Tự động chuyển đến trường tiếp theo nếu người dùng nhập ký tự
        if (value && index < otp.length - 1) {
            const nextInputRef = inputRefs.current[index + 1]; // Lấy tham chiếu của trường tiếp theo
            if (nextInputRef) {
                nextInputRef.focus(); // Gọi phương thức focus
            }
        }

        // Nếu người dùng xóa ký tự, tự động chuyển về trường trước
        if (!value && index > 0) {
            const prevInputRef = inputRefs.current[index - 1];
            if (prevInputRef) {
                prevInputRef.focus(); // Gọi phương thức focus
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                {/* Back Icon here if needed */}
            </TouchableOpacity>
            <Text style={styles.title}>Confirm OTP</Text>
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        maxLength={1}
                        keyboardType="numeric"
                        value={digit}
                        onChangeText={(value) => handleOtpChange(index, value)}
                        ref={ref => inputRefs.current[index] = ref} // Gán ref cho từng trường
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: colors.dark_blu, 
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    otpInput: {
        width: 50,
        height: 50,
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
    },
    confirmButton: {
        backgroundColor: colors.dark_blu, 
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
