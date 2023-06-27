import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

import { IAbility } from ".";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      externalId: string;
      phone?: string;
      email: string;
      firstName: string;
      lastName: string;
      fullName: string;
      status: string;
      bearerToken: string;
      abilities: IAbility[];
      abilitiesArray: string[];
      role: string;
      issuesCount: number
    } & DefaultSession["user"];
  }
}
// jwt token
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    bearerToken: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    abilities: IAbility[];
    abilitiesArray: string[];
    externalId: string;
    fullName: string;
    role: string;
    status: string;
    issuesCount: number
  }
}

// this the user data object from the api
declare module "next-auth" {
  interface User extends DefaultUser {
    externalId: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phone?: string;
    email: string;
    status: string;
    token: string;
    role: string;
    changePassword: boolean;
    issuesCount: number;
    abilitiesCount: number;
    abilities: IAbility[];
    abilitiesArray: string[]
    bearerToken: string
  }
}
