import React, { useState, useEffect, useContext } from "react";
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

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const { account, token } = useContext(AccountContext);

  console.log("userID: ", account.id);
  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (account.id) {
          const response = await messagesApi.getMessages(account.id);
          const messageData = response.data.map(msg => ({
            ...msg,
            text: msg.content // Map `content` to `text` if needed
          }));
          setMessages(messageData); // Set mapped messages
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

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = {
        content: inputText, // Message text
        senderId: account.id, // Sender ID from account context
        receiverId: "0d9ac0ad-a385-48da-9c2e-f80d16602625", // Fixed receiver ID
      };
  
      try {
        await messagesApi.sendMessage(newMessage);
        // Add the new message to the UI
        setMessages([{ ...newMessage, id: Date.now().toString(), senderRole: 'user' }, ...messages]);
        setInputText(""); // Clear input field after sending
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
      {/* Header with avatar */}
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
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        inverted // Scrolls from the bottom
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
    flexDirection: "column-reverse",
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#e0e0e0",
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
