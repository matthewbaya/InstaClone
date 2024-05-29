import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <StatusBar style="auto" />
      <View>
        <Text>Line 2</Text>
      </View>
      <Image
        source={{ uri: "https://reactjs.org/logo-og.png" }}
        style={{
          width: 100,
          height: 100,
          objectFit: "cover",
        }}
      />
      <View style={{ marginVertical: 30 }}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => console.log(e)}
          value={""}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => console.log(e)}
          value={""}
          placeholder="Password"
        />
      </View>
      <Button
        onPress={() => {
          console.log("You tapped the button!");
        }}
        title="Login"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#900",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 5,

    borderWidth: 1,
    padding: 10,
  },
});
