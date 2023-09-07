import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlatList, SafeAreaView, Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import imgHP from "../img/imgHP.png";

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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  paginationButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  paginationButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});


const PagHome = ({navigation}) => {
  const [harryPotter, setHarryPotter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCharacters = async (page) => {
    try {
      const { data } = await axios.get(`https://hp-api.onrender.com/api/characters?limit=20&page=${page}`);
      setHarryPotter(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const CharacterItem = ({ data }) => {
    const imageUrl = data.image || ""; 

    const handleCharacterPress = () => {
      const characterId = data.id
      navigation.navigate("DetailsHarryPotter", {id: characterId});
    };

    return (
      <TouchableOpacity onPress={handleCharacterPress}>
      <View style={styles.characterContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Imagem não disponível</Text>
          </View>
        )}
        <View>
          <Text style={styles.text}>Nome: {data.name || "Nome não disponível"}</Text>
          <Text style={styles.text}>Ator: {data.actor || "Ator não disponível"}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={handlePrevPage}
            disabled={currentPage === 1}
          >
            <Text style={styles.paginationButtonText}>Anterior</Text>
          </TouchableOpacity>
          <Text style={styles.paginationText}>Página {currentPage}</Text>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={handleNextPage}
          >
            <Text style={styles.paginationButtonText}>Próxima</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PagHome;
