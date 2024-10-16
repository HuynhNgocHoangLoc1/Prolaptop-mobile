import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../../constants/colors';
import PaymentMethodEnum from '../../constants/PaymentMethodEnum';

export default function PaymentMethod() {
  const navigation = useNavigation();
  // Sử dụng enum thay vì chuỗi trực tiếp
  const [selectedMethod, setSelectedMethod] = useState(PaymentMethodEnum.CASHONDELIVERY);

  const paymentMethods = [PaymentMethodEnum.CASHONDELIVERY, PaymentMethodEnum.ZALOPAY];

  const router = useRoute();
  const { selectedItems, totalPrice } = router.params;
  const handleNext = () => {
    // console.log(selectedItems, totalPrice, selectedMethod);
    navigation.navigate('ConfirmInformation', { selectedItems, totalPrice, paymentMethod: selectedMethod });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment method</Text>
      <Text style={styles.subtitle}>Select one of the payment methods</Text>
      {paymentMethods.map((method, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.paymentOption,
            selectedMethod === method && styles.selectedOption,
          ]}
          onPress={() => setSelectedMethod(method)}
        >
          <View style={styles.radioCircle}>
            {selectedMethod === method && <View style={styles.selectedRb} />}
          </View>
          <Text style={styles.paymentText}>{method}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#d1d1d1',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6e44ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6e44ff',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    marginTop: 'auto',
    backgroundColor: colors.dark_blu,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
},
});
