import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";

export default function HomeScreen({ navigation }) {
  const data = [
    {
      id: 1,
      title: "nigga",
    },
    {
      id: 2,
      title: "nigga",
    },
    {
      id: 3,
      title: "nigga",
    },
    {
      id: 4,
      title: "nigga",
    },
  ];
  return (
    <View style={styles.container}>
      {data.map((e) => {
        return (
          <View key={e.id}>
            <Text>Data {e.id}</Text>
            <Button
              onPress={() => {
                navigation.navigate("Detail", { id: e.id });
              }}
              title="Detail"
            ></Button>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  headingText: {
    fontSize: 30,
    marginBottom: 20,
  },
});
