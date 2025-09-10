import { View, Text, StyleSheet,Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";

const signup = () => {
    const router = useRouter();
  return (
    <View style={style.container}>
        <View style={style.card}>
            <TouchableOpacity onPress={()=>router.back()}>
                <Image 
                source={require('../assets/images/arrow.png')}   //location sa arrow button
                style={style.arrow}/> 
            </TouchableOpacity>
            <Text style={style.signup}>Sign up</Text>
            <Text style={style.description}>Already have an account?  
                <TouchableOpacity onPress={()=>router.push('/login')}>
                <Text style={style.loginLink}> Login</Text></TouchableOpacity> 
            </Text>
            <View style={style.boxes}>
                <View style={style.inputContainer} >
                    <Text style={style.credentials}>Full Name</Text>
                    <View>
                        <TextInput style={style.input} placeholder='Enter your name' />
                    </View>
                </View>
                <View style={style.inputContainer} >
                    <Text style={style.credentials}>Email</Text>
                    <View>
                        <TextInput style={style.input} placeholder='Enter your email' />
                    </View>
                </View>
                <View style={style.inputContainer} >
                    <Text style={style.credentials}>Phone Number</Text>
                    <View>
                        <TextInput style={style.input} placeholder='Enter your number' />
                    </View>
                </View>
                <View style={style.inputContainer} >
                    <Text style={style.credentials}>Password</Text>
                    <View>
                        <TextInput style={style.input} placeholder='Create your password' />
                    </View>
                </View>
                <View style={style.inputContainer} >
                    <Text style={style.credentials}>Confirm Password</Text>
                    <View>
                        <TextInput style={style.input} placeholder='Confirm your Password' />
                    </View>
                </View>
            </View>
            
            <View style={style.inputContainer} >
                <TouchableOpacity onPress={()=>router.push('/dashboard')}>   
                    <View style={style.register}>
                        <Text style={style.registertext}>Register</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Text>  </Text>
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
    signup:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:20,
        marginTop:20,
    },
    loginLink:{
        color:'red',
        fontWeight:'bold',
        fontSize:14,
    },
    description:{
        textAlign:'left',
        marginTop:10,
        color:'grey',
        marginLeft:20,
    },
    
    boxes:{
        marginTop:20, //from name to confirm password
    },
    inputContainer:{
        paddingLeft:20,
    },
    credentials:{
        marginTop:10,
        fontWeight:'bold',
        fontSize:14,
    },
    input:{
        borderWidth:1,
        borderColor:'grey',
        maxWidth:300,
        borderRadius:10,
        marginTop:10,
    },
    register:{
        backgroundColor:'red', //color button sa register
        width:300,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    registertext:{
        color:'white',
    },

})

export default signup