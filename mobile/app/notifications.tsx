import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from "expo-router";

const Notifications = () => {
  const router = useRouter();

  const trackingNumber = [
    { id: 1, tracking: "123-TYU", time: "1h ago" },
    { id: 2, tracking: "KG6-WY", time: "1h ago" },
    { id: 3, tracking: "SAN-O1L", time: "1h ago" },
    { id: 4, tracking: "GHE-L1N", time: "1h ago" },
    { id: 5, tracking: "BCV-TY3", time: "1h ago" },
    { id: 6, tracking: "2AC-ZBA", time: "1h ago" }, 
    { id: 7, tracking: "GFH-12F", time: "1h ago" },
    { id: 8, tracking: "KG6-7E", time: "1h ago" },
    { id: 9, tracking: "3VC-F12", time: "1h ago" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={20}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {trackingNumber.map((item) => (
          <View key={item.id} style={styles.notificationCard}>
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Ionicons name="bag-handle-outline" size={28} color="#A02334" />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.notificationText}>
                Your order #{item.tracking} has been confirmed!{"\n"}
                We'll notify you once it's ready for dispatch.
              </Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
    flex: 1,
    textAlign: "center",
    marginRight: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 0.3,
    borderBottomColor: '#ccc',
    marginTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  arrow: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  
  scrollView: {
    paddingVertical: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    marginRight: 10,
  },
  iconBackground: {
    backgroundColor: '#F2E6E8',
    borderRadius: 50,
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14.5,
    color: '#111111',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 12,
    color: '#888888',
  },
});

export default Notifications;
