import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProductCardProps {
  image: any;
  name: string;
  rating: number;
  price: number;
  onOrderPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, rating, price, onOrderPress }) => {
  // ⭐ Render multiple stars dynamically
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Ionicons key={i} name="star" size={16} color="#A02334" style={{ marginRight: 2 }} />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<Ionicons key={i} name="star-half" size={16} color="#A02334" style={{ marginRight: 2 }} />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={16} color="#A02334" style={{ marginRight: 2 }} />);
      }
    }

    return <View style={styles.starContainer}>{stars}</View>;
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <View style={styles.starContainer}>{renderStars()}</View>
        <Text style={styles.price}>₱{price.toFixed(2)}</Text>
        <View style={styles.addtocart}>
        <TouchableOpacity style={styles.orderButton} onPress={onOrderPress}>
          <Text style={styles.orderText}>Order Now</Text>
        </TouchableOpacity>
        <Ionicons name="cart-outline" size={24} color="#A02334" style={{paddingLeft:8 }}  />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    paddingVertical: 10,
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 15,
  },
  textContainer: {
    alignItems: 'left',
    marginTop: 6,
    paddingLeft:12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    color: '#333',
    marginBottom: 4,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A02334',
  },
  addtocart:{
    marginTop:20,
    flexDirection:"row",
    justifyContent: 'start',
    alignItems:"center",
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DF1C41',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    width: '20%,'
  },
  orderText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  
});

export default ProductCard;
