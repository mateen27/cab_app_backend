import express from 'express'
import login from '../controllers/authentication/login';
import validatePhoneNumber from '../middlewares/validatePhoneNumber';
import verifyUser from '../controllers/authentication/verifyUser';
import editUserProfile from '../controllers/profile/editUserProfile';

const router = express.Router();

// login route
router.post("/login", validatePhoneNumber ,login);
// verifying the user
router.post('/verifyUser/:phoneNumber', verifyUser);
// edit the user-profile
router.put('/edit-profile/:phoneNumber', editUserProfile);


export default router;