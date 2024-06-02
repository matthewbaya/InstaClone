require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { verifyToken } = require("./helpers/jwt");
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schema/user");

const {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
} = require("./schema/posts");
const {
  typeDefs: followTypeDefs,
  resolvers: followResolvers,
} = require("./schema/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
  context: async ({ req, res }) => {
    return {
      authentication: async () => {
        const access_token = req.headers.authorization;

        if (!access_token) {
          throw new Error("Unauthorized");
        }

        const [type, token] = access_token.split(" ");

        if (type !== "Bearer") {
          throw new Error("Unauthorized");
        }
        const validToken = verifyToken(token);
        if (!validToken) {
          throw new Error("Unauthorized");
        }
        return validToken;
      },
    };
  },
}).then(({ url }) => [console.log(`🚀  Server ready at: ${url}`)]);
