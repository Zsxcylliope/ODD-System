import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import Navbar from "./navbar";

const MOCancelled = () => {
  const router = useRouter();

  const delivery = [
    { 
      id: 1, 
      reason: "Pickup was unsuccessful", 
      tracking: "GFJE-RKTG",
      image: require("../assets/images/otriven.jpeg"),
      name: "Otriven 0.05% Nasenspray 10 ML",
      volume: "10ml",
      boughtqt: "x1",
      price: "100.00",
      quantity: 1,
      totalprice: "100.00",
    },
  ];

  const [selectedTab, setSelectedTab] = useState("CANCELLED");

  const handleTabPress = (tab) => {
    setSelectedTab(tab);

    // Navigate based on the tab clicked
    if (tab === "TO RECEIVE") {
      router.replace("/moreceive");
    } else if (tab === "COMPLETED") {
      router.replace("/mocompleted");
    } else if (tab === "CANCELLED") {
      router.replace("/mocancelled");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["TO RECEIVE", "COMPLETED", "CANCELLED"].map((tab) => (
          <TouchableOpacity key={tab}
            style={[styles.tabButton,selectedTab === tab && styles.activeTabButton]}
            onPress={() => handleTabPress(tab)}
          >
            <Text 
              style={[styles.tabText, selectedTab === tab && styles.activeTabText            ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {delivery.map((item) => (
          <View key={item.id} style={styles.deliveryCard}>
            <View style={styles.deliveryHeader}>
              <Ionicons name="alert-circle-outline" size={16} color="#A0A0A0" />
              <Text style={styles.reason}>{item.reason}</Text>
              <View style={styles.trackingContainer}>
                <Text style={styles.trackingText}>{item.tracking}</Text>
              </View>
            </View>

            {/* Item Info */}
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemVolume}>{item.volume}</Text>
                    <Text style={styles.itemQty}>{item.boughtqt}</Text>
                  </View>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
              </View>
            </View>

            {/* Summary Line */}
            <View style={styles.summaryRow}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.itemCount}>{item.quantity > 1 ? `${item.quantity} Items` : "1 Item"}</Text>
                <Text style={{ color: "grey", alignItems: "center" }}>  |  </Text>
                <Text style={styles.totalPrice}> {item.totalprice} Php</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={18} color="#A02334" />
            </View>
          </View>
        ))}
      </ScrollView>

      <Navbar />
    </SafeAreaView>
  );
};

export default MOCancelled;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F3F4", // MAIN background color
  },
  header: {
    backgroundColor: "#A02334",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F2F3F4",
    paddingVertical: 20,
    marginBottom: 5,
  },
  tabButton: {
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderColor: "#fff", // border color sa receive, completed, cancelled
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  activeTabButton: {
    backgroundColor: "#DF1C41",
    borderColor: "#A02334",
  },
  tabText: {
    color: "#555", // text color sa receive, completed, cancelled NA WA GI TUPLOK
    fontWeight: "600",
    fontSize: 13,
  },
  activeTabText: {
    color: "#FFF",
  },
  scrollView: {
    paddingBottom: 80,
  },
  deliveryCard: {
    backgroundColor: "#FFF",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginBottom: 10,
  },
  deliveryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 8,    
  },
  reason: {
    flex: 1,
    marginLeft: 6,
    fontSize: 13,
    color: "#333",
  },
  trackingContainer: {
    backgroundColor: "#EAF7EF",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  trackingText: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "600",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 15,  
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemVolume: {
    fontSize: 13,
    color: "#555",
  },
  itemQty: {
    fontSize: 13,
    color: "#DF1C41",
    marginLeft: 10,
  },
  itemPrice: {
    fontSize: 13,
    color: "#111",
    marginTop: 3,
    textAlign: "right",
    marginRight: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  itemCount: {
    color: "#DF1C41",
    fontSize: 13,
    fontWeight: "600",
  },
  totalPrice: {
    color: "#DF1C41",
    fontWeight: "700",
    fontSize: 14,
  },
});
