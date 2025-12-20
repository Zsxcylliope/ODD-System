import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../lib/api";
import { Ionicons } from "@expo/vector-icons";

export default function EditAddress() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    barangay: "",
    street: "",
    city: "",
    province: "",
    region: "",
    isDefault: false,
  });

  useEffect(() => {
    if (id) loadAddress();
  }, []);

  const loadAddress = async () => {
    const token = await AsyncStorage.getItem("token");
    const res = await api.get("/addresses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const found = res.data.find((a: any) => a._id === id);
    if (found) setForm(found);
  };

  const save = async () => {
    const token = await AsyncStorage.getItem("token");

    if (id) {
      await api.put(`/addresses/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await api.post("/addresses", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    router.back();
  };

  const renderInput = (label: string, key: string, placeholder: string) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={(form as any)[key]}
        onChangeText={(v) => setForm({ ...form, [key]: v })}
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Address</Text>
        <TouchableOpacity onPress={save}>
          <Text style={styles.saveBtnText}>SAVE</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Address</Text>

        {renderInput("Full Name", "fullname", "Zumaan")}
        {renderInput("Phone Number", "phone", "09993120355")}
        {renderInput("Barangay", "barangay", "Pagatpat")}
        {renderInput("Street name, Building, House No.", "street", "Zone 2b Mabunay Compound")}
        {renderInput("Region", "region", "Mindanao")}
        {renderInput("Province", "province", "Misamis Oriental")}
        {renderInput("City", "city", "Cagayan De Oro City")}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2", // Light gray background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    marginTop: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  saveBtnText: {
    color: "#E23E57", // Reddish color for SAVE
    fontWeight: "700",
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    // Optional: shadow/elevation if desired, design looks flat or subtle shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
});