import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FollowerItem = ({ follower }) => {
  return (
    <View style={styles.container}>
      <Text>{follower.name}</Text>
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

export default FollowerItem;
