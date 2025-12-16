import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import api from "../lib/api";

export default function NewPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      const res = await api.post("/auth/reset-password", {
        token,
        password,
      });
      Alert.alert("Success", res.data.message);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.response?.data?.message || "Network error"
      );
    }
  };

  return (
    <View>
      <TextInput placeholder="Reset token" onChangeText={setToken} />
      <TextInput placeholder="New password" secureTextEntry onChangeText={setPassword} />
      <Button title="Reset password" onPress={handleReset} />
    </View>
  );
}
