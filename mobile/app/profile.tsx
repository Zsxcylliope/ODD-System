import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../lib/api";
import Navbar from "./navbar";

type User = {
  _id: string;
  fullname: string;
  userCode: string;
  profileImage: string;
  email: string;
};

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        router.replace("/");
        return;
      }

      const res = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.error("PROFILE FETCH ERROR:", error);
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#A02334" />
      </SafeAreaView>
    );
  }

  if (!user) return null;

  // ✅ Normalize avatar (SVG → PNG fallback safe)
  const avatarUri = user.profileImage
    ? user.profileImage.replace("/svg", "/png")
    : `https://api.dicebear.com/7.x/avataaars/png?seed=${user.email}`;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: avatarUri }} style={styles.profileImage} />

        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{user.fullname}</Text>

            <TouchableOpacity
              onPress={() => router.push("/edit-profile")}
              style={styles.editBtn}
            >
              <Ionicons name="create-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userId}>ID {user.userCode}</Text>
        </View>
      </View>

      {/* My Orders */}
      <View style={styles.orderContainer}>
        <Text style={styles.orderTitle}>My Order</Text>

        <View style={styles.orderRow}>
          <TouchableOpacity
            onPress={() => router.replace("/cart")}
            style={styles.iconContainer}
          >
            <Ionicons name="cart-outline" size={28} color="#A02334" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>0</Text>
            </View>
            <Text style={styles.iconLabel}>Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/moreceive")}
            style={styles.iconContainer}
          >
            <Ionicons name="car-outline" size={28} color="#A02334" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
            <Text style={styles.iconLabel}>Ship</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/mocompleted")}
            style={styles.iconContainer}
          >
            <Ionicons name="cube-outline" size={28} color="#A02334" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
            <Text style={styles.iconLabel}>Receive</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          await AsyncStorage.removeItem("token");
          router.replace("/");
        }}
      >
        <Ionicons name="log-out-outline" size={20} color="#A02334" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Navbar />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingTop: 80,
    paddingLeft: 20,
    flexDirection: "row",
    backgroundColor: "#A02334",
    paddingVertical: 30,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userInfo: {
    marginLeft: 15,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  editBtn: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  userId: {
    color: "#fff",
    fontSize: 13,
    marginTop: 2,
    opacity: 0.8,
  },
  orderContainer: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 15,
  },
  orderTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  iconContainer: {
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -10,
    top: -6,
    backgroundColor: "#A02334",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  iconLabel: {
    color: "#000",
    fontSize: 13,
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#A02334",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 100,
    marginTop: 40,
  },
  logoutText: {
    color: "#A02334",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});