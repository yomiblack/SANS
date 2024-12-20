import { MongoClient } from "mongodb";

export default async function saveToDatabase(finalData) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  // const client = await MongoClient.connect(process.env.MONGODB_URI);
  // const client = await MongoClient.connect(
  //   "mongodb+srv://yomiblacck:maGQ1cckYvnanUz6@cluster0.9r2vx.mongodb.net/SANS?retryWrites=true&w=majority&appName=Cluster0"
  // );

  const db = client.db();
  try {
    if (finalData) {
      const gratitudeCollection = db.collection("gratitude");
      const result = await gratitudeCollection.insertOne(finalData);
      if (result.acknowledged && result.modifiedCount > 0) {
        return result;
      }
    }
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }

  // console.log("Mongo Database", client);
  const result = finalData;
  // return result;
  if (client) {
    return result;
  }
}
