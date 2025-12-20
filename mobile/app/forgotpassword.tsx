import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import api from "../lib/api";



    const ForgotPassword = () => {
        const router = useRouter();

        const [email, setEmail] = useState("");

        const handleSend = async () => {
            if (!email) {
                Alert.alert("Error", "Please enter your email");
                return;
            }

            try {
                const res = await api.post("/auth/forgot-password", { email });

                Alert.alert("Success", res.data.message);

                router.replace({
                pathname: "/verification",
                params: { email }, // REQUIRED
                });
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
              <TouchableOpacity onPress={()=>router.back()}>
                  <Image 
                  source={require('../assets/images/arrow.png')}   //location sa arrow button
                  style={style.arrow}/> 
              </TouchableOpacity>
              <Text style={style.forgotpassword}>Forgot Password</Text>
 
  
              <View style={style.boxes}>
                  <View style={style.inputContainer} >
                      <Text style={style.credentials}>Email</Text>
                      <View>
                          <TextInput style={style.input}
                          placeholder="Enter your email"
                          value={email}
                          onChangeText={setEmail}
                          autoCapitalize="none"
                          />
                      </View>
                  </View>
              </View>
              
              <View style={style.inputContainer} >
                  <TouchableOpacity onPress={handleSend}>   
                      <View style={style.register}>
                          <Text style={style.registertext}>Send</Text>
                      </View>
                  </TouchableOpacity>
              </View>
              <View>
                  <Text style={style.description}>
                        Back to
                        <Link href="/login" style={style.signinLink}> sign in</Link>  
                    </Text> 
              </View>
              <View style={style.signupCluster}>
                    <Text style={style.dyhaccount}>
                       Do you have an account?
                    </Text>
                     <TouchableOpacity onPress={() => router.replace("/signup")}>   
                        <View style={style.signup}>
                            <Text style={style.signuptext}>Sign up</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
  }
  
    const style=StyleSheet.create({
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
    arrow:{
        width:15,
        height:15,
        resizeMode:'contain',
        marginTop:30,
        marginLeft:20,
    },
    forgotpassword:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:20,
        marginTop:20,
    },
    signinLink:{
        color:'red',
        fontWeight:'bold',
        fontSize:14,
    },
    description:{
        textAlign:'left',
        color:'grey',
        marginLeft:20,
        fontSize: 12,
        marginTop: 10,
    },
    boxes:{
        marginTop:10, //from name to confirm password
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
    register:{
        backgroundColor:'#EE002D', //button color nis login
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
    signupCluster:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:70,
        marginBottom:20,
        textAlign: "center",
    },
    dyhaccount:{
        textAlign:'center',
        color:'grey',
        marginLeft:20,
        fontSize: 12,
        marginTop: 80,
    },
    signup:{
        width:250,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        textAlign: "center",
        alignSelf:'center',
        borderRadius:20,
        borderWidth:2,
        borderColor:"#A02334",
        color:"#FFF",
        marginLeft:15,
        marginBottom:25,
    },
    signuptext:{
        color:'#A02334',
    },
  
  })

export default ForgotPassword;