import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
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
                // navigation.navigate("Home");
                console.log("You tapped the button!");
              }}
              title="Login"
            />
          </View>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Beranak" }}
            />
            <Stack.Screen name="Detail" component={DetailsScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
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
});
