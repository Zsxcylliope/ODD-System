import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../lib/api";

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

  return (
    <ScrollView style={styles.container}>
      {Object.keys(form).map(
        (key) =>
          key !== "isDefault" && (
            <TextInput
              key={key}
              placeholder={key}
              value={(form as any)[key]}
              onChangeText={(v) =>
                setForm({ ...form, [key]: v })
              }
              style={styles.input}
            />
          )
      )}

      <TouchableOpacity style={styles.saveBtn} onPress={save}>
        <Text style={styles.saveText}>SAVE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: "#A02334",
    padding: 14,
    borderRadius: 50,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700" },
});