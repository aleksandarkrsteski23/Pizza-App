import NextAuth, { TokenSet } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Account, User as AuthUser, Session } from "next-auth";
import bcrypt from "bcryptjs";
import User from "../../../../../lib/modals/users";
import connect from "../../../../../lib/db";

type CustomToken = {
  accessToken?: string;
  [key: string]: unknown;
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return {
                id: user._id,
                email: user.email,
                username: user.username,
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Error in authorization:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: CustomToken;
      account: Account | null;
    }) {
      if (account) {
        token.accessToken = account.access_token as string; // Cast as string
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: CustomToken;
    }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({
      user,
      account,
    }: {
      user: AuthUser;
      account: Account | null;
    }) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "google") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });

            await newUser.save();
            return true;
          }

          return true;
        } catch (error) {
          console.log("Error saving user", error);
          return false;
        }
      }

      return false;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
