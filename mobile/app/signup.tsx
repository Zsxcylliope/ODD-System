import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useRouter, Link } from "expo-router";
import api from "../lib/api";

const Signup = () => {
    const router = useRouter();

    // ======================
    // FORM STATE
    // ======================
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // ======================
    // REGISTER HANDLER
    // ======================
    const handleSignUp = async () => {
        if (!fullname || !email || !phone || !password || !confirmPassword) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const res = await api.post("/auth/register", {
                fullname,
                email: email.toLowerCase(),
                phone,
                password,
                confirmPassword,
            });

            Alert.alert("Success", res.data.message);
            router.replace("/login"); // go to login after successful signup
        } catch (err: any) {
            Alert.alert(
                "Registration failed",
                err.response?.data?.message || "Network error"
            );
        }
    };

    return (
        <View style={style.container}>
            <View style={style.card}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image 
                        source={require('../assets/images/arrow.png')}
                        style={style.arrow}
                    /> 
                </TouchableOpacity>

                <Text style={style.signup}>Sign up</Text>

                <Text style={style.description}>
                    Already have an account?
                    <Link href="/login" style={style.loginLink}> Login</Link>  
                </Text> 

                <View style={style.boxes}>
                    <View style={style.inputContainer}>
                        <Text style={style.credentials}>Full Name</Text>
                        <TextInput
                            style={style.input}
                            placeholder="Enter your name"
                            value={fullname}
                            onChangeText={setFullname}
                        />
                    </View>

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
                        <Text style={style.credentials}>Phone Number</Text>
                        <TextInput
                            style={style.input}
                            placeholder="Enter your number"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={style.inputContainer}>
                        <Text style={style.credentials}>Password</Text>
                        <TextInput
                            style={style.input}
                            placeholder="Create your password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <View style={style.inputContainer}>
                        <Text style={style.credentials}>Confirm Password</Text>
                        <TextInput
                            style={style.input}
                            placeholder="Confirm your Password"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                </View>

                <View style={style.inputContainer}>
                    <TouchableOpacity onPress={handleSignUp}>   
                        <View style={style.register}>
                            <Text style={style.registertext}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#5387ED",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 25,
  },

  arrow: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginBottom: 10,
  },

  signup: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },

  description: {
    color: "grey",
    marginBottom: 20,
  },

  loginLink: {
    color: "red",
    fontWeight: "bold",
  },

  boxes: {
    marginTop: 5,
  },

  inputContainer: {
    marginBottom: 15,
  },

  credentials: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    width: "100%",
    backgroundColor: "#fff",
  },

  register: {
    backgroundColor: "#EE002D",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },

  registertext: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Signup;