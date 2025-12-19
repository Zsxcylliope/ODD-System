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

const Notifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
  let mounted = true;

  const loadNotifications = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token || !mounted) return;

    // 1️⃣ Fetch notifications (critical)
    try {
      const res = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (mounted) {
        setNotifications(res.data);
      }
    } catch (err) {
      console.log("Notification fetch error:", err);
    }

    // 2️⃣ Mark all as read (NON-CRITICAL, DO NOT await)
    api
      .patch(
        "/notifications/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(() => {
        // intentionally swallowed
      });
  };

  loadNotifications();

  return () => {
    mounted = false;
  };
}, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Ionicons name="chevron-back-outline" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {notifications.map((item) => (
          <View key={item._id} style={styles.notificationCard}>
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Ionicons
                  name="bag-handle-outline"
                  size={28}
                  color="#A02334"
                />
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.notificationText}>
                {item.message}
              </Text>
              <Text style={styles.timeText}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>
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
});

export default Notifications;