import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import farmRouter from "./routes/farmRouter";
import placesRouter from "./routes/placesRouter";
import profileRouter from "./routes/profileRouter";
import favoritesRouter from "./routes/favoritesRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", farmRouter);
app.use("/", placesRouter);
app.use("/", profileRouter);
app.use("/", favoritesRouter);
export const api = functions.https.onRequest(app);
