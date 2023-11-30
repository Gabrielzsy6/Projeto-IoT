import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [showCreateAccountFields, setShowCreateAccountFields] = useState<boolean>(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleCreateAccount = () => {
    setShowCreateAccountFields(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setShowCreateAccountFields(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Início</Text>
      <View style={styles.separator} />

      {loggedIn ? (
        <View style={styles.loggedInContainer}>
          <Text style={styles.welcomeText}>Seja bem-vindo, {username}!</Text>
          <View style={styles.additionalTextContainer}>
            <Text style={styles.additionalText}>
              Sinta-se à vontade para explorar e controlar seus dispositivos, criando o ambiente perfeito para cada momento. Estamos aqui para tornar sua experiência ainda mais confortável e prática.
            </Text>
            <Text style={styles.additionalText}>
              Como podemos ajudar hoje?
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.welcomeText}>
            Olá, seja muito bem-vindo ao TechForce
          </Text>
          <Text style={styles.subtitle}>A sua casa na palma da sua mão</Text>

          {showCreateAccountFields ? (
            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Digite seu nome:</Text>
                <TextInput
                  placeholder="Nome"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Digite sua senha:</Text>
                <TextInput
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirme sua senha:</Text>
                <TextInput
                  placeholder="Confirme a senha"
                  secureTextEntry
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton, { alignSelf: 'center' }]}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Faça seu login:</Text>
                <TextInput
                  placeholder="Nome de Usuário"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Digite sua senha:</Text>
                <TextInput
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.loginButton]}
                  onPress={handleLogin}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>ou</Text>
                <TouchableOpacity
                  style={[styles.button, styles.createAccountButton]}
                  onPress={handleCreateAccount}
                >
                  <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#5cc6ba",
  },
  separator: {
    borderBottomColor: "#5cc6ba",
    borderBottomWidth: 1,
    width: 410,
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
    color: "black",
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 30,
    color: "black",
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    textAlign: "center"
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    color: "#5cc6ba",
    padding: 5,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 15,
  },
  orText: {
    marginVertical: 10,
    fontWeight: "700",
  },
  loggedInContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#5cc6ba",
  },
  createAccountButton: {
    backgroundColor: "#5cc6ba",
  },
  logoutButton: {
    backgroundColor: "orange", // Cor do botão "Sair"
    width: "50%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#5cc6ba", // Cor do botão "Confirmar"
    width: "50%", // Ajuste o tamanho conforme necessário
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20, // Ajuste conforme necessário
  },
  logoutText: {
    fontWeight: "700",
    fontSize: 15,
    color: "white",
  },
  additionalTextContainer: {
    marginTop: 20, // Adicionando uma margem superior

  },
  additionalText: {
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Cor do texto adicional após o login
    fontWeight: "700",
  },
});

export default LoginScreen;
