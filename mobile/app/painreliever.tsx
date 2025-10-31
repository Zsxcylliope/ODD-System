import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import ProductCard from "./productcard";
import Navbar from "./navbar"; 

const PainReliever = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      image: require("../assets/images/Pain-Reliever.png"),
      name: "Biogestic",
      rating: 4,
      price: 246,
    },
    {
      id: 2,
      image: require("../assets/images/Vitamins.png"),
      name: "Ibuprofen",
      rating: 5,
      price: 246,
    },
    {
      id: 3,
      image: require("../assets/images/Allergy-Reliever.png"),
      name: "Aspirin",
      rating: 4.5,
      price: 246,
    },
    {
      id: 4,
      image: require("../assets/images/Cough,Cold,Flu.png"),
      name: "Mefenamic Acid",
      rating: 2,
      price: 246,
    },
    {
      id: 5,
      image: require("../assets/images/Cough,Cold,Flu.png"),
      name: "Naproxen",
      rating: 2,
      price: 246,
    },
    {
      id: 6,
      image: require("../assets/images/Cough,Cold,Flu.png"),
      name: "Flanax Forte",
      rating: 3.5,
      price: 246,
    },
    
  ];

  // 🔍 Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
            <View style={styles.headertop}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back-outline" size={20} color="white"/>
                </TouchableOpacity>
                <Text style={styles.headertext}> Pain Reliever </Text>
            </View>
            <View style={styles.search}>
                <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
                <TextInput 
                placeholder="Search for products" 
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput} 
                />
            </View>
        </View>

        {/* Product Grid */}
        <View style={styles.gridContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <View key={product.id} style={styles.gridItem}>
                <ProductCard
                  image={product.image}
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                />
              </View>
            ))
          ) : (
            <Text style={styles.noResults}>No products found</Text>
          )}
        </View>
        <View style={{ height: 80 }} /> {/* Spacer for Navbar */}
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#A02334",
    alignItems: "center",
    height: 150,
  },
  headertop:{
    backgroundColor: "#A02334",
    flexDirection:"row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft:15,
    marginTop:40,
    marginBottom:20,
  },
  headertext: {
    flex:2,
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center",
    color:"#fff",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft:18,
    height: 40,
    maxWidth:"90%",
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingTop:20,
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
  noResults: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: 'gray',
  },
});

export default PainReliever;
