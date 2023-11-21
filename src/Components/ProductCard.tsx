// ProductCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Card {
  id: number;
  name: string;
  comodo: string;
  tipo: string;
}

const ProductCard: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardItem}>Nome: {card.name}</Text>
      <Text style={styles.cardItem}>Comodo: {card.comodo}</Text>
      <Text style={styles.cardItem}>Tipo: {card.tipo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
  },
  cardItem: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
});

export default ProductCard;
