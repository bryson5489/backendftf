import express = require("express");
import { getClient } from "../db";
import Farm from "../models/Farm";

const MapRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

MapRouter.get("/map/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Farm>("farms")
      .find({ query })
      .toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});
