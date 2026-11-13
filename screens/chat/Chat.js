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

const mergeMessages = (current, incoming) => {
  const messagesById = new Map(current.map((message, index) => [
    message.id ? `id:${message.id}` : `existing:${index}`,
    message,
  ]));

  incoming.forEach((message, index) => {
    const key = message.id ? `id:${message.id}` : `incoming:${index}`;
    if (!messagesById.has(key)) {
      messagesById.set(key, message);
    }
  });

  return Array.from(messagesById.values());
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [adminId, setAdminId] = useState(null);
  const { account } = useContext(AccountContext);
  const flatListRef = useRef();

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const id = await messagesApi.getAdminId();
        setAdminId(id);
      } catch (error) {
        console.error("Failed to fetch admin id:", error.response ? error.response.data : error.message);
      }
    };

    fetchAdminId();
  }, []);

  useEffect(() => {
    if (!account?.id) return;

    const joinRoom = () => socket.emit("joinRoom", { userId: account.id });
    socket.on("connect", joinRoom);
    if (socket.connected) joinRoom();

    return () => socket.off("connect", joinRoom);
  }, [account?.id]);

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      if (
        newMessage.receiverId === account?.id &&
        newMessage.senderId !== account?.id
      ) {
        const incomingMessage = {
            ...newMessage,
            text: newMessage.content,
            senderRole: newMessage.senderId === adminId ? "admin" : newMessage.senderRole,
          };
        setMessages((prevMessages) => mergeMessages(prevMessages, [incomingMessage]));
        scrollToEnd();
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [account?.id, adminId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (account?.id && adminId) {
          const response = await messagesApi.getMessages(account.id, adminId);
          const messageData = response.data.map((msg) => ({
            ...msg,
            text: msg.content,
          }));
          setMessages((prevMessages) => mergeMessages(prevMessages, messageData));
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error.response ? error.response.data : error.message);
      }
    };
    fetchMessages();
  }, [account?.id, adminId]);

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !account?.id || !adminId) {
      if (!adminId) {
        console.warn("Admin isn't ready yet. Please try again later.");
      }
      return;
    }

    const newMessage = {
      content: inputText,
      senderId: account.id,
      receiverId: adminId,
    };

    try {
      const response = await messagesApi.send(newMessage);
      const savedMessage = {
        ...response.data,
        text: response.data.content,
      };
      socket.emit("sendMessage", {
        ...response.data,
        senderId: newMessage.senderId,
        receiverId: newMessage.receiverId,
      });
      setMessages((prevMessages) => mergeMessages(prevMessages, [savedMessage]));

      setInputText("");
      scrollToEnd();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.senderRole === "user" ? styles.userMessage : styles.adminMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.senderRole === "user" && styles.userMessageText,
        ]}
      >
        {item.text || item.content}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90} // Adjust for the header height.
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>PL</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.username}>ProLaptop</Text>
          <Text style={styles.status}>Product advice · Customer support</Text>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => item.id?.toString() || `message-${index}`}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Image
                source={require("../../assets/icons/orderIcons/box.png")}
                style={styles.emptyIcon}
              />
            </View>
            <Text style={styles.emptyTitle}>Hi there!</Text>
            <Text style={styles.emptyDescription}>
              Message ProLaptop if you need help choosing a product.
            </Text>
          </View>
        }
        onContentSizeChange={scrollToEnd}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#9AA5A3"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
          accessibilityRole="button"
          accessibilityLabel="Send message"
          activeOpacity={0.75}
        >
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
    backgroundColor: "#F5F8F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9EFED",
  },
  avatarContainer: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26,
    backgroundColor: "#269E88",
    borderWidth: 3,
    borderColor: "#DDF2EC",
  },
  avatarText: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "#FFFFFF",
  },
  contactDetails: {
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20312D",
  },
  status: {
    marginTop: 3,
    fontSize: 12,
    color: "#4A9A82",
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 22,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  emptyIconContainer: {
    width: 76,
    height: 76,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 38,
    backgroundColor: "#E6F5F1",
    marginBottom: 16,
  },
  emptyIcon: {
    width: 42,
    height: 42,
    resizeMode: "contain",
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#20312D",
    marginBottom: 7,
  },
  emptyDescription: {
    maxWidth: 280,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    color: "#74817E",
  },
  messageContainer: {
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 11,
    marginVertical: 5,
    maxWidth: "82%",
  },
  userMessage: {
    backgroundColor: "#269E88",
    alignSelf: "flex-end",
    borderBottomRightRadius: 5,
  },
  adminMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#E7EEEB",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#263631",
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 14 : 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9EFED",
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 110,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: "#F2F6F4",
    fontSize: 16,
    color: "#263631",
  },
  sendButton: {
    width: 44,
    height: 44,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#269E88",
  },
  sendButtonDisabled: {
    backgroundColor: "#AFCFC7",
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
});
