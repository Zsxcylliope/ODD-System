import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../lib/api";
import Navbar from "./navbar";
import * as ImagePicker from "expo-image-picker";
import { useCart } from "../lib/CartContext";

type User = {
  _id: string;
  fullname: string;
  userCode: string;
  profileImage: string;
  email: string;
  profileCompleted: boolean;
  phone?: string;
  region?: string;
  province?: string;
  city?: string;
};

export default function Profile() {
  const router = useRouter();
  const { cart } = useCart();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);

  const [shipCount, setShipCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    region: "",
    province: "",
    city: "",
  });

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return router.replace("/");

      // Fetch Profile
      const profileRes = await api.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(profileRes.data);
      setProfileCompleted(profileRes.data.profileCompleted);

      setForm({
        fullname: profileRes.data.fullname ?? "",
        phone: profileRes.data.phone ?? "",
        region: profileRes.data.region ?? "",
        province: profileRes.data.province ?? "",
        city: profileRes.data.city ?? "",
      });

      // Fetch Orders for Badges
      const ordersRes = await api.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orders = ordersRes.data;
      setShipCount(orders.filter((o: any) => o.status === "to_receive").length);
      setCompletedCount(orders.filter((o: any) => o.status === "completed").length);

    } catch {
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  /* ================= SAVE PROFILE ================= */
  const handleSaveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      await api.patch("/users/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfileCompleted(true);
      setShowEditModal(false);
      fetchData();
    } catch {
      Alert.alert("Error", "Failed to save profile");
    }
  };

  /* ================= IMAGE UPLOAD (FIXED) ================= */
  const pickAndUploadImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission required");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const asset = result.assets[0];

      const formData = new FormData();
      formData.append("image", {
        uri: asset.uri,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);

      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      // ✅ FIX: Use fetch instead of axios for file uploads to avoid Network Error
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/profile-image`, {
        method: "PATCH",
        body: formData, // fetch automatically sets Content-Type to multipart/form-data with boundary
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type here
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();

      setProfileCompleted(true);
      fetchData();
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      Alert.alert("Upload failed", (err as any).message);
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

  const avatarUri = user.profileImage
    ? user.profileImage
    : `https://api.dicebear.com/7.x/avataaars/png?seed=${user.email}`;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Profile Image", "Choose action", [
              { text: "Edit", onPress: pickAndUploadImage },
              { text: "Cancel", style: "cancel" },
            ])
          }
        >
          <Image source={{ uri: avatarUri }} style={styles.profileImage} />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{user.fullname}</Text>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setShowEditModal(true)}
            >
              <Ionicons name="create-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userId}>ID {user.userCode}</Text>
        </View>
      </View>

      <View style={styles.orderContainer}>
        <Text style={styles.orderTitle}>My Order</Text>

        <View style={styles.orderRow}>
          {/* Cart */}
          <TouchableOpacity onPress={() => router.replace('/cart')} style={styles.iconContainer}>
            <Ionicons name="cart-outline" size={28} color="#A02334" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
            <Text style={styles.iconLabel}>Cart</Text>
          </TouchableOpacity>

          {/* Ship */}
          <TouchableOpacity onPress={() => router.replace('/moreceive')} style={styles.iconContainer}>
            <Ionicons name="car-outline" size={28} color="#A02334" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{shipCount}</Text>
            </View>
            <Text style={styles.iconLabel}>Ship</Text>
          </TouchableOpacity>

          {/* Receive */}
          <TouchableOpacity onPress={() => router.replace('/mocompleted')} style={styles.iconContainer}>
            <Ionicons name="cube-outline" size={28} color="#A02334" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{completedCount}</Text>
            </View>
            <Text style={styles.iconLabel}>Completed</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          if (!profileCompleted) {
            Alert.alert(
              "Complete Profile Required",
              "You must save your profile before logging out."
            );
            return;
          }
          await AsyncStorage.removeItem("token");
          router.replace("/");
        }}
      >
        <Ionicons name="log-out-outline" size={20} color="#A02334" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* EDIT MODAL */}
      <Modal visible={showEditModal} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowEditModal(false)}
        >
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            {[
              { key: "fullname", label: "Full Name" },
              { key: "phone", label: "Phone Number" },
              { key: "region", label: "Region" },
              { key: "province", label: "Province" },
              { key: "city", label: "City / Municipality" },
            ].map((item) => (
              <View key={item.key} style={styles.inputContainer}>
                <Text style={styles.credentials}>{item.label}</Text>
                <TextInput
                  style={styles.input}
                  value={(form as any)[item.key]}
                  onChangeText={(v) =>
                    setForm((p) => ({ ...p, [item.key]: v }))
                  }
                />
              </View>
            ))}

            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <Navbar />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

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

  userInfo: { marginLeft: 15 },
  nameRow: { flexDirection: "row", alignItems: "center" },
  editBtn: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  userName: { color: "#fff", fontSize: 20, fontWeight: "700" },
  userId: { color: "#fff", fontSize: 13, opacity: 0.8 },

  logoutButton: {
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: { fontSize: 22, fontWeight: "700", marginBottom: 15 },
  inputContainer: { marginBottom: 12 },
  credentials: { fontWeight: "600", marginBottom: 5 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 12,
  },

  saveBtn: {
    backgroundColor: "#EE002D",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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

  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});