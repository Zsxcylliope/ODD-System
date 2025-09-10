import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";

const dashboard = () => {
    const router = useRouter();
  return (
    <View style={style.container}>
        <Text style={style.dashboardtext}>Dashboard</Text>
        <TouchableOpacity onPress={()=>router.push('/')}> //back to index
            <Text>log out</Text>
        </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        backgroundColor:"#5387ED",
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    dashboardtext:{
        fontSize:45,
        alignSelf: 'center', 
        color:"black",

    } 
})

export default dashboard