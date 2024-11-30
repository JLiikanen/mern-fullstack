import jwt from "jsonwebtoken"
import asyncHandler from 'express-async-handler';

function protect(req, res, next) {
    const bearerToken = req.headers["authorization"];
    console.log(req.headers)
    console.log(bearerToken)
    if (bearerToken) {
        try {
            const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
            console.log(decoded, "Hello from auth middleware!")
            req.user = decoded; // Attach user info to request
            next();
        } catch (err) {
            return res.status(401).json({ message: `Invalid Token! ${err.message}` });
        }
    } else {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
}

export { protect }