const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
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
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const authors = [
  {
    name: "Matthew",
    age: 21,
  },
  {
    name: "Matthias",
    age: 69,
  },
];

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
  
  type Author{
    name : String
    age : Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getBooks: [Book]
    getBookByTitle(title: String): Book
    getAuthors: [Author]
  }

input NewBook {
    title: String
    author: String
}

  type Mutation {
  addBook(newBook : NewBook): Book
}
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getBooks: () => books,
    getBookByTitle: (parent, args) => {
      const { title } = args;
      const book = books.find((e) => e.title);
      return book;
    },
    getAuthors: () => authors,
  },
  Mutation: {
    addBook: (parent, args) => {
      const { title, author } = args.newBook;
      const newBook = { title, author };
      books.push(newBook);
      return newBook;
    },
  },
};

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
});

startStandaloneServer(server, {
  listen: { port: 3000 },
  context: async ({ req, res }) => {
    return {
      authentication: async () => {
        const access_token = req.headers.authorization;

        if (!access_token) {
          throw new GraphQLError("unauthorization", {
            extensions: {
              code: "Unauthorization",
            },
          });
        }

        const validToken = verifyToken(access_token);
        console.log(validToken);
        if (!validToken) {
          throw new GraphQLError("unauthorization", {
            extensions: {
              code: "Unauthorization",
            },
          });
        }
        return validToken;
      },
    };
  },
}).then(({ url }) => [console.log(`🚀  Server ready at: ${url}`)]);
