// CharacterDetails.js

import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";

const DetailsHarryPotter = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `https://hp-api.onrender.com/api/character/${characterId}`
        );
        setCharacter(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacter();
  }, [characterId]);

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
      <Image source={{ uri: character.image }} style={styles.image} />
      <View>
        <Text style={styles.text}>Nome: {character.name}</Text>
        <Text style={styles.text}>Ator: {character.actor}</Text>
        {/* Adicione mais detalhes do personagem conforme necessário */}
      </View>
    </View>
  );
};

export default DetailsHarryPotter;
