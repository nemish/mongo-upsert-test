const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb://localhost:8090/?poolSize=20&writeConcern=majority",
  {
    useUnifiedTopology: true,
  }
);

async function run() {
  try {
    await client.connect();
    await client
      .db("items-db")
      .collection("items")
      .updateOne(
        { userId: "testUserId", isRead: false, type: "ReachedMilestone" },
        {
          $set: {
            userId: "testUserId",
            isRead: false,
            type: "ReachedMilestone",
          },
        },
        { upsert: true }
      );
    console.log(
      "Query success at: ",
      new Date().getTime(),
      "for process: ",
      process.argv[2]
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
