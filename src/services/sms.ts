export const sendSMS = (phoneNumber: string, otp: string, isAlreadyRegistered: boolean) => {
    // Logic to send SMS
    const message = isAlreadyRegistered 
      ? `Your OTP for login is ${otp}.` 
      : `Thank you for registering! Your OTP is ${otp}.`;
  
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    // Use an SMS sending service here
  };
  