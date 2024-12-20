"use server";

import { MongoClient, ObjectId } from "mongodb";

async function getFromDatabase(choirSlug, cluster) {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);

    const db = client.db();
    const data = db.collection(`${cluster}`);

    // Choir Score Summary
    if (choirSlug && cluster === "gratitude") {
      const choirs = await data
        .find(
          { _id: new ObjectId(choirSlug) },
          { projection: { choirDetails: 1, criteria: 1, comments: 1 } }
        )
        .sort({ _id: -1 })
        .toArray();

      return choirs.map((choir) => ({ ...choir, _id: choir._id.toString() }));
    }

    //Result Summary
    if (!choirSlug && cluster === "gratitude") {
      try {
        const newData = await data
          .find(
            {},
            { projection: { choirDetails: 1, criteria: 1, comments: 1 } }
          )
          .toArray();

        const choirs = newData.map((choir) => {
          const totalAverage = Object.keys(choir.criteria).reduce(
            (sum, key) => {
              const scores = choir.criteria[key] || [0, 0, 0];
              const average = scores.reduce((a, b) => a + b, 0) / scores.length;
              return sum + average;
            },
            0
          );

          return {
            ...choir,
            _id: choir._id.toString(),
            totalAverage,
          };
        });

        choirs.sort((a, b) => a.totalAverage - b.totalAverage);

        return choirs;
      } catch (error) {
        // console.error("Error fetching choirs:", error);
        throw error;
      }
    }
  } finally {
    if (client) await client.close();
  }
}

export default getFromDatabase;
