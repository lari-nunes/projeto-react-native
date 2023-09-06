// CharacterDetails.js

import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const DetailsHarryPotter = () => {
  const route = useRoute();
  const {id} = route.params;
  const [character, setCharacter] = useState([]);

  const fetchCharacter = async () => {
    try {
      const response = await axios.get(
        `https://hp-api.onrender.com/api/character/${id}`
      );
      setCharacter(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCharacter()
  }, []);

  console.log(character)

  const styles = StyleSheet.create({
    characterContainer: {
      padding: 24,
      backgroundColor: "#fff",
      margin: 16,
      borderRadius: 30,
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      color: "#000",
      fontSize: 16,
      marginLeft: 10,
      fontWeight: "bold",
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 10,
    },
  });

  if (!character) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.characterContainer}>
      {character.map((item) => (
        <>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View>
            <Text style={styles.text}>Nome: {item.name}</Text>
            <Text style={styles.text}>Ator: {item.actor}</Text>
            <Text>Adicione mais detalhes do personagem conforme necessário</Text>
          </View>
        </>
      ))}
    </View>
  );
};

export default DetailsHarryPotter;
