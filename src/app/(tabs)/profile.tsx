import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Alert 
} from 'react-native';
import { 
  useNavigation, 
  RouteProp 
} from '@react-navigation/native';
import { 
  createStackNavigator, 
  StackNavigationProp 
} from '@react-navigation/stack';
import { useProductsContext } from '@/contexts/ProductsContext';

interface Card {
  id: number;
  name: string;
  comodo: string;
  tipo: string;
}

type ProfileStackParamList = {
  Profile: undefined;
  CardDetails: { item: Card };
  Temperature: undefined; // Adicionando a nova rota 'Temperature'
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
  const [isOn, setIsOn] = useState(false);
  const [mode, setMode] = useState('Modo A');

  const handleDelete = () => {
    const updatedCards = cards.filter((card) => card.id !== item.id);
    setCards(updatedCards);
    navigation.goBack();
  };

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  const handleChangeMode = () => {
    setMode((prevMode) => (prevMode === 'Modo A' ? 'Modo B' : 'Modo A'));
  };

  const [intensityLevel, setIntensityLevel] = useState(1);

const increaseIntensity = () => {
  if (intensityLevel < 5) {
    setIntensityLevel(prevLevel => prevLevel + 1);
  } else {
    setIntensityLevel(1); // Volta ao primeiro nível se atingir o máximo
  }
};

  const toggleButtonStyles = (isOn: boolean) => ({
    width: '40%',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: isOn ? '#FF0000' : '#1DD41E' ,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{`Detalhes do Eletrônico: ${item.name}`}</Text>
      <View style={styles.productName}>
        <Text style={styles.productNameText}>{item.name}</Text>
      </View>
      <View style={styles.separator} />
      <TouchableOpacity onPress={handleToggle} style={toggleButtonStyles(isOn)}>
        <Text style={styles.toggleButtonText}>{isOn ? 'Desligado' : 'Ligado'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleChangeMode} style={styles.changeModeButton}>
        <Text style={styles.changeModeButtonText}>{`Trocar Modo (${mode})`}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Deletar Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const TemperatureScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [temperature, setTemperature] = useState('');

  const handleSubmit = () => {
    const temp = parseFloat(temperature);
    console.log('Temperatura atual:', temp);
    if (!isNaN(temp) && temp > 30) {
      Alert.alert(
        'Atenção!',
        'A temperatura está acima de 30 graus. Recomenda-se ligar o ar-condicionado.'
      );
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Informe a Temperatura</Text>
      <TextInput
        style={styles.input}
        value={temperature}
        onChangeText={(text) => setTemperature(text)}
        placeholder="Digite a temperatura"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Enviar</Text>
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

  const navigateToTemperatureScreen = () => {
    navigation.navigate('Temperature');
  };

  const handleDeleteCard = (id: number) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Meu Perfil</Text>
        <View style={styles.separator} />
        <Text style={styles.subheading}>Ver Produtos</Text>
        <TouchableOpacity onPress={navigateToTemperatureScreen} style={styles.temperatureButton}>
          <Text style={styles.temperatureButtonText}>Verificar Temperatura</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Aguardando seus produtos</Text>
      ) : (
       <FlatList
  data={cards}
  keyExtractor={(item: Card) => item.id.toString()}
  numColumns={2}
  renderItem={({ item }: { item: Card }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>{`Nome: ${item.name}`}</Text>
        <Text style={styles.cardText}>{`Comodo: ${item.comodo}`}</Text>
        <Text style={styles.cardText}>{`Tipo: ${item.tipo}`}</Text>
        <TouchableOpacity
          onPress={() => handleDeleteCard(item.id)}
          style={{ ...styles.deleteButton, marginTop: 4, padding: 6 }}
        >
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
  productName: {
    alignItems: 'center',
    marginBottom: 10,
  },
  productNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  cardContainer: {
    margin: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 'auto', // Definir a largura automática para permitir o preenchimento total da tela
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
  temperatureButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  temperatureButtonText: {
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#5cc6ba',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  toggleButton: {
    width: '40%',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  changeModeButton: {
    width: '35%',
    marginBottom: 20,
    backgroundColor: '#2684FC',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeModeButtonText: {
    color: '#fff',
    fontSize: 16,
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
      <Stack.Screen
        name="Temperature"
        component={TemperatureScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
