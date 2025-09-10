import { View, Text, StyleSheet,Image, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";

const login = () => {
    const router = useRouter();

  return (
    <View style={style.container}>
        <View style={style.logoContainer}>
            <TouchableOpacity onPress={()=>router.push('/')}>
            <Image source={require('../assets/images/logo-white.png')} 
            style={style.logo}/>
            </TouchableOpacity>
        </View>
        <View style={style.card}>
            <View>
                <Text style={style.logintext}>Login</Text>
            </View>
            <View>
                <Text style={style.description}> Enter your email and password to log in</Text>
            </View>
            <View style={style.inputContainer} >
                <Text style={style.credentials}>Email</Text>
                <View>
                    <TextInput style={style.input} placeholder='Enter your email' />
                </View>
            </View>
            <View style={style.inputContainer}>
                <Text style={style.credentials}>Password</Text>
                <View>
                    <TextInput style={style.input} placeholder='Enter your password' />
                </View>
            </View>
            <View>
                <Text style={style.fpass}>Forgot Password?</Text>
            </View>
            <View style={style.inputContainer} >
                <TouchableOpacity onPress={()=>router.push('/dashboard')}>    
                    <View style={style.login}>
                        <Text style={style.loginbox}>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={style.signup}>
                Don't have an account?  <TouchableOpacity onPress={()=>router.push('/signup')}>
                    <Text style={style.signupLink}>Sign Up</Text></TouchableOpacity>
            </Text>
        </View>
    </View>
  )
}

const style= StyleSheet.create({
    container:{
        backgroundColor:"#5387ED",
        flex:1,
        alignItems:'center',
    },
    logoContainer:{
        alignSelf:'center',
        marginTop:100,
        marginBottom:40,
    },
    logo:{
        maxHeight:200,
        maxWidth:200,
        resizeMode:'contain',
    },
    card:{
        backgroundColor:'#fff', //the white bg
        width:350,
        height:400,
        borderRadius:20,
        paddingTop:10,
        paddingLeft:10,
        marginTop:-20,
    },
    logintext:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
    },
    description:{
        textAlign:'center',
        marginTop:10,
        color:'grey',
    },
    inputContainer:{ 
        paddingLeft:20, //name og box
    },
    credentials:{
        marginTop:10,
        fontWeight:'bold',
        fontSize:12,
    },
    input:{
        borderWidth:1,
        borderColor:'grey',
        maxWidth:300,
        borderRadius:10,
        marginTop:10,
    },
    fpass:{
        textAlign:'right',
        color:'blue',
        marginTop:10,
        paddingRight:20,
    },
    login:{
        backgroundColor:'red', //button color nis login
        width:300,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    loginbox:{
        color:'white',
    },
    signup:{
        textAlign:'center',
        marginTop:20,
        color:'grey',
    },
    signupLink:{
    color:'red',
        fontWeight:'bold',
    },

})
export default login