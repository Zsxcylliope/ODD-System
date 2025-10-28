import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const navItems = [
    { name: "Home", icon: "home-outline", activeIcon: "home", route: "/dashboard" },
    { name: "Search", icon: "search-outline", activeIcon: "search", route: "/search" },
    { name: "Cart", icon: "cart-outline", activeIcon: "cart", route: "/cart" },
    { name: "Transaction", icon: "receipt-outline", activeIcon: "receipt", route: "/transaction" },
    { name: "Profile", icon: "person-outline", activeIcon: "person", route: "/profile" },
  ];

  return (
    <View style={styles.navigation}>
      {navItems.map((item) => {
        const isActive = pathname === item.route;
        const isHovered = hovered === item.name;

        return (
          <TouchableOpacity
            key={item.name}
            onPress={() => router.replace(item.route)}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
            style={[
              styles.navItem,
              isActive && styles.activeNavItem,
              isHovered && !isActive && styles.hoverNavItem,
            ]}
          >
            <Ionicons
              name={isActive ? item.activeIcon : item.icon}
              size={28}
              color={isActive ? "#A02334" : isHovered ? "#DF1C41" : "#888"}
            />
            <Text style={[styles.navText, { color: isActive ? "#A02334" : "#888" }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: "#ffffff",
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: "#A02334",
  },
  hoverNavItem: {
    transform: [{ scale: 1.1 }],
  },
});

export default Navbar;
