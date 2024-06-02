import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  //   uri: "http://localhost:3000",
  uri: "https://e87a-104-28-249-188.ngrok-free.app",
  cache: new InMemoryCache(),
});
export default client;
