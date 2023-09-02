import React, { useState } from "react";
import { TextInput, StyleSheet, Alert, Text, View, Button, Image, ImageBackground} from "react-native";
  import imgHP from "../img/imgHP.png";
import MyButton from "./MyButton";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#742E2E",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
    color: "#fff"
  },
  title: {
    color: "#fff",
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
    marginBottom: 25
  },
  image: {
    width:"100%",
    height:"18%",
    resizeMode:"contain",
  },
  hp: {
    width:"100%",
    height:"100%"
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
        <ImageBackground style={styles.hp}
        source={imgHP}
        >
     <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex:1
     }}>
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
