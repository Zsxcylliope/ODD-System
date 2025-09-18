import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import {useRouter} from "expo-router";

const transaction = () => {
    const router = useRouter();

  return (
    <View style={{flex:1}}>
        <View style={{flex:1}}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={require('../assets/images/arrow.png')} style={style.arrow}/>
                </TouchableOpacity>
                <Text style={style.headertext}>Transaction</Text>

            </View>
        </View>
        <View style={{flex:5}}>
            <View style={style.main}>
                <Text style={style.placeholder}> THIS IS A PLACEHOLDER</Text>
                <TouchableOpacity onPress={()=>router.push('/')}>
                    <Text style={style.logout}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
    header:{
        backgroundColor: "#5387ED",
        flex:1,
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems: "center",
        
        height: 40,
        paddingLeft:15,
        paddingTop:40,
    },
    arrow: {
        flex:1,
        width:15,
        height:15,
        resizeMode:'contain',      
    },
    headertext: {
        flex:2,
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center",
        color:"#fff",
    },
    main: {
        alignItems: "center",
        justifyContent: "center",
    },
    placeholder: {
        fontSize: 20,
        marginTop: 200,
        fontWeight: "bold",
    },
    logout: {
        fontSize: 16,
        marginTop: 20,
        color: "red",
        fontWeight: "bold",
    },
})    

export default transaction