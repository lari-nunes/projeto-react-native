import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlatList, SafeAreaView, Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import imgHP from "../img/imgHP.png";

const PagHome = () => {
  const styles = StyleSheet.create({
    characterContainer: {
      padding: 24,
      backgroundColor: "#fff",
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
      fontWeight: "bold"
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 10
    },
    hp: {
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

  const [harryPotter, setHarryPotter] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    try {
      const { data } = await axios.get("https://hp-api.onrender.com/api/characters", {
        params: {
          limit: 20,
        },
      });
      setHarryPotter(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const CharacterItem = ({ data }) => {
    const imageUrl = data.image || ""; 

    return (
      <View style={styles.characterContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Imagem não disponível</Text>
          </View>
        )}
        <View>
          <Text style={styles.text}>Name: {data.name || "Nome não disponível"}</Text>
          <Text style={styles.text}>Actor: {data.actor || "Ator não disponível"}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.hp} source={imgHP}>
          <StatusBar />
          <Text style={styles.placeholderText}>Carregando página home...</Text>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.hp} source={imgHP}>
        <StatusBar />
        <FlatList
          data={harryPotter}
          renderItem={({ item }) => <CharacterItem data={item} />}
          keyExtractor={(item) => item.name}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PagHome;
