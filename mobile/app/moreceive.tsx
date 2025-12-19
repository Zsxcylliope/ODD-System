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

const MOReceive = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("TO RECEIVE");
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  /* ================= LOAD TO RECEIVE ORDERS ================= */
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_BASE_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data.filter((o: any) => o.status === "to_receive"));
      } catch (err) {
        console.log("Load orders error:", err);
      }
    };

    loadOrders();
  }, []);

  /* ================= TAB HANDLER ================= */
  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);

    if (tab === "TO RECEIVE") router.replace("/moreceive");
    if (tab === "COMPLETED") router.replace("/mocompleted");
    if (tab === "CANCELLED") router.replace("/mocancelled");
  };

  /* ================= STATUS UPDATE HANDLER ================= */
  const updateOrderStatus = async (status: "completed" | "cancelled") => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token || !selectedOrder) return;

      await axios.patch(
        `${API_BASE_URL}/orders/${selectedOrder._id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 🔥 REMOVE FROM CURRENT LIST IMMEDIATELY
      setOrders(prev => prev.filter(o => o._id !== selectedOrder._id));

      setShowModal(false);

      router.replace(
        status === "completed" ? "/mocompleted" : "/mocancelled"
      );
    } catch (err) {
      console.log("Update status error:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        {["TO RECEIVE", "COMPLETED", "CANCELLED"].map(tab => (
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

      {/* ORDER LIST */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {orders.map(order => (
          <View key={order._id} style={styles.deliveryCard}>
            <View style={styles.deliveryHeader}>
              <Ionicons name="hourglass-outline" size={16} color="#A0A0A0" />
              <Text style={styles.description}>Estimated delivery: 1–2 days</Text>
              <View style={styles.trackingContainer}>
                <Text style={styles.trackingText}>{order._id}</Text>
              </View>
            </View>

            <View style={styles.itemContainer}>
              <Image
                source={{ uri: order.items[0].image }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{order.items[0].name}</Text>
                <Text style={styles.itemPrice}>₱{order.items[0].price}</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.itemCount}>
                {order.items.length} Item(s)
              </Text>

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
        ))}
      </ScrollView>

      {/* ================= MODAL ================= */}
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

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.receiveBtn}
                    onPress={() => updateOrderStatus("completed")}
                  >
                    <Text style={{ color: "#FFF" }}>Receive Order</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => updateOrderStatus("cancelled")}
                  >
                    <Text style={{ color: "#FFF" }}>Cancel Order</Text>
                  </TouchableOpacity>
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

  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },

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
    marginBottom: 10,
  },

  description: { flex: 1, marginLeft: 6, fontSize: 13 },

  trackingContainer: {
    backgroundColor: "#EAF7EF",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },

  trackingText: { color: "#4CAF50", fontSize: 12, fontWeight: "600" },

  itemContainer: { flexDirection: "row", alignItems: "center" },

  itemImage: { width: 60, height: 60, marginRight: 10 },

  itemDetails: { flex: 1 },

  itemName: { fontSize: 14, fontWeight: "600" },

  itemPrice: { fontSize: 13 },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  itemCount: { color: "#DF1C41", fontWeight: "600" },

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
    marginBottom: 10,
  },

  cartTotalLabel: { fontSize: 16, fontWeight: "700" },

  cartTotalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#A02334",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  receiveBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },

  cancelBtn: {
    backgroundColor: "#DF1C41",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});

export default MOReceive;