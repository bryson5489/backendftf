import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import farmRouter from "./routes/farmRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", farmRouter);
export const api = functions.https.onRequest(app);
