import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const Home = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/top");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUnread = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    const res = await api.get(
      "/notifications/unread/count",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setUnreadCount(res.data.count);
  };

  useEffect(() => {
    loadUnread();
    const interval = setInterval(loadUnread, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => router.replace("/notifications")}
            style={styles.notification}
          >
            <Ionicons name="notifications-outline" color="#f3f4f5" size={32} />

            {unreadCount > 0 && <View style={styles.redDot} />}
          </TouchableOpacity>

          <Image
            source={require("../assets/images/logo-white.png")}
            style={styles.logo}
          />
        </View>

        {/* MAIN CONTENT */}
        <View style={{ flex: 1, paddingBottom: 10 }}>
          {/* CATEGORIES */}
          <Text style={styles.maintext}>Categories</Text>

          <View style={styles.categoriesContainer}>
            <Category
              title="Pain Reliever"
              image={require("../assets/images/Pain-Reliever.png")}
              onPress={() =>
                router.push({
                  pathname: "/category/[category]",
                  params: { category: "Pain Reliever" },
                })
              }
            />
            <Category
              title="Cough, Cold, Flu"
              image={require("../assets/images/Cough,Cold,Flu.png")}
              onPress={() =>
                router.replace({
                  pathname: "/category/[category]",
                  params: { category: "Cough" },
                })
              }
            />
            <Category
              title="Vitamins"
              image={require("../assets/images/Vitamins.png")}
              onPress={() =>
                router.replace({
                  pathname: "/category/[category]",
                  params: { category: "Vitamins" },
                })
              }
            />
            <Category
              title="Allergy Reliever"
              image={require("../assets/images/Allergy-Reliever.png")}
              onPress={() =>
                router.replace({
                  pathname: "/category/[category]",
                  params: { category: "Allergy" },
                })
              }
            />
          </View>

          {/* BEST DEALS */}
          <Text style={styles.maintext}>Best Deals from your Dealers!</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#A02334" />
          ) : (
            <View style={styles.gridContainer}>
              {products.map((product) => (
                <View key={product._id} style={styles.gridItem}>
                  <ProductCard
                    id={product._id}               // ✅ REQUIRED
                    image={{ uri: product.image }}
                    name={product.name}
                    rating={product.rating}
                    price={product.price}
                    stock={product.stock}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <Navbar />
    </SafeAreaView>
  );
};

/* ============================= */
/* CATEGORY COMPONENT */
/* ============================= */
const Category = ({
  title,
  image,
  onPress,
}: {
  title: string;
  image: any;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.category}>
    <Image source={image} style={styles.categoryimg} />
    <View style={styles.categorytextContainer}>
      <Text style={styles.categorytext}>{title}</Text>
    </View>
  </TouchableOpacity>
);

/* ============================= */
/* STYLES */
/* ============================= */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A02334",
    maxHeight: 300,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    alignSelf: "center",
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
  notification: {
    alignSelf: "flex-end",
    paddingRight: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  redDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
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
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
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
    height: 60,
    justifyContent: "center",
  },
  categorytext: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 12,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  gridItem: {
    backgroundColor: "#E0E0E0",
    width: "45%",
    height: 260,
    marginBottom: 25,
    borderRadius: 10,
    elevation: 5,
  },
});

export default Home;
