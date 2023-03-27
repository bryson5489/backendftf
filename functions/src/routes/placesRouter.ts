import express = require("express");
import Farm from "../models/Farm";
import * as functions from "firebase-functions";
import axios from "axios";

const baseURL: string =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const baseURL2: string =
  "https://maps.googleapis.com/maps/api/place/details/json";

const baseURL3: string = "https://maps.googleapis.com/maps/api/geocode/json";
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
placesRouter.get("/farms/details", async (req, res) => {
  try {
    const place_id: string = req.query.place_id as string;
    const farms: Farm[] = (
      await axios.get(baseURL2, {
        params: { place_id, key: key },
      })
    ).data;
    res.status(200).json(farms);
  } catch (err) {
    errorResponse(err, res);
  }
});
placesRouter.get("/farms/location", async (req, res) => {
  try {
    const address: string = req.query.address as string;
    const farms: any = (
      await axios.get(baseURL3, {
        params: { address, key: key },
      })
    ).data;
    res.status(200).json(farms);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default placesRouter;
