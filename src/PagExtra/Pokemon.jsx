import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlatList, SafeAreaView, Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import imgPoke from "../img/imgPicachu.png";

const Pokemon = () => {
  const styles = StyleSheet.create({
    pokemonContainer: {
      padding: 24,
      backgroundColor: "#F0E68C",
      margin: 16,
      borderRadius: 30,
      flexDirection: "row",
      alignItems: "center",
    },
    container: {
      flex: 1,
    },
    text: {
      color: "#000",
      fontSize: 16,
      marginLeft: 10,
      fontWeight: "bold",
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 10,
    },
    pokemon: {
      width: "100%",
      height: "100%",
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
    },
  });

  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemon = async () => {
    try {
      const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
      setPokemonData(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const PokemonItem = ({ data }) => {
    const pokemonId = data.url.split("/")[6];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    return (
      <View style={styles.pokemonContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Imagem não disponível</Text>
          </View>
        )}
        <View>
          <Text style={styles.text}>Nome: {data.name || "Nome não disponível"}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.pokemon} source={imgPoke}>
          <StatusBar />
          <Text style={styles.placeholderText}>Carregando dados do Pokémon...</Text>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.pokemon} source={imgPoke}>
        <StatusBar />
        <FlatList
          data={pokemonData}
          renderItem={({ item }) => <PokemonItem data={item} />}
          keyExtractor={(item) => item.name}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Pokemon;
