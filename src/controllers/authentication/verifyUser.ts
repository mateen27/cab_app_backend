import express, { Request, Response } from "express";
import { validateOtp } from "../../database/mongoDB/query";

const verifyUser = async (req: Request, res: Response) => {
  try {
    // accesing the phoneNumber from the params
    const { phoneNumber } = req.params;
    // accesing the otp from the body
    const { otp } = req.body;

    // validate the user otp
    const isValid = await validateOtp(phoneNumber, otp);

    // if the OTP is vaild
    if (isValid) {
      return res.status(200).json({ message: "User verified validateOTP." });
    } else {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } catch (error) {
    console.error(`Failed to verify user ${error}`);
    return res.status(404).json({ message: `Failed to verify user` });
  }
};

export default verifyUser;
