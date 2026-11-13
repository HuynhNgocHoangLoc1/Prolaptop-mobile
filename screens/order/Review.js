import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ReviewApi from '../../repositories/reviewApi';
import { useRoute } from '@react-navigation/native';

const Review = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const route = useRoute();

  const handleRating = (value) => {
    setRating(value);
  };
  const { productId, id } = route.params;
//   console.log(productId, orderId);

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      Alert.alert("Error", "Please provide a rating and comment.");
      return;
    }
    const reviewData = {
      comment: comment,
      rating: rating,
      productId: productId,
      orderDetailId: id
    };
    // console.log(reviewData);

    try {
      const response = await ReviewApi.reviewProduct(reviewData);
    //   console.log(response);
      Alert.alert("Success", "Review submitted successfully!");
      setComment('');
      setRating(0);
    } catch (error) {
      Alert.alert("Error", "Failed to submit review.");
      console.error("Review submission error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Comment:</Text>
      <TextInput
        style={styles.input}
        multiline
        value={comment}
        onChangeText={setComment}
        placeholder="Leave a comment..."
      />

      <Text style={styles.question}>How did you like this item?</Text>

      <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }, (_, index) => (
          <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
            <FontAwesome
              name={rating > index ? 'star' : 'star-o'}
              size={32}
              color="#000"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    height: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Review;
