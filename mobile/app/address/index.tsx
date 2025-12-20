import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../lib/api";

type Address = {
  _id: string;
  fullname: string;
  phone: string;
  barangay: string;
  street: string;
  city: string;
  province: string;
  region: string;
  isDefault: boolean;
};

export default function AddressList() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const selectMode = params.select === "true";

  const [addresses, setAddresses] = useState<Address[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const fetchAddresses = async () => {
    const token = await AsyncStorage.getItem("token");
    const res = await api.get("/addresses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAddresses(res.data);
  };

  const deleteAddress = async (id: string) => {
    Alert.alert("Delete Address", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const token = await AsyncStorage.getItem("token");
          await api.delete(`/addresses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          fetchAddresses();
        },
      },
    ]);
  };

  const setAsDefault = async (id: string) => {
    const token = await AsyncStorage.getItem("token");
    await api.put(`/addresses/${id}`, { isDefault: true }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAddresses();
  };

  const selectAddress = (address: Address) => {
    if (!selectMode) return;
    router.replace({
      pathname: "/checkout",
      params: { addressId: address._id },
    });
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

      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.scrollView}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Address</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.addressCard}
            onPress={() => selectAddress(item)}
            activeOpacity={0.8}
          >
            <View style={styles.addressHeader}>
              <View style={styles.addressLeft}>
                <Text style={styles.addressName}>
                  {item.fullname}{" "}
                  <Text style={{ fontSize: 13, fontWeight: "400", color: "#666" }}>
                    (+63) {item.phone}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/address/edit",
                    params: { id: item._id },
                  })
                }
              >
                <Text style={styles.editText}>EDIT</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.addressText}>
              {item.street}, {item.barangay}
              {"\n"}
              {item.city}, {item.province}, {item.region}
            </Text>

            <View style={styles.addressFooter}>
              {item.isDefault ? (
                <View style={styles.defaultTag}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.setDefaultButton}
                  onPress={() => setAsDefault(item._id)}
                >
                  <Text style={styles.setDefaultText}>Set Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteAddress(item._id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* ADD NEW ADDRESS BUTTON */}
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          style={styles.newAddressButton}
          onPress={() => router.push("/address/edit")}
        >
          <Ionicons name="add-circle-outline" size={22} color="#A02334" />
          <Text style={styles.newAddressText}>ADD A NEW ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
    fontWeight: "400",
    fontSize: 15,
    marginBottom: 10,
    color: "#666",
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
    fontWeight: "700",
    fontSize: 15,
  },
  editText: {
    color: "#A02334",
    fontWeight: "700",
    fontSize: 12,
  },
  addressText: {
    fontSize: 13,
    color: "#333",
    marginTop: 6,
    lineHeight: 18,
  },
  addressFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    alignItems: "center",
  },
  defaultTag: {
    backgroundColor: "#A02334",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  defaultText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  setDefaultButton: {
    borderWidth: 1,
    borderColor: "#A02334",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  setDefaultText: {
    color: "#A02334",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "#A02334",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 3,
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