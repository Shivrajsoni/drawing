import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "./config";

export interface CustomerRequest extends Request {
    userId:string | JwtPayload
}

export function middleware(req:Request,res:Response,next:NextFunction){
    // const token = req.headers["authorization"]?.split(" ")[1] ?? "";
    const token = req.headers["authorization"] ?? "";
    
    if(!token){
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET) as JwtPayload;
        if(decoded){
            (req as CustomerRequest ).userId = decoded.userId;
            next();
        }else{
            return res.status(403).json({message:"Invalid token payload"});
        }  
    } catch (error) {
        return res.status(403).json({message:"Invalid Json token or got Expired",error})   
    }
}