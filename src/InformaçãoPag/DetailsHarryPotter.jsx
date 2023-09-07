import SplashScreen from 'react-native-splash-screen';
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ImageBackground, ButtonGoBack, TouchableOpacity } from "react-native";
import axios from "axios";
import imgHP from "../img/imgHP44.png";
import { useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  characterContainer: {
    padding: 40,
    backgroundColor: "transparent",
    margin: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 150,
  },
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#000",
    fontSize: 16,
    borderRadius: 10,
    fontWeight: "bold",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 10,
    marginTop: 10
  },
  hp: {
    width: "100%",
    height: "100%",
  },
  containerText: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 10,
    padding: 10
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc", 
  },
  placeholderText: {
    color: "#000",
    fontSize: 12,
  }
});

const DetailsHarryPotter = ({navigation}) => {
  const route = useRoute();
  const {id} = route.params;
  const [character, setCharacter] = useState([]);

  const fetchCharacter = async () => {
    try {
      const response = await axios.get(`https://hp-api.onrender.com/api/character/${id}`);
      setCharacter(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCharacter()
  }, []);

  console.log(character)

  if (!character) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <ImageBackground style={styles.hp} source={imgHP}>
        <View style={styles.characterContainer}>
          {character.map((item, index) => (
            <View key={index}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.containerText}>
                <Text style={styles.text}>Nome: {item.name || "Nome não disponível"}</Text>
                <Text style={styles.text}>Ator: {item.actor || "Ator não disponível"}</Text>
                <Text style={styles.text}>Casa: {item.house || "Casa não disponível"}</Text>
                <Text style={styles.text}>Data de Nascimento: {item.dateOfBirth || "Data de nascimento não disponível"}</Text>
              </View>
            </View>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

export default DetailsHarryPotter;
