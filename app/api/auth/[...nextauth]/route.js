import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { userId, password } = credentials;

        try {
          await connectToDB();
          const user = await User.findOne({ userId });
          //console.log("user in route js", user);

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          // Include the "role" attribute in the user object
          // user.role = user.role;

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, session }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        return {
          ...token,
          id: user.id,
          userId: user.userId,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          userId: token.userId,
          firstname: token.firstname,
          lastname: token.lastname,
          role: token.role,
        },
      };

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    signOut: "/signIn",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
