// import { MongoClient } from "mongodb";

// export default async function saveToDatabase(finalData, cluster) {
//   const client = await MongoClient.connect(process.env.MONGODB_URI);
//   // const client = await MongoClient.connect(process.env.MONGODB_URI);
//   // const client = await MongoClient.connect(
//   //   "mongodb+srv://yomiblacck:maGQ1cckYvnanUz6@cluster0.9r2vx.mongodb.net/SANS?retryWrites=true&w=majority&appName=Cluster0"
//   // );

//   const db = client.db();
//   try {
//     if (finalData) {
//       const gratitudeCollection = db.collection(cluster);
//       const result = await gratitudeCollection.insertOne(finalData);
//       if (result.acknowledged && result.modifiedCount > 0) {
//         return result;
//       }
//     }
//   } catch (error) {
//     throw error;
//   } finally {
//     if (client) {
//       client.close();
//     }
//   }

//   // console.log("Mongo Database", client);
//   const result = finalData;
//   // return result;
//   if (client) {
//     return result;
//   }
// }

import { MongoClient } from "mongodb";

export default async function saveToDatabase(finalData, cluster) {

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(cluster);

    if (!finalData) {
      throw new Error("No data provided for database insertion");
    }

    const result = await collection.insertOne(finalData);

    if (result.acknowledged && result.insertedId) {
      return { success: true, insertedId: result.insertedId };
    } else {
      throw new Error("Failed to insert data");
    }
  } catch (error) {
    console.error("Database Insertion Error:", error);
    return { success: false, error: error.message };
  } finally {
    await client.close();
  }
}
