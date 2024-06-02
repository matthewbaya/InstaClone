import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function CreatePostScreen({ navigation, route }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState([]);
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Create Post</Text>
      <StatusBar style="auto" />

      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setContent(e)}
          value={content}
          placeholder="Content"
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => setImgUrl(e)}
          value={imgUrl}
          placeholder="Image Url"
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => setTags(e)}
          value={tags}
          placeholder="Tags"
        />
      </View>
      <Button
        onPress={() => {
          navigation.navigate("Home");
        }}
        title="Create Post"
      />
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
});
