import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from "expo-router";

const search = () => {
    const router = useRouter();

    const navItems = [
        { name: "Home", icon: "home-outline", route: "/dashboard" },
        { name: "Search", icon: "search-outline", route: "/search" },
        { name: "Cart", icon: "cart-outline", route: "/cart" },
        { name: "Transaction", icon: "receipt-outline", route: "/transaction" },
        { name: "Profile", icon: "person-outline", route: "/profile" },
    ];
  return (
    <View style={{flex:1}}>
        <View style={{flex:1}}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={require('../assets/images/arrow.png')} style={style.arrow}/>
                </TouchableOpacity>
                <Ionicons icon="search-outline" size={20} color="black" />
                <TextInput placeholder="Search for products" style={style.searchInput} />
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
        <View style={style.navbar}>
            {navItems.map((item) => (
            <TouchableOpacity key={item.name} style={style.navItem} onPress={() => router.push(item.route)} >
                <Ionicons name={item.icon} size={28} color="blue" />
            </TouchableOpacity>
            ))}
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
    searchInput: {
        flex:5,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft:15,
        fontSize: 16,
        paddingBottom:5,
        width: '60%',
        height: 35,
        marginLeft:15,
        marginRight:10,
        alignSelf: "center",
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
    navbar: {
        backgroundColor: "#ffffff",
        height: 80,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: "#ddd"
    },
    navItem: {
        paddingBottom: 20
    },
})    

export default search