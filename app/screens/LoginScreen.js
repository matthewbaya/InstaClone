import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Login</Text>
      <StatusBar style="auto" />

      <Image
        source={{ uri: "https://reactjs.org/logo-og.png" }}
        style={{
          width: 100,
          height: 100,
          marginBottom: 20,
          borderRadius: 50,
          objectFit: "cover",
        }}
      />
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setEmail(e)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => setPassword(e)}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <Button
        onPress={() => {
          navigation.navigate("Home");
        }}
        title="Login"
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.link}>Create a new account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
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
  headingText: {
    fontSize: 30,
    marginBottom: 20,
  },
  link: {
    color: "blue",
  },
});
