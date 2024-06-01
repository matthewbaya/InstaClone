import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";

export default function DetailsScreen({ navigation, route }) {
  const { id } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen {id}</Text>
    </View>
  );
}
