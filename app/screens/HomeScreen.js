import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useQuery, gql } from "@apollo/client";
import DetailsScreen from "./DetailScreen";
import PostCard from "../components/PostCard";
import SearchUserScreen from "./SearchUserScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const GET_POSTS = gql`
  query FindAllPost {
    findAllPost {
      _id
      author {
        name
        username
      }
      content
      imgUrl
    }
  }
`;
// function PostScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function ProfileScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);

  return (
    <>
      <ScrollView>
        <View style={styles.postContainer}>
          {data?.findAllPost.map((e, id) => {
            return <PostCard key={id} post={e}></PostCard>;
          })}
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "#EEEEEE",
          gap: 10,
          paddingHorizontal: 10,
          marginBottom: 50,
        }}
      >
        <Tab.Navigator>
          <Tab.Screen
            name="SearchUser"
            component={SearchUserScreen}
            options={{ title: "Search" }}
          />
          <Tab.Screen
            name="Profile Screen"
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
        </Tab.Navigator>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
  },
  postContainer: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 20,
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
