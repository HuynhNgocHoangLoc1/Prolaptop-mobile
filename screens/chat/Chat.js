import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import messagesApi from "../../repositories/messageApi";
import AccountContext from "../../contexts/AccountContext";
import { io } from "socket.io-client";

const socket = io("https://prolaptop-server.onrender.com", { transports: ['websocket'] });
export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const { account, token } = useContext(AccountContext);
  const admin = "1d9c91b5-404c-4e26-9ba8-ed571a037cb1";
  const flatListRef = useRef();

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      if (newMessage.receiverId === account.id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToEnd(); // Cuộn xuống cuối khi nhận tin nhắn mới
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
          scrollToEnd(); // Cuộn xuống cuối khi tải tin nhắn từ API
        }
      } catch (error) {
        console.error(
          "Failed to fetch messages:",
          error.response ? error.response.data : error.message
        );
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
        socket.emit("sendMessage", newMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...newMessage, id: Date.now().toString(), senderRole: "user" },
        ]);
        setInputText("");
        scrollToEnd(); // Cuộn xuống cuối sau khi gửi tin nhắn
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
    <View style={styles.container}>
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
        onContentSizeChange={scrollToEnd} // Cuộn xuống cuối khi nội dung thay đổi
      />

      {/* Input field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Image
            source={require("../../assets/icons/funtion/send.png")}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: "#98FB98", // Màu xanh lá cây
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
