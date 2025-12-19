import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Navbar from "./navbar";

const API_BASE_URL = "http://192.168.1.13:3000/api";

const MOCancelled = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("CANCELLED");
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  /* ================= LOAD CANCELLED ORDERS ================= */
  useEffect(() => {
    const loadCancelledOrders = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_BASE_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data.filter((o: any) => o.status === "cancelled"));
      } catch (err) {
        console.log("Load cancelled orders error:", err);
      }
    };

    loadCancelledOrders();
  }, []);

  /* ================= TAB HANDLER ================= */
  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);

    if (tab === "TO RECEIVE") router.replace("/moreceive");
    if (tab === "COMPLETED") router.replace("/mocompleted");
    if (tab === "CANCELLED") router.replace("/mocancelled");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        {["TO RECEIVE", "COMPLETED", "CANCELLED"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ORDERS LIST */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {orders.map((order) => {
          const firstItem = order.items[0];

          return (
            <View key={order._id} style={styles.deliveryCard}>
              <View style={styles.deliveryHeader}>
                <Ionicons
                  name="alert-circle-outline"
                  size={16}
                  color="#A0A0A0"
                />
                <Text style={styles.reason}>
                  Order Cancelled
                </Text>
                <View style={styles.trackingContainer}>
                  <Text style={styles.trackingText}>{order._id}</Text>
                </View>
              </View>

              {/* ITEM PREVIEW */}
              <View style={styles.itemContainer}>
                <Image
                  source={{ uri: firstItem.image }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{firstItem.name}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={styles.itemRow}>
                      <Text style={styles.itemVolume}>Qty</Text>
                      <Text style={styles.itemQty}>
                        x{firstItem.quantity}
                      </Text>
                    </View>

                    <Text style={styles.itemPrice}>
                      ₱{firstItem.price.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* SUMMARY */}
              <View style={styles.summaryRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.itemCount}>
                    {order.items.length} Item(s)
                  </Text>
                  <Text style={{ color: "grey" }}>  |  </Text>
                  <Text style={styles.totalPrice}>
                    ₱{order.total.toFixed(2)}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={18}
                    color="#A02334"
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* ================= MODAL (VIEW ONLY) ================= */}
      <Modal visible={showModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Order Information</Text>

                <ScrollView style={{ maxHeight: 260 }}>
                  {selectedOrder?.items.map((item: any, index: number) => (
                    <View key={index} style={styles.cartRow}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.cartImage}
                      />

                      <View style={styles.cartInfo}>
                        <Text style={styles.cartName}>{item.name}</Text>

                        <View style={styles.cartBottomRow}>
                          <Text style={styles.cartQty}>
                            Qty: {item.quantity}
                          </Text>
                          <Text style={styles.cartSubtotal}>
                            ₱{(item.price * item.quantity).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.cartDivider} />

                <View style={styles.cartTotalRow}>
                  <Text style={styles.cartTotalLabel}>Total</Text>
                  <Text style={styles.cartTotalValue}>
                    ₱{selectedOrder?.total.toFixed(2)}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Navbar />
    </SafeAreaView>
  );
};

export default MOCancelled;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F3F4" },

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
    paddingTop: 20,
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },

  tabButton: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },

  activeTabButton: { backgroundColor: "#DF1C41" },

  tabText: { fontSize: 13, fontWeight: "600", color: "#555" },

  activeTabText: { color: "#FFF" },

  scrollView: { paddingBottom: 80 },

  deliveryCard: {
    backgroundColor: "#FFF",
    padding: 14,
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

  trackingText: { color: "#4CAF50", fontSize: 12, fontWeight: "600" },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 15,
  },

  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },

  itemDetails: { flex: 1 },

  itemName: { fontSize: 14, fontWeight: "600", color: "#111" },

  itemRow: { flexDirection: "row", alignItems: "center" },

  itemVolume: { fontSize: 13, color: "#555" },

  itemQty: { fontSize: 13, color: "#DF1C41", marginLeft: 10 },

  itemPrice: { fontSize: 13, color: "#111", marginRight: 10 },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  itemCount: { color: "#DF1C41", fontWeight: "600" },

  totalPrice: { color: "#DF1C41", fontWeight: "700", fontSize: 14 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },

  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  cartImage: { width: 55, height: 55, marginRight: 12 },

  cartInfo: { flex: 1 },

  cartName: { fontSize: 15, fontWeight: "600", marginBottom: 6 },

  cartBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cartQty: { fontSize: 13, color: "#555" },

  cartSubtotal: { fontSize: 14, fontWeight: "600" },

  cartDivider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 12,
  },

  cartTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cartTotalLabel: { fontSize: 16, fontWeight: "700" },

  cartTotalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#A02334",
  },
});
