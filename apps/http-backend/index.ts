import {prisma} from "db/client";
import express from "express";
import jwt from "jsonwebtoken";
import {CreateUserSchema , SigninUserSchema , RoomSchema , MessageSchema} from "common/types";
import { JWT_SECRET, PORT } from "./config";
import { middleware, type CustomerRequest } from "./middleware";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

// user Signup point 
app.post('/signup',async(req,res)=>{
    const result = CreateUserSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message:"User Input Data is Wrong",
            error: result.error.errors
        });
    }
    const parsedData = result.data; 
    try {
     const data = await prisma.user.create({
        data:{
            username:parsedData.username,
            email:parsedData.email,
            password:parsedData.password
        }
    })
    if(!data){
        console.log(`error while putting in database`);
        return res.status(500).json({ message: "DB Error" }); ;     
    }
    return res.json({
        message:"Successfully User created"
    })      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Server Error",
            error: error instanceof Error ? error.message : String(error)
        })
    }
});

// user Signin point
app.post('/signin',async(req,res)=>{
    const result = SigninUserSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message:"User Input Data is Wrong",
            error: result.error.errors
        });
    }
    const parsedData = result.data;
    try {
        const data = await prisma.user.findFirst({
            where:{
                email:parsedData.email,
                password:parsedData.password
            }
        })
        if(!data){
            console.log(`Error in User Given Input`);
            return res.status(400).json({
                message:"Give Correct Inputs"
            })
        }

        // jwt logic will be applying here 
        const token = jwt.sign({
            userId:data?.id
        },JWT_SECRET);
        
        res.json({
            token:token
        })

    } catch (error) {
        console.log("Server Error",error);
        return res.status(500).json({
            message:"Server Error",
            error: error instanceof Error ? error.message : String(error)
        })

    }
})

// for creating a room
app.post('/create-room',middleware,async(req,res)=>{
    const result = RoomSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message:"User Input Data is Wrong",
            error: result.error.errors
        });
    }
    const parsedData = result.data;
    const userId = (req as CustomerRequest).userId as string;
    try {
        const data = await prisma.room.create({
            data:{
                slug:parsedData.roomSlug,
                adminId:userId
            }
        })
        if(!data){
            console.log(`Error in User Given Input`);
            return res.status(400).json({
                message:"Give Correct Inputs"
            })
        }

        return res.json({
            message:"Room Created Successfully",
            roomId:data?.id
        })
        
    } catch (error) {
        console.log("Server Error in Room Creation",error);
        return res.status(500).json({
            message:"Server Error in Room Creation",
            error: error instanceof Error ? error.message : String(error)
        })
    }
    
})

// for sending messages in room 
app.post('/messages',middleware,async(req,res)=>{

    const userId = (req as CustomerRequest).userId as string;
    
    const result = MessageSchema.safeParse(req.body);
    if(!result.success){
        return res.status(403).json({
            message:"Message is not parsed properly"
        })
    }

    const parseData = result.data;
    try {
        // we will check if roomId given by user Exist then only we will allow him to message in that 
        // can be optimized ?

        const roomExist = await prisma.room.findFirst({
            where:{
                id:parseData.roomId
            }
        })
        
        if(roomExist){
            const message = await prisma.chat.create({
                data:{
                    userId:userId,
                    RoomId:parseData.roomId,
                    message:parseData.message
                }
            })
            if(!message){
                return res.json({
                    message:"message not send to database"
                })
            }
            return res.status(200).json({
                message:"Message Sent Sucessfully to the database"
            })
        }else{
            return res.status(403).json({
                message:"Give a Valid Room Id "
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(402).json({
            message:"Server Error in messages route"
        })   
    }


})

// for getting messages in room 
app.get('/chats/:roomId',async(req,res)=>{
    const roomId = String(req.params.roomId) ?? "";
    try {
        const chats = await prisma.chat.findMany({
            where:{
                RoomId:roomId 
            },
            orderBy:{
                id:"desc"
            },
            take:100
        })

        if(!chats){
            console.log(`Error While reterving chats from database`);
            return res.status(402).json({message:"Error While database Call"})
        }

        return res.status(200).json({
            message:"All chats fro given room Id is ",
            chats:chats
        })
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({message:"Server Error in Getting chats Routes : "})
    }
})

// get roomId from room-slug
app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prisma.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})

// getting all room Exist on users
app.get("/getUserRooms",middleware,async(req,res) =>{
    const userId = (req as CustomerRequest).userId as string;

    try {
        const rooms = await prisma.room.findMany({
            where:{
                adminId:userId
            }
        })
        if(!rooms){
            return res.status(203).json("No Room Existed create room first ");
        }
        return res.json({
            rooms
        })

    } catch (error) {
        console.log(error);
        return res.status(402).json({
            message:"Server Error in messages route"
        })   
        
    }


})

app.listen(Number(PORT),()=>{
    console.log(`Server Running at Port : ${PORT} `)
})