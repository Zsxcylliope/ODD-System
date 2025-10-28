import { View,Text,StyleSheet,Image, TouchableOpacity, SafeAreaView,ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import ProductCard from "./productcard";
import Navbar from "./navbar"; 

const Dashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const navItems = [
    { name: "Home", icon: "home-outline", activeIcon: "home", route: "/dashboard" },
    { name: "Search", icon: "search-outline", activeIcon: "search", route: "/search" },
    { name: "Cart", icon: "cart-outline", activeIcon: "cart", route: "/cart" },
    { name: "Transaction", icon: "receipt-outline", activeIcon: "receipt", route: "/transaction" },
    { name: "Profile", icon: "person-outline", activeIcon: "person", route: "/profile" },
  ];

  // 🛍️ Example products for your grid
  const products = [
    {
      id: 1,
      image: require("../assets/images/Pain-Reliever.png"),
      name: "Tiki-Tiki Syrup",
      rating: 4,
      price: 246,
    },
    {
      id: 2,
      image: require("../assets/images/Vitamins.png"),
      name: "Centrum",
      rating: 5,
      price: 246,
    },
    {
      id: 3,
      image: require("../assets/images/Allergy-Reliever.png"),
      name: "Biogesic",
      rating: 4.5,
      price: 131,
    },
    {
      id: 4,
      image: require("../assets/images/Cough,Cold,Flu.png"),
      name: "Rexidol",
      rating: 2,
      price: 320,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={style.scroll}>
        {/* HEADER */}
        <View style={style.container}>
          <TouchableOpacity onPress={() => router.replace('/')} style={style.notification}>
            <Ionicons name="notifications-outline" color={'#f3f4f5'} size={35} />
          </TouchableOpacity>
          <Image source={require('../assets/images/logo-white.png')} style={style.logo} />
        </View>

        {/* MAIN CONTENT */}
        <View style={{ flex: 1, paddingBottom: 10 }}>
          {/* CATEGORIES */}
          <Text style={style.maintext}>Categories</Text>
          <View style={style.categoriesContainer}>
            <TouchableOpacity onPress={() => router.push('/painreliever')} style={style.category}>
              <Image source={require('../assets/images/Pain-Reliever.png')} style={style.categoryimg} />
              <View style={style.categorytextContainer}>
                <Text style={style.categorytext}>Pain Reliever</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/cough')} style={style.category}>
              <Image source={require('../assets/images/Cough,Cold,Flu.png')} style={style.categoryimg} />
              <View style={style.categorytextContainer}>
                <Text style={style.categorytext}>Cough, Cold, Flu</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/vitamins')} style={style.category}>
              <Image source={require('../assets/images/Vitamins.png')} style={style.categoryimg} />
              <View style={style.categorytextContainer}>
                <Text style={style.categorytext}>Vitamins</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/allergy')} style={style.category}>
              <Image source={require('../assets/images/Allergy-Reliever.png')} style={style.categoryimg} />
              <View style={style.categorytextContainer}>
                <Text style={style.categorytext}>Allergy Reliever</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* BEST DEALS GRID */}
          <Text style={style.maintext}>Best Deals from your Dealers!</Text>
          <View style={style.gridContainer}>
            {products.map((product) => (
              <View key={product.id} style={style.gridItem}>
                <ProductCard
                  image={product.image}
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                />
              </View>
            ))}
          </View>

        </View>
      </ScrollView>

     {/* ✅ STATIC NAVBAR */}
      <Navbar />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  notification: {
    alignSelf: 'flex-end',
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#A02334",
    flex: 1,
    maxHeight: 300,
  },
  logo: {
    maxHeight: 200,
    maxWidth: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  scroll: {
    marginBottom: 70,
  },
  maintext: {
    padding: 10,
    fontSize: 20,
    color: "#DF1C41",
    fontWeight: "bold",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  category: {
    backgroundColor: "#E0E0E0",
    width: "43%",
    height: 170,
    marginBottom: 25,
    justifyContent: "center",
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryimg: {
    width: 80,
    height: 100,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 15,
  },
  categorytextContainer: {
    marginTop: 10,
    backgroundColor: "#EEEEEE",
    width: '100%',
    height: 60,
  },
  categorytext: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
    paddingTop: 5,
    paddingLeft: 12,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  gridItem: {
    backgroundColor: "#E0E0E0",
    width: "43%",
    height: 260,
    marginBottom: 25,
    justifyContent: "center",
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Dashboard;
