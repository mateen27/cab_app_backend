import express, { Request, Response } from "express";
import { generateOTP } from "../../services/otp";
import { sendSMS } from "../../services/sms";
import {
  findUserByPhoneNumber,
  saveUserPhoneNumber,
  storeOtp,
} from "../../database/mongoDB/query";

const login = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    // check the user
    // is the user Already there in the database!
    let isAlreadyRegistered = true;

    const findUser = await findUserByPhoneNumber(phoneNumber);

    // if the user is already there in the database
    if (findUser) {
      // generate an OTP for the user
      const otp = generateOTP();

      // store the OTP in the database with expiration time
      await storeOtp(phoneNumber, otp);

      // send the OTP to the user
      sendSMS(phoneNumber, otp, isAlreadyRegistered);

      // Return response indicating the user is already registered
      return res
        .status(200)
        .json({ message: "OTP sent to registered phone number", otp });
    }

    // if the user is visiting the application first time!
    if (!findUser) {
      // making the user as false as he is not registered yet
      isAlreadyRegistered = false;

      // saving the user's Phone Number inside of the database ony!
      const saveUserPhone = await saveUserPhoneNumber(phoneNumber);

      //  the user is saved in the database
      if (saveUserPhone) {
        //  generate an OTP for the user
        const otp = generateOTP();

        // store the OTP in the database with expiration time
        await storeOtp(phoneNumber, otp);

        // send the Message to the user
        sendSMS(phoneNumber, otp, isAlreadyRegistered);

        // Return response indicating the user is now registered
        return res
          .status(200)
          .json({ message: "Phone number registered and OTP sent", otp });
      }
    }

    // returning the response of the user
    return res.status(200).json;
  } catch (error) {
    console.error(`Failed to login the user: ${error}`);
    return res.status(404).json({ message: `Error in login the user` });
  }
};

export default login;
