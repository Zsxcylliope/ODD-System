import {View,Text, StyleSheet,Image,TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import Checkbox from 'expo-checkbox';
import Navbar from "./navbar"; 

const Cart = () => {
  const router = useRouter();
  
  const handleCheckout = () =>{
        router.replace("/checkout")
    };

  // 🧾 Product list
  const products = [
    {
      id: 1,
      image: require("../assets/images/Pain-Reliever.png"),
      name: "Centrum",
      price: 246,
      stock: "In Stock",
    },
    {
      id: 2,
      image: require("../assets/images/Vitamins.png"),
      name: "Conzace",
      price: 246,
      stock: "In Stock",
    },
    {
      id: 3,
      image: require("../assets/images/Allergy-Reliever.png"),
      name: "Ceelin",
      price: 246,
      stock: "In Stock",
    },
    {
      id: 4,
      image: require("../assets/images/Cough,Cold,Flu.png"),
      name: "ImmunPro",
      price: 246,
      stock: "In Stock",
    },
    {
      id: 5,
      image: require("../assets/images/Cough,Cold,Flu.png"),
      name: "Forti-D",
      price: 246,
      stock: "In Stock",
    },
    {
      id: 6,
      image: require("../assets/images/Cough,Cold,Flu.png"),
      name: "Enerven",
      price: 246,
      stock: "In Stock",
    },
  ];

  // ✅ State management
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    Object.fromEntries(products.map(p => [p.id, 1]))
  );

  // 📦 Handle select all toggle
  const handleSelectAll = (value: boolean) => {
    setSelectAll(value);
    setSelectedItems(value ? products.map(p => p.id) : []);
  };

  // 🧩 Handle individual item toggle
  const handleSelectItem = (id: number, value: boolean) => {
    setSelectedItems(prev => 
      value ? [...prev, id] : prev.filter(itemId => itemId !== id)
    );
  };

  // ➕➖ Quantity control
  const handleQuantityChange = (id: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, prev[id] + change)
    }));
  };

  // 🗑 Remove selected items
  const handleDeleteSelected = () => {
    const remainingProducts = products.filter(p => !selectedItems.includes(p.id));
    setProducts(remainingProducts);

    // Remove deleted products from quantities and selection
    const updatedQuantities = { ...quantities };
    selectedItems.forEach(id => delete updatedQuantities[id]);
    setQuantities(updatedQuantities);
    setSelectedItems([]);
    setSelectAll(false);
  };

  // 💰 Calculate total
  const total = selectedItems.reduce(
    (sum, id) => sum + products.find(p => p.id === id)!.price * quantities[id],
    0
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headertext}>Drugs Cart</Text>
        </View>

        {/* Select All */}
        <View style={styles.selectAllContainer}>
          <View style={styles.selectAll}>
          <Checkbox 
            style={styles.checkbox}
            value={selectAll} 
            onValueChange={handleSelectAll} 
            color={selectAll ? "#A02334" : undefined}
          />
          <Text style={styles.selectAllText}>Select All</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={22} color="#A02334" />
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        {products.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Checkbox
              value={selectedItems.includes(item.id)}
              onValueChange={(value) => handleSelectItem(item.id, value)}
              color={selectedItems.includes(item.id) ? "#A02334" : undefined}
            />

            <Image source={item.image} style={styles.itemImage} />
            
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemStock}>{item.stock}</Text>
              <View style={styles.priceQuantity}>
                <Text style={styles.itemPrice}>₱{item.price}</Text>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
                    <Text style={styles.quantityButton}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantities[item.id]}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                    <Text style={styles.quantityButton}>＋</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )
      )
      }
      </ScrollView>

      {/* Checkout */}
      <TouchableOpacity  onPress={handleCheckout} style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Checkout ₱{total.toFixed(2)}</Text>
      </TouchableOpacity>

      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderColor: "#A02334",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    height: 80,
    paddingTop: "10%",
  },
  headertext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111111",
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyItems:"center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  selectAll:{
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllText: {
    fontSize: 16,
    marginLeft: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 8,
    borderBottom: 5,
    shadowColor:"#000",
    shadowOffset:{width:0, height:1},
    shadowOpacity: 0.20,
    shadowRadius:2,
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
    fontWeight: "bold",
    fontSize: 16,
  },
  itemStock: {
    fontSize: 12,
    color: "#A02334",
  },
  priceQuantity:{
    flexDirection:"row",
    justifyContent: "space-between"
  },
  itemPrice: {
    fontSize: 14,
    marginTop: 5,
    fontWeight:"bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 14,
    width: 21,
    textAlign: "center",
    borderRadius:15,
    borderWidth:2,
    borderColor:"#A02334",
    color:"#FFF",
    backgroundColor: "#A02334",
  },
  quantityText: {
    fontSize: 16,
    backgroundColor:"#F0F3F6",
    marginHorizontal: 10,
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
