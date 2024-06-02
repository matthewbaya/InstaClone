import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
export default function PostCard({ post }) {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Image
            style={styles.profilePic}
            source={{
              uri: "https://unsplash.com/photos/a-close-up-of-a-gray-cats-face-YQlNLVYckRk",
            }}
          />
          <View>
            <Text style={{ fontWeight: "bold" }}>{post.author.name}</Text>
            <Text style={{ fontSize: 10, opacity: 0.5 }}>
              {post.author.username}
            </Text>
          </View>
        </View>
        <View key={post.id} style={{ gap: 8 }}>
          <Text>{post.content}</Text>
          <Image
            style={{ width: "100%", height: 150, borderRadius: 5 }}
            source={{ uri: post.imgUrl }}
          />
          <Button
            onPress={() => {
              navigation.navigate("Detail", { id: post._id });
            }}
            title="Detail"
          ></Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    gap: 10,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});
