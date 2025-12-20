import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "http://192.168.100.11:3000/api";

const timeAgo = (date: string) => {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const Notifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);

  const loadNotifications = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    const res = await axios.get(`${API_BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications(res.data);
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 5000); // 🔥 REAL-TIME
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/home")} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <ScrollView>
        {notifications.map((n) => (
          <View key={n._id} style={styles.notificationCard}>
            <View style={styles.iconBackground}>
              <Ionicons name="bag-handle-outline" size={26} color="#A02334" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.notificationText}>{n.message}</Text>
              <Text style={styles.timeText}>{timeAgo(n.createdAt)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
    flex: 1,
    textAlign: "center",
    marginRight: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 0.3,
    borderBottomColor: '#ccc',
    marginTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  arrow: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  
  scrollView: {
    paddingVertical: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    marginRight: 10,
  },
  iconBackground: {
    backgroundColor: '#F2E6E8',
    borderRadius: 50,
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14.5,
    color: '#111111',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 12,
    color: '#888888',
  },
});

export default Notifications;
