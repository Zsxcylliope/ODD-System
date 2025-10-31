import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";

const newpassword = () => {
    const router = useRouter();
    const handleSend = () =>{
        router.replace("/login")
    };

   return (
      <View style={style.container}>
          <View style={style.card}>
              <Text style={style.newpassword}>New Password</Text>
  
              <View style={style.boxes}>
                  <View style={style.inputContainer} >
                      <Text style={style.credentials}>Enter New Password</Text>
                      <View>
                          <TextInput style={style.input} placeholder='At least 8 digits' />
                      </View>
                  </View>
                  <View style={style.inputContainer} >
                      <Text style={style.credentials}>Confirm Password</Text>
                      <View>
                          <TextInput style={style.input} placeholder='********' />
                      </View>
                  </View>
              </View>
              
              <View style={style.sendContainer} >
                  <TouchableOpacity onPress={handleSend}>   
                      <View style={style.register}>
                          <Text style={style.registertext}>Send</Text>
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
    newpassword:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:20,
        marginTop:20,
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
    inputContainer:{
        paddingLeft:20,
        height:75,
    },
    sendContainer:{
        paddingLeft:20,
        height:75,
        marginBottom: 20,
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

  
  })

export default newpassword