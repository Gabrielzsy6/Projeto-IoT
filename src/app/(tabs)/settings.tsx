import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useProductsContext } from '@/contexts/ProductsContext';

interface Card {
  id: number;
  name: string;
  comodo: string;
  tipo: string;
}

const HomeAutomationConfigScreen: React.FC = () => {
  const { cards, addCard } = useProductsContext();

  const [newCardName, setNewCardName] = useState<string>('');
  const [newCardComodo, setNewCardComodo] = useState<string>('');
  const [newCardTipo, setNewCardTipo] = useState<string>('');

  const addCardHandler = () => {
    if (newCardName && newCardComodo && newCardTipo) {
      const newCard: Card = {
        id: cards.length + 1,
        name: newCardName,
        comodo: newCardComodo,
        tipo: newCardTipo,
      };

      addCard(newCard);

      // Limpar os campos após adicionar o card
      setNewCardName('');
      setNewCardComodo('');
      setNewCardTipo('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Configurações</Text>
        <View style={styles.separator} />
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.title}>Adicione seu produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={newCardName}
          onChangeText={(text) => setNewCardName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Cômodo"
          value={newCardComodo}
          onChangeText={(text) => setNewCardComodo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo do Produto"
          value={newCardTipo}
          onChangeText={(text) => setNewCardTipo(text)}
        />
        <Button title="Adicionar Produto" onPress={addCardHandler} />
      </View>

      {/* Renderização da lista de cartões aqui */}
      {cards.map((card) => (
        <View key={card.id} style={styles.cardContainer}>
          <Text>{`Nome: ${card.name}, Comodo: ${card.comodo}, Tipo: ${card.tipo}`}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#5cc6ba',
  },
  separator: {
    borderBottomColor: '#5cc6ba',
    borderBottomWidth: 1,
    width: 410,
    marginBottom: 20,
  },
  cardContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'column', // Renderiza os filhos em coluna
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  // Outros estilos...
});

export default HomeAutomationConfigScreen;
