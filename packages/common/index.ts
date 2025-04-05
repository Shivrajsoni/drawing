import { password } from "bun";
import z, { string } from "zod";

export const CreateUserSchema = z.object({
    username:z.string().min(4,'Username Should be of 4 characters :'),
    email:z.string().email('Enter a Valid email'),
    password:z.string().min(6,'Password must be minimum of 6 characters')
})

export const SigninUserSchema = z.object({
    email:z.string().email('Enter a Valid Email'),
    password:z.string()
})

export const RoomSchema = z.object({
    roomSlug:z.string()
})

export const MessageSchema = z.object({
    roomId:z.string(),
    message:z.string()
})