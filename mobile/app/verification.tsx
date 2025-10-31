import { View, Text, StyleSheet,Image, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";
import { Link } from "expo-router";


const Verification = () => {
    const router = useRouter();
    const handleSend = () =>{
        router.replace("/newpassword")
    };
    const handleSignup = () =>{
        router.replace("/signup")
    };

   return (
      <View style={style.container}>
          <View style={style.card}>
              <TouchableOpacity onPress={()=>router.back()}>
                  <Image 
                  source={require('../assets/images/arrow.png')}   //location sa arrow button
                  style={style.arrow}/> 
              </TouchableOpacity>
              <Text style={style.forgotpassword}>Verification</Text>
 
  
              <View style={style.boxes}>
                  <View style={style.inputContainer} >
                      <Text style={style.credentials}>Enter Verification Code</Text>
                      <View style={style.credentialContainer}>
                          <TextInput style={style.input} placeholder='0' />
                          <TextInput style={style.input} placeholder='0' />
                          <TextInput style={style.input} placeholder='0' />
                          <TextInput style={style.input} placeholder='0' />
                      </View>
                  </View>
              </View>
              <View>
                  <Text style={style.description}>
                        If you didn't recieve a code,
                        <Text style={style.signinLink}> Resend</Text>  
                    </Text> 
              </View>

              <View style={style.inputContainer} >
                  <TouchableOpacity onPress={handleSend}>   
                      <View style={style.register}>
                          <Text style={style.registertext}>Send</Text>
                      </View>
                  </TouchableOpacity>
              </View>
              
              <View style={style.signupCluster}>
                    <Text style={style.dyhaccount}>
                       Do you have an account?
                    </Text>
                     <TouchableOpacity onPress={handleSignup}>   
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
        textAlign:'center',
        color:'grey',
        marginLeft:20,
        fontSize: 12,
        marginTop: 50,
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
    credentialContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
    },
    input:{
        flexDirection:"row",
        borderWidth:1,
        borderColor:'grey',
        maxWidth:30,
        borderRadius:20,
        marginTop:10,
        width:40,
        height:40,
        marginRight:20,
        textAlign:"center",
    },
    register:{
        backgroundColor:'#EE002D', //button color nis login
        width:300,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        marginBottom:50
    },
    registertext:{
        color:'white',
    },
    singupCLuster:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:50,
        marginBottom:20,
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

export default Verification