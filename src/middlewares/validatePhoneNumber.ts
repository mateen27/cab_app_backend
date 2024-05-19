import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

const validatePhoneNumber = (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    if (!validator.isMobilePhone(phoneNumber, 'any')) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }

    next();
};

export default validatePhoneNumber;
