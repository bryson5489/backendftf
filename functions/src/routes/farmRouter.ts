import express = require("express");
import { getClient } from "../db";
import Farm from "../models/Farm";
import MongoFarm from "../models/MongoFarm";

const farmRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

farmRouter.get("/users/:place_id/farms", async (req, res) => {
  try {
    const id = req.params.place_id;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Farm>("farms")
      .find({ id })
      .toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

farmRouter.get("/users/farms", async (req, res) => {
  try {
    const location = req.query.location as string;
    const client = await getClient();
    const results = await client
      .db()
      .collection<MongoFarm>("farms")
      .find({
        $or: [
          { formatted_address: new RegExp(location, "i") },
          { name: new RegExp(location, "i") },
        ],
      })
      .toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

farmRouter.post("/users/farms/:farmer_id", async (req, res) => {
  try {
    const newFarm: MongoFarm = req.body as MongoFarm;
    const farmer_id = req.params.farmer_id;
    newFarm.farmer_id = farmer_id;
    const client = await getClient();
    await client.db().collection<MongoFarm>("farms").insertOne(newFarm);
    res.status(201).json(newFarm);
  } catch (err) {
    errorResponse(err, res);
  }
});

farmRouter.delete("/users/:place_id/farms/:id", async (req, res) => {
  try {
    const place_id = req.params.place_id;
    const id = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Farm>("farms")
      .deleteOne({ userid: place_id, "gif.id": id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default farmRouter;
