import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import schoolsData from "./assets/table_lycee.json";
import { FontAwesome } from "@expo/vector-icons";

export default function SearchSchools({ navigation }) {
  const [filteredData, setFilteredData] = useState(schoolsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = schoolsData.filter(
      (school) =>
        school.name.toLowerCase().includes(query.toLowerCase()) ||
        school.ville.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const toggleFavorite = (item) => {
    if (favorites.includes(item.identifiant_de_l_etablissement)) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== item.identifiant_de_l_etablissement)
      );
    } else {
      setFavorites((prevFavorites) => [
        item.identifiant_de_l_etablissement,
        ...prevFavorites,
      ]);
    }
  };

  const navigateToDetail = (item) => {
    navigation.navigate("SchoolDetail", {
      name: item.name,
      ville: item.ville,
      latitude: item.latitude,
      longitude: item.longitude,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetail(item)}>
      <View style={styles.resultItem}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.resultText}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.resultText}>
            {item.ville}
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <FontAwesome
            name={
              favorites.includes(item.identifiant_de_l_etablissement)
                ? "heart"
                : "heart-o"
            }
            size={20}
            color="#ff69b4"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Sort the filteredData based on favorites
  const sortedFilteredData = [...filteredData].sort((a, b) => {
    const aIsFavorite = favorites.includes(a.identifiant_de_l_etablissement);
    const bIsFavorite = favorites.includes(b.identifiant_de_l_etablissement);

    if (aIsFavorite && !bIsFavorite) {
      return -1;
    } else if (!aIsFavorite && bIsFavorite) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher par établissement ou ville ...."
        placeholderTextColor="#fff"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={sortedFilteredData}
        keyExtractor={(item) => item.identifiant_de_l_etablissement}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
    paddingTop: 80,
  },
  searchInput: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    color: "#fff",
  },
  resultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  resultText: {
    fontSize: 16,
    color: "#fff",
  },
});
