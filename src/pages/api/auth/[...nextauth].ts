import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

const authOptions: NextAuthOptions = {
    providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Sign in",
      credentials: {},
      async authorize(credentials, req) {
        const payload: {
          email: string;
          password: string;
        } = {
          email: req.body?.email,
          password: req.body?.password,
        };

        
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        try {
          const response = await axios.post(
            `${baseUrl}/login`,
            payload,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );


         
          console.log("response", response.data);
          if (response.status === 200) {
            const data = response.data.data
            console.log("response=>", response.data.data.bearerToken)
            return data;

            
          }
        } catch (error: any) {
          console.log("errr", error?.response.data);
          const errorMessage = error.response.data.message;
          throw new Error(errorMessage);
        }

      },
    }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
    debug: false,
    pages: {
        error: "/auth/signin",
        signIn: "/auth/signin"
    },
    callbacks: {
    jwt: ({ token, user }) => {
     
      if (user) {
        token.email = user.email;
        token.bearerToken = user.bearerToken;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.email = token.email;
        session.user.bearerToken = token.bearerToken;
      }

      return session;
    },
  },

}

export default NextAuth(authOptions);
