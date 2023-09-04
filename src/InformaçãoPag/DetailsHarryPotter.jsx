import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";

const DetailsHarryPotter = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);

  const fetchCharacter = async () => {
    try {
      const { data } = await axios.get(`https://hp-api.onrender.com/api/character/`);
      console.log("Dados do personagem:", data); 
      setCharacter(data[0]);
    } catch (error) {
      console.log("Erro ao buscar o personagem:", error); 
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [characterId]);

  if (!character) {
    return (
      <View>
        <Text>Carregando detalhes do personagem...</Text>
      </View>
    );
  }

  return (
    <View>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text>Name: {character.name}</Text>
      <Text>Actor: {character.actor}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});

export default DetailsHarryPotter;
