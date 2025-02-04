"use server";

import { MongoClient, ObjectId } from "mongodb";

async function getFromDatabase(choirSlug, cluster) {
  let client;
  try {
    client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    const db = client.db();
    const data = db.collection(cluster);

    // **Retrieve a Single Choir's Data**
    if (choirSlug) {
      const choir = await data.findOne(
        { _id: new ObjectId(choirSlug) },
        { projection: { choirDetails: 1, criteria: 1, comments: 1 } }
      );

      if (!choir) throw new Error("Choir not found");

      return { ...choir, _id: choir._id.toString() };
    }

    // **Retrieve All Choirs in a Cluster**
    if (cluster) {
      const choirs = await data
        .find({}, { projection: { choirDetails: 1, criteria: 1, comments: 1 } })
        .toArray();

      return (
        choirs
          .map((choir) => {
            const totalAverage = Object.values(choir.criteria || {}).reduce(
              (sum, scores) => {
                if (Array.isArray(scores)) {
                  const average =
                    scores.reduce((a, b) => a + b, 0) / scores.length;
                  return sum + average;
                }
                return sum;
              },
              0
            );

            return {
              ...choir,
              _id: choir._id.toString(),
              totalAverage,
            };
          })
          // .sort((a, b) => b.totalAverage - a.totalAverage); // Sort from highest to lowest score
          .sort((a, b) => a.totalAverage - b.totalAverage)
      ); // Sort from lowest to highest score
    }

    throw new Error(
      "Invalid parameters. Must provide either choirSlug or cluster."
    );
  } catch (error) {
    console.error("Database Retrieval Error:", error);
    throw error;
  } finally {
    if (client) await client.close();
  }
}

export default getFromDatabase;
