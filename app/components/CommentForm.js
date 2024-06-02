import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CommentForm() {
  const [text, onChangeText] = useState("");
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Feather name="send" size={24} color={"black"}></Feather>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "black",
    flex: 1,
    backgroundColor: "white",
  },
});
