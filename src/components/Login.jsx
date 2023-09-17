import React, { useState } from "react";
import { TextInput, StyleSheet, Alert, Text, View, ImageBackground, Image } from "react-native";
import imgHP from "../img/imgHP00.png";

import MyButton from "./MyButton";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1, 
  },
  title: {
    color: "#fff",
    fontSize: 26,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: "bold"
  },
  input: {
    borderWidth: 1.5,
    width: 300,
    borderRadius: 10,
    height: 50,
    fontSize: 18,
    marginBottom: 25,
    borderColor: "#fff",
    backgroundColor: "#fff",
    paddingHorizontal: 10, 
  },
  image: {
  
  },
  hp: {
    width: "100%",
    height: "100%",
    flex: 1, 
  }
});

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password && email === "teste@gmail.com" && password === "teste123") {
      Alert.alert('Login bem-sucedido', 'Para qual página você deseja ir?', [
        {
          text: "Home",
          onPress: () => navigation.navigate("PagHome"),
        },
        {
          text: "Página extra",
          onPress: () => navigation.navigate("Pokemon"),
        },
      ]);
    } else if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
    } else {
      Alert.alert('Erro', 'Login incorreto!');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.hp} source={imgHP}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <MyButton title="Login" onPress={handleLogin} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
