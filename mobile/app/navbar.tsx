import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const navItems: Array<{
    name: string;
    icon: string;
    activeIcon: string;
    route: string;
  }> = [
    { name: "Home", icon: "home-outline", activeIcon: "home", route: "/home" },
    { name: "Search", icon: "search-outline", activeIcon: "search", route: "/search" },
    { name: "Cart", icon: "cart-outline", activeIcon: "cart", route: "/cart" },
    { name: "Transaction", icon: "reader-outline", activeIcon: "reader", route: "/moreceive" },
    { name: "Profile", icon: "person-outline", activeIcon: "person", route: "/profile" },
  ];

  return (
    <View style={styles.navigation}>
      {navItems.map((item) => {
        // ✅ Make Transaction icon active for all transaction-related pages
        const transactionRoutes = ["/moreceive", "/mocompleted", "/mocancelled"];
        const isTransactionPage = transactionRoutes.includes(pathname);
        const isActive =
          item.name === "Transaction" ? isTransactionPage : pathname === item.route;

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
    paddingVertical: 10,
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
