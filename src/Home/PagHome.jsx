import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlatList, SafeAreaView, Text, View, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

const PagHome = () => {
  const styles = StyleSheet.create({
    pokemonContainer: {
      padding: 24,
      backgroundColor: "#fff",
      margin: 16,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    container: {
      backgroundColor: "#CE6D11",
      flex: 1,
    },
    text: {
      color: "#000",
      fontSize: 16,
      marginLeft: 10,
    },
    image: {
      width: 50,
      height: 50,
    },
  });

  const [pokemon, setPokemon] = useState([]);

  const fetchPokemon = async () => {
    try {
      const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      setPokemon(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const PokemonItem = ({ data }) => {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(data.url)}.png`;
  
    let types = "";
    if (data.types && data.types.length > 0) {
      types = data.types.map(typeObj => typeObj.type.name).join(", ");
    }
  
    return (
      <View style={styles.pokemonContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View>
          <Text style={styles.text}>Name: {data.name}</Text>
          <Text style={styles.text}>Type: {types}</Text>
        </View>
      </View>
    );
  };

  const getPokemonIdFromUrl = (url) => {
    const segments = url.split("/");
    return segments[segments.length - 2];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <FlatList 
        data={pokemon} 
        renderItem={({ item }) => <PokemonItem data={item} />} 
        keyExtractor={(item) => item.name} 
      />
    </SafeAreaView>
  );
};

export default PagHome;