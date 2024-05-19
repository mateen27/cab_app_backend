// function for generating the 6 Digit OTP Number
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();  // converted to String!
}

export { generateOTP };