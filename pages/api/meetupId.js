// api/meetupId
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection
      .find({}, { projection: { _id: 1 } })
      .toArray();
    client.close();
    return res
      .status(200)
      .json({ message: "Successfully fetched data", meetups });
  }
  return;
}

export default handler;
