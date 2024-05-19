import mongoose from "mongoose";
import UserModel from "../../models/userModel";
import OtpNumber from "../../models/otpModel";

const findUserByPhoneNumber = async (phoneNumber: string) => {
  try {
    // finding the user by the phone number
    const user = await UserModel.findOne({ phoneNumber });
    return user;
  } catch (error) {
    console.error(`Could not find the user by the phone number`, error);
    throw new Error("Database query failed");
  }
};

// saving the first time user Phone Number to the database
const saveUserPhoneNumber = async (phoneNumber: string) => {
  try {
    const user = await UserModel.create({ phoneNumber });
    return user;
  } catch (error) {
    console.error(
      `Could not save the user Phone Number to the database`,
      error
    );
    throw new Error("Database query failed");
  }
};

//  query for storing the otp inside the database
const storeOtp = async (phoneNumber: string, otp: string) => {
  const newOtp = new OtpNumber({ phoneNumber, otp });

  try {
    await newOtp.save();
    return newOtp;
  } catch (error) {
    throw new Error("Error storing OTP");
  }
};

// query for validating the user entered otp is correct or not;
const validateOtp = async (phoneNumber: string, otp: string) => {
    try {
        const otpRecord = await OtpNumber.findOne({ phoneNumber, otp });

        if (!otpRecord) {
            return false; // OTP is invalid or expired
        }

        // Optionally, delete the OTP after validation
        const deleteResult = await OtpNumber.deleteOne({ _id: otpRecord._id });

        if (deleteResult.deletedCount === 0) {
            console.error(`Failed to delete OTP for phoneNumber: ${phoneNumber}`);
            return false; // Deletion failed, return false or handle as needed
        }

        return true; // OTP is valid and deleted successfully
    } catch (error) {
        console.error(`Error validating OTP: ${error}`);
        return false; // Handle errors appropriately
    }
};

// query for checking if the phoneNumber is valid or not
const updateUserProfile = async (
    phoneNumber: string,
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string
) => {
    try {
        // Update the user profile directly in the database
        const updatedUser = await UserModel.findOneAndUpdate(
            { phoneNumber }, // Filter condition
            { $set: { firstName, lastName, email, profileImage } }, // Update fields
            { new: true } // Return the updated document
        );

        return updatedUser;
    } catch (error) {
        console.error('Error updating the user profile:', error);
        throw new Error('Error updating the user profile');
    }
};


export { findUserByPhoneNumber, saveUserPhoneNumber, storeOtp, validateOtp, updateUserProfile };
