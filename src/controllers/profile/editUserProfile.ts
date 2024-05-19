import express, { Request, Response } from "express";
import {
  findUserByPhoneNumber,
  updateUserProfile,
} from "../../database/mongoDB/query";

const editUserProfile = async (req: Request, res: Response) => {
  try {
    // accessing the phoneNumber so that we can update the user fields
    const { phoneNumber } = req.params;
    const { firstName, lastName, email, profileImage } = req.body;

    // checking if the phoneNumber is valid and is present in the database!
    const user = findUserByPhoneNumber(phoneNumber);

    // user not in the database not registered
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Updating user profile
    const updatedUser = await updateUserProfile(
      phoneNumber,
      firstName,
      lastName,
      email,
      profileImage
    );

    // Sending success response with updated user data
    return res
      .status(200)
      .json({
        message: "User profile updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    console.error("Error updating the changes of the user profile", error);
    return res
      .status(404)
      .json({ error: "Error updating the changes of the user profile" });
  }
};

export default editUserProfile;
