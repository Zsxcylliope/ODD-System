import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter, useLocalSearchParams } from "expo-router";
import api from "../lib/api";

const NewPassword = () => {
    const router = useRouter();

    // get email + code passed from verification screen
    const { email, code } = useLocalSearchParams<{
        email: string;
        code: string;
    }>();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSend = async () => {
        if (!password || !confirmPassword) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const res = await api.post("/auth/reset-password", {
                email,
                code,
                password,
            });

            Alert.alert("Success", res.data.message);
            router.replace("/login");
        } catch (err: any) {
            Alert.alert(
                "Error",
                err.response?.data?.message || "Network error"
            );
        }
    };

    return (
        <View style={style.container}>
            <View style={style.card}>
                <Text style={style.newpassword}>New Password</Text>

                <View style={style.boxes}>
                    <View style={style.inputContainer}>
                        <Text style={style.credentials}>Enter New Password</Text>
                        <TextInput
                            style={style.input}
                            placeholder="At least 8 digits"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <View style={style.inputContainer}>
                        <Text style={style.credentials}>Confirm Password</Text>
                        <TextInput
                            style={style.input}
                            placeholder="********"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                </View>

                <View style={style.sendContainer}>
                    <TouchableOpacity onPress={handleSend}>
                        <View style={style.register}>
                            <Text style={style.registertext}>Send</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container:{
        backgroundColor:"#5387ED",
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    card:{
        marginTop:-20,
        paddingLeft:10,
        width:350,
        backgroundColor:"white",
        borderRadius:20,
        maxHeight:1500,
    },
    newpassword:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:20,
        marginTop:20,
    },
    boxes:{
        marginTop:10,
    },
    inputContainer:{
        paddingLeft:20,
        height:75,
    },
    credentials:{
        marginTop:20,
        fontSize:14,
    },
    input:{
        borderWidth:1,
        borderColor:'grey',
        maxWidth:300,
        borderRadius:10,
        marginTop:10,
        paddingLeft:10,
        height:40,
    },
    sendContainer:{
        paddingLeft:20,
        height:75,
        marginBottom: 20,
    },
    register:{
        backgroundColor:'#EE002D',
        width:300,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        marginBottom:40,
    },
    registertext:{
        color:'white',
    },
});

export default NewPassword;