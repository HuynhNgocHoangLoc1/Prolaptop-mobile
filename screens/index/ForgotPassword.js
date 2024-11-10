import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import mailApi from '../../repositories/mailApi';

export default function ForgotPassword() {
    const navigation = useNavigation();
    const [email, setEmail] = useState(''); 

    const handleNext = async () => {
        try {
            const response = await mailApi.sendMail({ email });
            // console.log(response.data);
    
            Alert.alert("Success", "Please check your email for a reset link.");
            navigation.navigate('CheckToken', { email });
        } catch (error) {
            console.log('Error details:', error);
    
            if (error.response) {
                if (error.response.status === 404) {
                    Alert.alert("Error", "User does not exist.");
                } else if (error.response.status === 500) {
                    Alert.alert("Error", "User does not exist.");
                } else {
                    Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
                }
            } else {
                Alert.alert("Error", "Network error. Please check your connection.");
            }
        }
    };
    

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                {/* Back Icon here if needed */}
            </TouchableOpacity>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address" 
                autoCapitalize="none"
                autoCompleteType="email" 
                textContentType="emailAddress" 
            />
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
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
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#000', 
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 50,
        backgroundColor: '#d3d3d3',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: '#000', 
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        width: '30%',
        alignSelf: "center",
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
