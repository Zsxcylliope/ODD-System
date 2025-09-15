import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";

const Dashboard = () => {
  const router = useRouter();

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
                        <Image source={require('../assets/images/logo-white.png')} style={style.categoryimg}/>
                    </View>   
                    <View style={style.categorytextContainer}>
                        <Text style={style.categorytext}>Category 1</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <View style={style.category}>
                    <TouchableOpacity onPress={() => router.push('/category1')}>
                    <Image source={require('../assets/images/logo-white.png')} style={style.categoryimg}/>
                    <View style={style.categorytextContainer}>
                        <Text style={style.categorytext}>Category 2</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <View style={style.category}>
                    <TouchableOpacity onPress={() => router.push('/category1')}>
                    <Image source={require('../assets/images/logo-white.png')} style={style.categoryimg}/>
                    <View style={style.categorytextContainer}>
                        <Text style={style.categorytext}>Category 3</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <View style={style.category}>
                    <TouchableOpacity onPress={() => router.push('/category1')}>
                    <Image source={require('../assets/images/logo-white.png')} style={style.categoryimg}/>
                    <View style={style.categorytextContainer}>
                        <Text style={style.categorytext}>Category 4</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        {/* Bottom Navigation */}
        <View style={style.navigation}>
            {["Home", "Search", "Market", "History", "Profile"].map((item) => (
            <TouchableOpacity key={item} style={style.navItem}>
                <Text style={style.navText}>{item}</Text>
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
    },
   category: {
        backgroundColor: "#E0E0E0",
        width: "43%",     // 👈 ensures 2 columns
        height: 170,
        marginBottom: 25,
        justifyContent: "center",
        borderRadius:10,
        borderBlockColor:"#000000",
        borderWidth:1,
        overflow:'hidden',
     },
   categoryimg: {
    width: 80,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
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
    height: 120,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-around",
    position: 'absolute',
    bottom: 0,
  },
  navItem: {
    padding: 10,
    marginTop: 10,
  },
  navText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  }
})

export default Dashboard
