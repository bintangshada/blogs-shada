import prisma from "@/app/lib/prisma";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request){
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
        where: {email}
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json(
            {error: "User or password not found"},
            {status: 404}
        )
    }
    
    const token = jwt.sign({userId : user.id, email : user.email}, process.env.JWT_SECRET as string, {expiresIn: "24h"})

    return NextResponse.json(
        {token, user: {id: user.id, email: user.email}},
        {status: 200}
    )
}