import dotenv from "dotenv";
import { findUserById } from "../repositories/authRepository";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

import { findUserByEmail } from "../repositories/authRepository";
import { unauthorizedError } from "../utils/errorUtil";

export async function authMiddleware(req:Request,res:Response,next:NextFunction){

    const authorization = req.headers["authorization"];
    if(!authorization) throw unauthorizedError("Missing authorization header");

    const token = authorization.replace("Bearer ", "");
    if(!token) throw unauthorizedError("Missing token");

    try{
        const JWT_SECRET = process.env.JWT_SECRET;
        const {userId} = jwt.verify(token,JWT_SECRET) as {userId:number};
        const user = await findUserById(userId);
        res.locals.user = user;
        next();
    }catch{
        throw unauthorizedError("Invalid token");
    }
}