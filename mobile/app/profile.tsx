import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import Navbar from "./navbar"; 

const Profile = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/images/centrum.png')} 
          style={styles.profileImage} 
        />
        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>Zumaan</Text>
            <Ionicons name="create-outline" size={18} color="#fff" style={{ marginLeft: 5 }} />
          </View>
          <Text style={styles.userId}>ID 845289347</Text>
        </View>
      </View>

      {/* My Orders Section */}
      <View style={styles.orderContainer}>
        <Text style={styles.orderTitle}>My Order</Text>

        <View style={styles.orderRow}>
          {/* Cart */}
          <TouchableOpacity onPress={() => router.replace('/cart')} style={styles.iconContainer}>
            <Ionicons name="cart-outline" size={28} color="#A02334" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>0</Text>
            </View>
            <Text style={styles.iconLabel}>Cart</Text>
          </TouchableOpacity>

          {/* Ship */}
          <TouchableOpacity onPress={() => router.replace('/moreceive')} style={styles.iconContainer}>
            <Ionicons name="car-outline" size={28} color="#A02334" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
            <Text style={styles.iconLabel}>Ship</Text>
          </TouchableOpacity>

          {/* Receive */}
          <TouchableOpacity onPress={() => router.replace('/mocompleted')} style={styles.iconContainer}>
            <Ionicons name="cube-outline" size={28} color="#A02334" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
            <Text style={styles.iconLabel}>Receive</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/')}>
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
    marginBottom: 10,
    paddingLeft: 10,
  },
  userInfo: {
    alignItems: "center",
    marginLeft: 15,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
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
