import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
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

  useEffect(() => {
    fetchAddresses();
  }, []);

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

  const selectAddress = (address: Address) => {
    if (!selectMode) return;
    router.replace({
      pathname: "/checkout",
      params: { addressId: address._id },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => selectAddress(item)}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {item.fullname} ({item.phone})
              </Text>
              <Text style={styles.address}>
                {item.street}, {item.barangay},{" "}
                {item.city}, {item.province}
              </Text>
              {item.isDefault && (
                <Text style={styles.default}>DEFAULT</Text>
              )}
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/address/edit",
                    params: { id: item._id },
                  })
                }
              >
                <Ionicons name="create-outline" size={20} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAddress(item._id)}>
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/address/edit")}
      >
        <Ionicons name="add" size={22} color="#fff" />
        <Text style={styles.addText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
  },
  name: { fontWeight: "600" },
  address: { color: "#555", marginTop: 4 },
  default: { color: "#A02334", marginTop: 6, fontWeight: "600" },
  actions: { justifyContent: "space-between" },
  addBtn: {
    backgroundColor: "#A02334",
    padding: 14,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  addText: { color: "#fff", fontWeight: "700", marginLeft: 6 },
});