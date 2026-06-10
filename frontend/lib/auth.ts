import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export const { handlers, auth } = NextAuth(config)
