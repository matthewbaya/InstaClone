import { gql, useQuery } from "@apollo/client";
import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";
import CommentForm from "../components/CommentForm";

const GET_POST_BY_ID = gql`
  query Query($id: ID!) {
    findPostById(_id: $id) {
      author {
        name
        username
      }
      comments {
        content
        username
      }
      content
      imgUrl
    }
  }
`;

export default function DetailsScreen({ navigation, route }) {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: { id },
  });
  console.log({ loading, error, data });
  const post = data.findPostById;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text>{post.author.name}</Text>
        <Image
          source={{ uri: post.imgUrl }}
          style={{ width: "100%", height: 150, borderRadius: 5 }}
        />
        <Text>{post.content}</Text>
      </View>
      <CommentForm></CommentForm>
    </View>
  );
}
