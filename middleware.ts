import type { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest){
    const token = req.headers.get("Authorization");
    
    if(!token){
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 401}
        )
    }
    
    const rawToken = token.split(" ")[1]; 
    
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return NextResponse.json(
            { error: "JWT secret not configured" },
            { status: 500 }
        );
    }

    try {
        jwt.verify(rawToken, jwtSecret);
        return NextResponse.next();
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 401}
        )
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};