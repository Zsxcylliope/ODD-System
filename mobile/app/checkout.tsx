import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCart } from "../lib/CartContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../lib/api";

const Checkout = () => {
  const router = useRouter();
  const { addressId } = useLocalSearchParams();
  const { cart, clearSelected } = useCart();

  const [selectedPayment, setSelectedPayment] = useState("Gcash");
  const [address, setAddress] = useState<any>(null);

  useEffect(() => {
    fetchAddress();
  }, [addressId]);

  const fetchAddress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const res = await api.get("/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      let targetAddress;

      if (addressId) {
        targetAddress = res.data.find((a: any) => a._id === addressId);
      }

      // If no specific address selected, or not found, use default
      if (!targetAddress) {
        targetAddress = res.data.find((a: any) => a.isDefault);
      }

      // If still no default, just take the first one
      if (!targetAddress && res.data.length > 0) {
        targetAddress = res.data[0];
      }

      setAddress(targetAddress);
    } catch (error) {
      console.log("Error fetching address:", error);
    }
  };

  const handleAddress = () => {
    router.push("/address?select=true");
  };

  const handleConfirmOrder = async () => {
    if (products.length === 0) return;

    if (!address) {
      Alert.alert("Missing Address", "Please select a delivery address.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      await api.post(
        "/orders",
        {
          items: products.map((item) => ({
            productId: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          })),
          subtotal,
          deliveryFee,
          total,
          paymentMethod: selectedPayment,
          shippingAddress: address, // Optional: send snapshot of address
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearSelected();
      router.replace("/moreceive");
    } catch (err) {
      console.log("Checkout error:", err);
      Alert.alert("Error", "Failed to place order");
    }
  };

  // ✅ ONLY SELECTED ITEMS
  const products = cart.filter((item) => item.selected);

  // ✅ SAME LOGIC AS BEFORE, BUT FOR ALL SELECTED ITEMS
  const deliveryFee = 34;
  const subtotal = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  const payments = [
    { id: "Gcash", label: "Gcash", icon: require("../assets/images/gcash.jpg") },
    { id: "Paypal", label: "Paypal", icon: require("../assets/images/paypal.png") },
    {
      id: "GooglePay",
      label: "Google pay",
      icon: require("../assets/images/gpay.png"),
    },
    {
      id: "COD",
      label: "Cash on delivery",
      icon: require("../assets/images/wallets.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* ADDRESS */}
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={22} color="#A02334" />
          <View style={{ flex: 1, marginLeft: 8 }}>
            {address ? (
              <>
                <Text style={styles.deliveryName}>
                  {address.fullname} ({address.phone})
                </Text>
                <Text style={styles.addressText}>
                  {address.street}, {address.barangay}
                  {"\n"}
                  {address.city}, {address.province}, {address.region}
                </Text>
              </>
            ) : (
              <Text style={styles.deliveryName}>No address selected</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleAddress} style={styles.addressbtn}>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#A02334"
            />
          </TouchableOpacity>
        </View>

        {/* PRODUCT */}
        {products.map((item) => (
          <View key={item._id} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.inStock}>IN STOCK</Text>
              <Text style={styles.productPrice}>₱{item.price}</Text>
              <Text style={styles.productQty}>Quantity: {item.quantity}x</Text>
            </View>
          </View>
        ))}

        {/* PAYMENT METHOD */}
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        <View style={styles.paymentContainer}>
          {payments.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.paymentOption}
              onPress={() => setSelectedPayment(method.id)}
            >
              <Image source={method.icon} style={styles.paymentIcon} />
              <Text style={styles.paymentText}>{method.label}</Text>
              <View
                style={[
                  styles.radioOuter,
                  selectedPayment === method.id && styles.radioSelected,
                ]}
              >
                {selectedPayment === method.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* TOTAL SUMMARY */}
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>₱{subtotal}.00</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery fee</Text>
            <Text style={styles.totalValue}>₱{deliveryFee}.00</Text>
          </View>
          <View style={styles.totalRowFinal}>
            <Text style={styles.orderTotalLabel}>Order Total</Text>
            <Text style={styles.orderTotalValue}>₱{total}.00</Text>
          </View>
        </View>

        {/* CONFIRM BUTTON */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
          disabled={products.length === 0}
        >
          <Text style={styles.confirmText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 0.3,
    borderBottomColor: "#ccc",
    marginTop: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    flex: 1,
    textAlign: "center",
    marginRight: 25,
  },
  scrollView: { padding: 16 },
  addressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F8E8EC",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  deliveryName: { fontWeight: "600", color: "#000" },
  addressText: { color: "#444", fontSize: 13, marginTop: 4 },
  addressbtn: { justifyContent: "center", marginTop: 25 },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  productImage: { width: 70, height: 70, resizeMode: "contain" },
  productName: { fontWeight: "600", fontSize: 15 },
  inStock: { color: "#A02334", fontSize: 12, marginVertical: 2 },
  productPrice: { fontWeight: "600", fontSize: 16 },
  productQty: {
    fontWeight: "600",
    fontSize: 16,
    color: "#444",
    textAlign: "right",
    paddingLeft: 150,
  },

  sectionTitle: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 23,
    marginTop: 15,
  },

  paymentContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 8,
    marginBottom: 25,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  paymentIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
    marginRight: 10,
  },
  paymentText: { flex: 1, fontSize: 14, color: "#111" },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: { borderColor: "#A02334" },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#A02334",
  },

  totalContainer: { marginBottom: 16 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalRowFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  totalLabel: { color: "#555" },
  totalValue: { color: "#000", fontWeight: "500" },
  orderTotalLabel: { fontWeight: "700", color: "#A02334", fontSize: 25 },
  orderTotalValue: { fontWeight: "700", color: "#A02334", fontSize: 25 },

  confirmButton: {
    backgroundColor: "#A02334",
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

export default Checkout;
