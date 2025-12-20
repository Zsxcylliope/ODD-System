import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../lib/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from "expo-router";


const AddressSelection = () => {
  const router = useRouter();

  const [addresses, setAddresses] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const fetchAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const res = await api.get("/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddresses(res.data);
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Address Selection</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.sectionTitle}>Addresses</Text>

        {addresses.map((item) => (
          <View key={item._id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <View style={styles.addressLeft}>
                <Text style={styles.addressName}>{item.fullname}</Text>
              </View>
              <TouchableOpacity onPress={() => router.push({ pathname: "/address/edit", params: { id: item._id } })}>
                <Text style={styles.editText}>EDIT</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.phoneText}>(+63) {item.phone}</Text>
            <Text style={styles.addressText}>
              {item.street}, {item.barangay}{"\n"}
              {item.city}, {item.province}, {item.region}
            </Text>

            <View style={styles.addressFooter}>
              {item.isDefault ? (
                <TouchableOpacity style={styles.defaultTag}>
                  <Text style={styles.defaultText}>Default</Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}
              {/* Assuming we might want delete functionality here too, but sticking to UI provided */}
            </View>
          </View>
        ))}

        {/* ADD NEW ADDRESS BUTTON */}
        <TouchableOpacity style={styles.newAddressButton} onPress={() => router.push("/address/edit")}>
          <Ionicons name="add-circle-outline" size={22} color="#A02334" />
          <Text style={styles.newAddressText}>ADD A NEW ADDRESS</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 0.3,
    borderBottomColor: "#ccc",
    marginTop: 25,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    flex: 1,
    textAlign: "center",
    marginRight: 25,
  },
  scrollView: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
    color: "#111",
  },

  // Address Card
  addressCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressName: {
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 6,
  },
  editText: {
    color: "#A02334",
    fontWeight: "600",
    fontSize: 13,
  },
  phoneText: {
    fontSize: 13,
    marginTop: 4,
    color: "#333",
  },
  addressText: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
    lineHeight: 18,
  },
  addressFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  defaultTag: {
    backgroundColor: "#A02334",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  defaultText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "#A02334",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  deleteText: {
    color: "#A02334",
    fontSize: 12,
    fontWeight: "600",
  },

  // Add new address
  newAddressButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A02334",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  newAddressText: {
    color: "#A02334",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },
});
