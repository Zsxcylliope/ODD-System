import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCart } from "../lib/CartContext";

interface ProductCardProps {
  id: string;
  image: ImageSourcePropType | { uri: string };
  name: string;
  rating: number;
  price: number;
  stock: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  rating,
  price,
  stock,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const outOfStock = stock === 0;

  const handleOrderNow = () => {
    if (outOfStock) return;

    const imageUri =
      typeof image === "number"
        ? Image.resolveAssetSource(image).uri
        : image.uri;

    addToCart({
      _id: id,
      name,
      price,
      image: imageUri,
    });

    router.replace("/cart");
  };


  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Ionicons key={i} name="star" size={16} color="#A02334" />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(
          <Ionicons key={i} name="star-half" size={16} color="#A02334" />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={16} color="#A02334" />
        );
      }
    }

    return <View style={styles.starContainer}>{stars}</View>;
  };

  return (
    <View style={[styles.card, outOfStock && styles.outOfStockCard]}>
      {/* STOCK BADGE */}
      <View
        style={[
          styles.stockBadge,
          outOfStock ? styles.stockOut : styles.stockIn,
        ]}
      >
        <Text style={styles.stockText}>
          {outOfStock ? "OUT OF STOCK" : "IN STOCK"}
        </Text>
      </View>

      <Image source={image} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        {renderStars()}

        <Text style={styles.price}>₱{price.toFixed(2)}</Text>

        <View style={styles.addtocart}>
          <TouchableOpacity
            style={[
              styles.orderButton,
              outOfStock && styles.disabledButton,
            ]}
            onPress={handleOrderNow}
            activeOpacity={outOfStock ? 1 : 0.8}
          >
            <Text style={styles.orderText}>
              {outOfStock ? "Unavailable" : "Order Now"}
            </Text>
          </TouchableOpacity>

          <Ionicons
            name="cart-outline"
            size={24}
            color={outOfStock ? "#999" : "#A02334"}
            style={{ marginLeft: 8 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 4,
    paddingVertical: 10,
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 15,
  },
  textContainer: {
    marginTop: 6,
    paddingHorizontal: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A02334",
  },
  addtocart: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  orderButton: {
    backgroundColor: "#DF1C41",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  orderText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  outOfStockCard: {
  opacity: 0.6,
  },

  stockBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 10,
  },

  stockIn: {
    backgroundColor: "#16A34A",
  },

  stockOut: {
    backgroundColor: "#DC2626",
  },

  stockText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  disabledButton: {
    backgroundColor: "#9CA3AF",
  },

});

export default ProductCard;
