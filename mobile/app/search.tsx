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

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Product list
  const products = [
    { id: 1, image: require("../assets/images/benadryl.png"), name: "Benadryl", rating: 4, price: 246 },
    { id: 2, image: require("../assets/images/zyrtec-removebg-preview.png"), name: "Zyrtec", rating: 5, price: 246 },
    { id: 3, image: require("../assets/images/claritin-removebg-preview.png"), name: "Claritin", rating: 4.5, price: 246 },
    { id: 4, image: require("../assets/images/allegra.png"), name: "Allegra", rating: 2, price: 246 },
    { id: 5, image: require("../assets/images/STELON-FURTAZINE-TAB-1-scaled-removebg-preview.png"), name: "Furtazine", rating: 2, price: 246 },
    { id: 6, image: require("../assets/images/trimeton.png"), name: "Chlor-Timeton", rating: 3.5, price: 246 },
    { id: 7, image: require("../assets/images/centrum.png"), name: "Centrum", rating: 4, price: 246 },
    { id: 8, image: require("../assets/images/conzace.png"), name: "Conzace", rating: 5, price: 246 },
    { id: 9, image: require("../assets/images/ceelin-removebg-preview.png"), name: "Ceelin", rating: 4.5, price: 246 },
    { id: 10, image: require("../assets/images/immunpro-removebg-preview.png"), name: "ImmunPro", rating: 2, price: 246 },
    { id: 11, image: require("../assets/images/forti-removebg-preview.png"), name: "Forti-D", rating: 2, price: 246 },
    { id: 12, image: require("../assets/images/enervon-removebg-preview.png"), name: "Enervon", rating: 3.5, price: 246 },
    { id: 13, image: require("../assets/images/bioflu.png"), name: "Bioflu", rating: 4, price: 246 },
    { id: 14, image: require("../assets/images/tuseran-removebg-preview.png"), name: "Tuseran", rating: 5, price: 246 },
    { id: 15, image: require("../assets/images/ascof forte.png"), name: "Ascof Forte", rating: 4.5, price: 246 },
    { id: 16, image: require("../assets/images/SOLMUX_ADVANCE_500MG_5MG_TAB__63166-removebg-preview.png"), name: "Solmux", rating: 2, price: 246 },
    { id: 17, image: require("../assets/images/decolgem-removebg-preview.png"), name: "Decolgen", rating: 2, price: 246 },
    { id: 18, image: require("../assets/images/neozep-removebg-preview.png"), name: "Neozep", rating: 3.5, price: 246 },
    { id: 19, image: require("../assets/images/Biogesic.png"), name: "Biogesic", rating: 4, price: 246 },
    { id: 20, image: require("../assets/images/ibuprofen-removebg-preview.png"), name: "Ibuprofen", rating: 5, price: 246 },
    { id: 21, image: require("../assets/images/aspirin.png"), name: "Aspirin", rating: 4.5, price: 246 },
    { id: 22, image: require("../assets/images/mefenamic-removebg-preview.png"), name: "Mefenamic Acid", rating: 2, price: 246 },
    { id: 23, image: require("../assets/images/naproxen-removebg-preview.png"), name: "Naproxen", rating: 2, price: 246 },
    { id: 24, image: require("../assets/images/flanax-removebg-preview.png"), name: "Flanax Forte", rating: 3.5, price: 246 },
  ];

  // Sort alphabetically
  const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));

  // Filter products
  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView contentContainerStyle={styles.scrollView}>
            {/* Header */}
        <View style={styles.header}>
            <Text style={styles.headerText}>Search Medicine</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#A02334" style={styles.searchIcon} />
            <TextInput
            placeholder="Search Medicine"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor="#A0A0A0"
            />
        </View>

        {/* Product Results */}
            {searchQuery === "" ? (
            <View />
            ) : filteredProducts.length > 0 ? (
            <View style={styles.gridContainer}>
                {filteredProducts.map((product) => (
                <View key={product.id} style={styles.gridItem}>
                    <ProductCard
                    image={product.image}
                    name={product.name}
                    rating={product.rating}
                    price={product.price}
                    />
                </View>
                ))}
            </View>
            ) : (
            <Text style={styles.noResults}>No products found</Text>
            )}
            <View style={{ height: 40 }} /> {/* Spacer for Navbar */}
        </ScrollView>
    
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 15,
    marginTop:20,
    marginBottom:20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
    flex: 1,
    textAlign: "center",
    marginRight: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 20,
    marginTop: 15,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  scrollView: {
    paddingVertical: 20,
    marginBottom: 100,

  },
  gridContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridItem: {
    width: "43%",
    height: 260,
    marginBottom: 25,
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 50,
  },
});

export default Search;
