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
import { useLocalSearchParams, useRouter } from "expo-router";

import ProductCard from "../productcard";
import api from "../../lib/api";

type Product = {
  _id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  stock: number;
};

export default function CategoryScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products", {
        params: {
          category,
          search: searchQuery,
        },
      });

      setProducts(res.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, searchQuery]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headertop}>
            <Ionicons
              name="chevron-back-outline"
              size={22}
              color="white"
              onPress={() => router.replace("/home")}
            />
            <Text style={styles.headertext}>{category}</Text>
          </View>

          <View style={styles.search}>
            <Ionicons name="search-outline" size={20} color="gray" />
            <TextInput
              placeholder="Search products"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* GRID */}
        <View style={styles.gridContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#A02334" />
          ) : products.length > 0 ? (
            products.map((p) => (
              <View key={p._id} style={styles.gridItem}>
                <ProductCard
                  id={p._id}                 // ✅ REQUIRED
                  image={{ uri: p.image }}
                  name={p.name}
                  rating={p.rating}
                  price={p.price}
                  stock={p.stock}
                />
              </View>
            ))
          ) : (
            <Text style={styles.noResults}>No products found</Text>
          )}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#A02334",
    height: 150,
    alignItems: "center",
  },
  headertop: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 40,
    marginBottom: 20,
  },
  headertext: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 40,
    width: "90%",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  gridItem: {
    backgroundColor: "#E0E0E0",
    width: "45%",
    height: 260,
    marginBottom: 25,
    borderRadius: 10,
    elevation: 5,
  },
  noResults: {
    marginTop: 40,
    fontSize: 16,
    color: "gray",
  },
});
