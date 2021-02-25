const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb://localhost:8090/?poolSize=20&writeConcern=majority",
  {
    useUnifiedTopology: true,
  }
);

async function runUpsert() {
  try {
    await client.connect();
    await client
      .db("items-db")
      .collection("items")
      .updateOne(
        { userId: "testUserIdUpsert5", isRead: false, type: "ReachedMilestone" },
        {
          $set: {
            userId: "testUserIdUpsert5",
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
      process.argv[3]
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function runWithCountCheck() {
  try {
    await client.connect();
    const count = await client
      .db("items-db")
      .collection("items")
      .countDocuments(
        { userId: "testUserIdWithCountCheck6", isRead: false, type: "ReachedMilestone" },
        { limit: 1 }
      );
    const exists = count === 1;
    if (exists) {
      console.log('Will not be created at: ', new Date().getTime(), "for process: ", process.argv[3]);
      return;
    }
    await client
      .db("items-db")
      .collection("items")
      .insertOne(
        { userId: "testUserIdWithCountCheck6", isRead: false, type: "ReachedMilestone" },
      );
    console.log(
      "INSERTED at: ",
      new Date().getTime(),
      "for process: ",
      process.argv[3]
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

const run = process.argv[2] === 'withCountCheck' ? runWithCountCheck : runUpsert; 

run().catch(console.dir);
