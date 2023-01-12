// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
export default async function handler(req, res) {
  if(req.method === "GET"){
    const data = req.params;
    console.log(data);

    const client = await MongoClient.connect(uri);

    const db = client.db("meetups");

    const meetupsCollection = db.collection('meetup');

    const result = await meetupsCollection.findOne(data);

    console.log(result);

    res.status(201).send({message: "meetup inserted"});
  }

  res.status(404).send({message: "cannot be done"});
}