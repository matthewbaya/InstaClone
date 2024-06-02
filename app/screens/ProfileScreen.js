import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PostItem from "../components/PostItem";
import FollowerItem from "../components/FollowerItem";
import FollowingItem from "../components/FollowingItem";

const ProfileScreen = () => {
  const [posts, setPosts] = useState([
    { id: "1", content: "Post 1" },
    { id: "2", content: "Post 2" },
  ]);

  const [followers, setFollowers] = useState([
    { id: "1", name: "Follower 1" },
    { id: "2", name: "Follower 2" },
  ]);

  const [followings, setFollowings] = useState([
    { id: "1", name: "Following 1" },
    { id: "2", name: "Following 2" },
  ]);

  const [activeTab, setActiveTab] = useState("posts");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>Username</Text>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab("posts")}>
            <Text
              style={[styles.tab, activeTab === "posts" && styles.activeTab]}
            >
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("followers")}>
            <Text
              style={[
                styles.tab,
                activeTab === "followers" && styles.activeTab,
              ]}
            >
              Followers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("followings")}>
            <Text
              style={[
                styles.tab,
                activeTab === "followings" && styles.activeTab,
              ]}
            >
              Following
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {activeTab === "posts" && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostItem post={item} />}
        />
      )}
      {activeTab === "followers" && (
        <FlatList
          data={followers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FollowerItem follower={item} />}
        />
      )}
      {activeTab === "followings" && (
        <FlatList
          data={followings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FollowingItem following={item} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    marginTop: 16,
  },
  tab: {
    marginRight: 16,
    fontSize: 16,
    color: "#555",
  },
  activeTab: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
});

export default ProfileScreen;
