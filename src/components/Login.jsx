import React, { useState } from "react";
import { TextInput, SafeAreaView, StyleSheet, Alert, Text, View, Button, Image} from "react-native";
import imgPoke from "../img/pokemonlogo.png"
import MyButton from "./MyButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F67E4A",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    borderWidth: 1.5,
    width: 300,
    borderRadius: 10,
    height: 50,
    fontSize: 18,
    marginBottom: 25,
  },
  image: {
    width:"100%",
    height:"18%",
    resizeMode:"contain",
  }
});

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password && email === "larissa@gmail.com" && password === "larissa123") {
      Alert.alert('Login bem-sucedido', 'Você fez login com sucesso!');
      return navigation.replace("PagHome"); 
    } else if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
    } else {
      Alert.alert('Erro', 'Login incorreto!');
    }
  };
  
  return (
    <View style={styles.container}>
       <Image source={imgPoke} 
       style={styles.image} 
       />
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
