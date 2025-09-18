import { View, StyleSheet,Image, TouchableOpacity } from 'react-native'
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
})
export default login