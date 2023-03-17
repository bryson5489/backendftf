import express = require("express");
import Farm from "../models/Farm";
import * as functions from "firebase-functions";
import axios from "axios";

const baseURL: string =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const key: string = functions.config().google.key;
const placesRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};
placesRouter.get("/farms", async (req, res) => {
  try {
    const location: string = req.query.location as string;
    const farms: Farm[] = (
      await axios.get(baseURL, {
        params: { query: `farms in ${location}`, key: key },
      })
    ).data;
    res.status(200).json(farms);
  } catch (err) {
    errorResponse(err, res);
  }
});
export default placesRouter;
