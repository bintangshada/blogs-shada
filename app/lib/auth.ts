import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as unknown as Adapter,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            id: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !(await compare(credentials.password, user.password!))) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    randomKey: "Test",
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            const t = token as Record<string, unknown>;
            return {
                ...session,
                user: {
                    ...session.user,
                    id: typeof t.id === "string" ? t.id : undefined,
                    randomKey: typeof t.randomKey === "string" ? t.randomKey : undefined,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as Record<string, unknown>;
                return {
                    ...token,
                    id: typeof u.id === "string" ? u.id : undefined,
                    randomKey: typeof u.randomKey === "string" ? u.randomKey : undefined,
                };
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
};