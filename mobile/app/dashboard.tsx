import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'  // ✅ for icons

const Dashboard = () => {
  const router = useRouter();

  const navItems = [
    { name: "Home", icon: "home-outline", route: "/dashboard" },
    { name: "Search", icon: "search-outline", route: "/search" },
    { name: "Cart", icon: "cart-outline", route: "/cart" },
    { name: "Transaction", icon: "receipt-outline", route: "/transaction" },
    { name: "Profile", icon: "person-outline", route: "/profile" },
  ];

  return (
    <View style={{ flex: 1 }}>
        <View style={style.container}>
            <TouchableOpacity onPress={() => router.push('/')}>
                <Image source={require('../assets/images/logo-white.png')} style={style.logo}/>
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
            {/* Main Content */}
            <Text style={style.maintext}>Categories</Text> 
            <View style={style.categoriesContainer}>
                <View style={style.category}>
                    <TouchableOpacity onPress={() => router.push('/category1')}>
                    <View>
                        <Image source={require('../assets/images/Pain-Reliever.png')} style={style.categoryimg}/>
                    </View>   
                    <View style={style.categorytextContainer}>
                        <Text style={style.categorytext}>Pain Reliever</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <View style={style.category}>
                    <TouchableOpacity onPress={() => router.push('/category1')}>
                    <Image source={require('../assets/images/Cough,Cold,Flu.png')} style={style.categoryimg}/>
                    <View style={style.categorytextContainer}>
                        <Text style={style.categorytext}>Cough, Cold, Flu</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <View style={style.category}>
                    <TouchableOpacity onPress={() => router.push('/category1')}>
                    <Image source={require('../assets/images/Vitamins.png')} style={style.categoryimg}/>
                    <View style={style.categorytextContainer}>
                        <Text style={style.categorytext}>Vitamins</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <View style={style.category}>
                    <TouchableOpacity onPress={() => router.push('/category1')}>
                    <Image source={require('../assets/images/Allergy-Reliever.png')} style={style.categoryimg}/>
                    <View style={style.categorytextContainer}>
                        <Text style={style.categorytext}>Allergy Reliever</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        {/* Bottom Navigation */}
         <View style={style.navigation}>
          {navItems.map((item) => (
            <TouchableOpacity 
              key={item.name} 
              style={style.navItem} 
              onPress={() => router.push(item.route)}
            >
              <Ionicons name={item.icon} size={28} color="blue" />
            </TouchableOpacity>
          ))}
        </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#5387ED",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 300, 
  },
  logo:{
    maxHeight:200,
    maxWidth:200,
    resizeMode:'contain',
  },
  logout: {
    fontSize: 16,
    marginTop: 20,
    color: "red",
    fontWeight: "bold",
  },
  maintext: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#6C7278",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around", 
    paddingHorizontal: 10,
    paddingTop:10,
  },
    category: {
    backgroundColor: "#E0E0E0",
    width: "43%",     
    height: 170,
    marginBottom: 25,
    justifyContent: "center",
    borderRadius:10,
    overflow:'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,   // Android shadow
  },
  categoryimg: {
    width: 80,
    height: 100,
    resizeMode: "cover", //contain, cover, stretch, repeat, center
    alignSelf: "center", //ma center ang img lng dili ma apil ang text
    marginTop: 15,
   },
   categorytextContainer: {
    marginTop: 10,
    backgroundColor: "#EEEEEE",
    width: '100%',
    height: 60,
    bottom: 0,
   },
    categorytext: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
    paddingTop: 5,
    paddingLeft: 10,
    },
  navigation: {
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

export default Dashboard
