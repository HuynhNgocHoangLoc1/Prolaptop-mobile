import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import messagesApi from "../../repositories/messageApi";
import AccountContext from "../../contexts/AccountContext";
import { io } from "socket.io-client";

const socket = io("https://prolaptop-server.onrender.com", { transports: ["websocket"] });

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const { account } = useContext(AccountContext);
  const admin = "2dfd0de0-f0b8-42c0-8fe6-1e9d3ace3be0";
  const flatListRef = useRef();

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      if (newMessage.receiverId === account.id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToEnd();
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (account.id) {
          const response = await messagesApi.getMessages(account.id);
          const messageData = response.data.map((msg) => ({
            ...msg,
            text: msg.content,
          }));
          setMessages(messageData);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error.response ? error.response.data : error.message);
      }
    };
    fetchMessages();
  }, [account.id]);

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = {
        content: inputText,
        senderId: account.id,
        receiverId: admin,
      };
  
      try {
        // Call API để gửi tin nhắn
        await messagesApi.send(newMessage);
  
        // Gửi tin nhắn qua socket
        socket.emit("sendMessage", newMessage);
  
        // Cập nhật giao diện với tin nhắn mới
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...newMessage, id: Date.now().toString(), senderRole: "user" },
        ]);
  
        setInputText(""); // Reset input text
        scrollToEnd(); // Cuộn xuống cuối danh sách tin nhắn
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };
  

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.senderRole === "user" ? styles.userMessage : styles.adminMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text || item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90} // Điều chỉnh theo chiều cao header của bạn
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/icons/orderIcons/box.png")}
            style={styles.avatar}
          />
          <Text style={styles.username}>Admin</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        onContentSizeChange={scrollToEnd}
      />

      {/* Input field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={inputText}
          onChangeText={setInputText}
          autoFocus={true} // Focus tự động vào ô nhập khi mở chat
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Image
            source={require("../../assets/icons/funtion/send.png")}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    alignItems: "center",
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
  },
  username: {
    marginLeft: 10,
    fontSize: 29,
    fontWeight: "bold",
    marginRight: 12,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#32CD32",
    alignSelf: "flex-end",
  },
  adminMessage: {
    backgroundColor: "#ccc",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
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
