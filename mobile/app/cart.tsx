import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";

import { useCart } from "../lib/CartContext";
import Navbar from "./navbar";

const Cart = () => {
  const router = useRouter();
  const {
    cart,
    updateQuantity,
    toggleSelect,
    selectAll,
    unselectAll,
    removeSelected,
    total,
  } = useCart();

  const allSelected =
    cart.length > 0 && cart.every((item) => item.selected);

  const handleToggleAll = (value: boolean) => {
    value ? selectAll() : unselectAll();
  };

  const handleDeleteSelected = () => {
    if (!cart.some((item) => item.selected)) return;

    Alert.alert(
      "Delete Selected",
      "Remove all selected items from cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: removeSelected,
        },
      ]
    );
  };

  const handleCheckout = () => {
    if (total === 0) return;
    router.push("/checkout");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Drugs Cart</Text>
        </View>

        {/* SELECT ALL + DELETE */}
        <View style={styles.selectAllContainer}>
          <View style={styles.selectAllRow}>
            <Checkbox
              value={allSelected}
              onValueChange={handleToggleAll}
              color={allSelected ? "#A02334" : undefined}
            />
            <Text style={styles.selectAllText}>Select All</Text>
          </View>

          <TouchableOpacity onPress={handleDeleteSelected}>
            <Ionicons
              name="trash-outline"
              size={22}
              color="#A02334"
            />
          </TouchableOpacity>
        </View>

        {/* EMPTY STATE */}
        {cart.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="cart-outline" size={60} color="#999" />
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        )}

        {/* CART ITEMS */}
        {cart.map((item) => (
          <View key={item._id} style={styles.cartItem}>
            <Checkbox
              value={item.selected}
              onValueChange={() => toggleSelect(item._id)}
              color={item.selected ? "#A02334" : undefined}
            />

            <Image
              source={{ uri: item.image }}
              style={styles.itemImage}
            />

            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>

              <View style={styles.priceQuantity}>
                <Text style={styles.itemPrice}>₱{item.price}</Text>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    <Text style={styles.quantityButton}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantityText}>
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    <Text style={styles.quantityButton}>＋</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* CHECKOUT */}
      <TouchableOpacity
        style={[
          styles.checkoutButton,
          total === 0 && { backgroundColor: "#999" },
        ]}
        onPress={handleCheckout}
        disabled={total === 0}
      >
        <Text style={styles.checkoutText}>
          Checkout ₱{total.toFixed(2)}
        </Text>
      </TouchableOpacity>

      <Navbar />
    </SafeAreaView>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  selectAllContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },

  selectAllRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  selectAllText: {
    fontSize: 16,
    marginLeft: 10,
  },

  empty: {
    alignItems: "center",
    marginTop: 80,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },

  itemImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginHorizontal: 10,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },

  priceQuantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  itemPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#A02334",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  quantityButton: {
    fontSize: 14,
    width: 22,
    height: 22,
    textAlign: "center",
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#A02334",
    backgroundColor: "#A02334",
    color: "#fff",
  },

  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },

  checkoutButton: {
    backgroundColor: "#DF1C41",
    margin: 15,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 100,
  },

  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cart;