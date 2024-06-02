import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PostItem = ({ post }) => {
  return (
    <View style={styles.container}>
      <Text>{post.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default PostItem;
