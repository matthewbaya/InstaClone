const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://zedjebe:herocynaku@cluster0.zwlzqdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("P3-challenge-1");

module.exports = { database, client };
