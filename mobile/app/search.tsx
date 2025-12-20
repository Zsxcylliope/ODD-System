import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import api from "../lib/api";
import ProductCard from "./productcard";
import Navbar from "./navbar";

type Product = {
  _id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  stock: number;
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Debounced search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setProducts([]);
      setLoading(false);
      return;
    }

    const timeout = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products", {
        params: { search: searchQuery },
      });
      setProducts(res.data);
    } catch (err) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Search Medicine</Text>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#A02334"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search Medicine"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor="#A0A0A0"
          />
        </View>

        {/* RESULTS */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#A02334"
            style={{ marginTop: 30 }}
          />
        ) : searchQuery === "" ? null : products.length > 0 ? (
          <View style={styles.gridContainer}>
            {products.map((product) => (
              <View key={`${product._id}-${searchQuery}`}
                style={styles.gridItem}>
                <ProductCard
                  id={product._id}           // ✅ REQUIRED
                  image={{ uri: product.image }}
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                  stock={product.stock}
                />
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noResults}>No products found</Text>
        )}

        <View style={{ height: 40 }} />
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
