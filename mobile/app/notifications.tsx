import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../lib/api";


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

    const res = await api.get("/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications(res.data);
  };

  const openNotification = async (notif: any) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    // mark as read
    if (!notif.isRead) {
      await api.patch(
        `/notifications/${notif._id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    // redirect based on type
    if (notif.type === "order_confirmed")
      router.replace("/moreceive");

    if (notif.type === "order_received")
      router.replace("/mocompleted");

    if (notif.type === "order_cancelled")
      router.replace("/mocancelled");
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Ionicons name="chevron-back-outline" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <ScrollView>
        {notifications.map((n) => (
          <TouchableOpacity
            key={n._id}
            style={styles.notificationCard}
            onPress={() => openNotification(n)}
          >
            <View style={styles.iconBackground}>
              <Ionicons name="bag-handle-outline" size={26} color="#A02334" />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.notificationText,
                  !n.isRead && styles.unreadText,
                ]}
              >
                {n.message}
              </Text>
              <Text style={styles.timeText}>{timeAgo(n.createdAt)}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {notifications.length === 0 && (
          <Text style={styles.emptyText}>
            No notifications yet
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 0.3,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
    flex: 1,
    textAlign: "center",
    marginRight: 30,
  },
  scrollView: {
    paddingVertical: 10,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconContainer: {
    marginRight: 10,
  },
  iconBackground: {
    backgroundColor: "#F2E6E8",
    borderRadius: 50,
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14.5,
    color: "#111",
    marginBottom: 5,
  },
  timeText: {
    fontSize: 12,
    color: "#888",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  unreadText: {
    fontWeight: "700",
  }
});

export default Notifications;