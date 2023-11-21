import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useProductsContext } from '@/contexts/ProductsContext';

interface Card {
  id: string;
  name: string;
  comodo: string;
  tipo: string;
}

type ProfileStackParamList = {
  Profile: undefined;
  CardDetails: { item: Card };
};

type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Profile'>;
type CardDetailsScreenRouteProp = RouteProp<ProfileStackParamList, 'CardDetails'>;

const Stack = createStackNavigator<ProfileStackParamList>();

const CardDetailsScreen: React.FC<{
  route: CardDetailsScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
}> = ({ route, navigation }) => {
  const { item } = route.params;
  const { cards, setCards } = useProductsContext();

  const handleDelete = () => {
    const updatedCards = cards.filter((card) => card.id !== item.id);
    setCards(updatedCards);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{`Detalhes do Eletrônico: ${item.name}`}</Text>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Deletar Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const Profile: React.FC = () => {
  const { cards, setCards } = useProductsContext();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(cards.length === 0);
  }, [cards]);

  const navigateToDetails = (item: Card) => {
    navigation.navigate('CardDetails', { item });
  };

  const handleDeleteCard = (id: string) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Meu Perfil</Text>
        <View style={styles.separator} />
        <Text style={styles.subheading}>Ver Produtos</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Aguardando seus produtos</Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item: Card) => item.id}
          numColumns={2}
          renderItem={({ item }: { item: Card }) => (
            <TouchableOpacity onPress={() => navigateToDetails(item)}>
              <View style={styles.cardContainer}>
                <Text style={styles.cardText}>{`Nome: ${item.name}`}</Text>
                <Text style={styles.cardText}>{`Comodo: ${item.comodo}`}</Text>
                <Text style={styles.cardText}>{`Tipo: ${item.tipo}`}</Text>
                <TouchableOpacity onPress={() => handleDeleteCard(item.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Deletar Card</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
  subheading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5cc6ba',
  },
  separator: {
    borderBottomColor: '#5cc6ba',
    borderBottomWidth: 1,
    width: '110%',
    marginBottom: 20,
  },
  cardContainer: {
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    backgroundColor: '#fff',
  },
  cardText: {
    marginBottom: 8,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5cc6ba',
    textAlign: 'center',
    marginTop: 20,
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#ff6347',
    padding: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardDetails"
        component={CardDetailsScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerTintColor: '#5cc6ba',
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
