import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello, nice to meet you !', sender: 'admin' },
    { id: '2', text: 'Hi', sender: 'user' },
    { id: '3', text: 'How are you?', sender: 'user' },
    { id: '4', text: "I'm good and how about you?", sender: 'admin' },
  ]);
  
  const [inputText, setInputText] = useState('');

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.adminMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with avatar */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
        <Image source={require('../../assets/icons/orderIcons/box.png')} style={styles.avatar} />
        <Text style={styles.username}>Admin</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
      />

      {/* Input field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Image source={require('../../assets/icons/funtion/send.png')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    alignItems: 'center',
},
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
},
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  username: {
    marginLeft: 10,
    fontSize: 29,
    fontWeight: 'bold',
    marginRight: 12,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column-reverse',
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-end',
  },
  adminMessage: {
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
  sendIcon: {
    width: 30,
    height: 30,
  },
});
