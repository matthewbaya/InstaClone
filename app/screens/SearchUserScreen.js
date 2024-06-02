import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  View,
} from "react-native";

export default function SearchUserScreen() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([
    "matthew",
    "itu",
    "hah",
    "gimana kalo",
    "kita",
    "temenan",
    "aje",
    "xixixixi",
  ]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
  },
});
