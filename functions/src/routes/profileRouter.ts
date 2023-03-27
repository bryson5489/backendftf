// require the express module
import express from "express";
import { getClient } from "../db";
import Profile from "../models/Profile";
const profileRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};
//used to get the profile of a user
profileRouter.get("/profiles/:profile_id", async (req, res) => {
  try {
    const profile_id: string = req.params.profile_id;
    const client = await getClient();
    const profile = await client
      .db()
      .collection<Profile>("profiles")
      .findOne({ profile_id });
    res.status(200).json(profile);
  } catch (error) {
    errorResponse(error, res);
  }
});
//used to add a profile
profileRouter.post("/profiles", async (req, res) => {
  try {
    const newProfile: Profile = req.body;
    const client = await getClient();
    const existingProfile = await client
      .db()
      .collection<Profile>("profiles")
      .findOne({ profile_id: newProfile.profile_id });
    if (existingProfile) {
      await client
        .db()
        .collection<Profile>("profiles")
        .replaceOne({ profile_id: newProfile.profile_id }, newProfile);
      res.status(200).json(newProfile);
    } else {
      await client.db().collection<Profile>("profiles").insertOne(newProfile);
      res.status(201).json(newProfile);
    }
  } catch (error) {
    errorResponse(error, res);
  }
});
//this is used to update a profile
profileRouter.put("/profiles/:profile_id", async (req, res) => {
  try {
    const profile_id: string = req.params.profile_id;
    const client = await getClient();
    const profile = await client
      .db()
      .collection<Profile>("profiles")
      .findOne({ profile_id });
    if (profile) {
      await client
        .db()
        .collection<Profile>("profiles")
        .replaceOne({ profile_id }, req.body);
      res.status(200).json(req.body);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    errorResponse(error, res);
  }
});
// this is used to delete a profile
profileRouter.delete("/profiles/:profile_id", async (req, res) => {
  try {
    const profile_id: string = req.params.profile_id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Profile>("profiles")
      .deleteOne({ profile_id });
    if (result.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    errorResponse(error, res);
  }
});
export default profileRouter;