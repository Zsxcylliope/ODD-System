import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useRouter, Link } from "expo-router";
import api from "../lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email: email.toLowerCase(),
        password,
      });
      
      await AsyncStorage.setItem("token", res.data.token);

      Alert.alert("Login successful", `Welcome ${res.data.user.fullname}`);
      router.replace("/home");
    } catch (err: any) {
      console.log("LOGIN ERROR:", err);
      console.log("RESPONSE:", err?.response);
      console.log("MESSAGE:", err?.message);

      Alert.alert(
        "Login failed",
        err.response?.data?.message || "Network error"
      );
    }
  };

  return (
    <View style={style.container}>
      {/* LOGO */}
      <View style={style.logoContainer}>
        <Image
          source={require("../assets/images/logo-white.png")}
          style={style.logo}
        />
      </View>

      {/* CARD */}
      <View style={style.card}>
        <Text style={style.logintext}>Login</Text>
        <Text style={style.description}>Enter your credentials</Text>

        <View style={style.inputContainer}>
          <Text style={style.credentials}>Email</Text>
          <TextInput
            style={style.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.credentials}>Password</Text>
          <TextInput
            style={style.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Link href="/forgotpassword" style={style.fpass}>
          Forgot Password ?
        </Link>

        <TouchableOpacity onPress={handleLogin}>
          <View style={style.loginButton}>
            <Text style={style.loginText}>Log In</Text>
          </View>
        </TouchableOpacity>

        <Text style={style.signup}>
          Don’t have an account?
          <Link href="/signup" style={style.signupLink}> Sign Up</Link>
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5387ED",
    alignItems: "center",
  },

  logoContainer: {
    marginTop: 80,
    marginBottom: 20,
  },

  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },

  card: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },

  logintext: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
    color: "grey",
  },

  inputContainer: {
    marginBottom: 15,
  },

  credentials: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44, // ✅ FIXED (no dot)
  },

  fpass: {
    textAlign: "right",
    color: "#1E40AF",
    marginBottom: 20,
  },

  loginButton: {
    backgroundColor: "#EE002D",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  signup: {
    textAlign: "center",
    marginTop: 20,
    color: "grey",
  },

  signupLink: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Login;