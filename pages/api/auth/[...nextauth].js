import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";

// Dynamic URL configuration
const getBaseUrl = () => {
  // Production
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Custom production domain
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXTAUTH_URL || "https://job-alert-flax.vercel.app";
  }

  // Development
  return process.env.NEXTAUTH_URL || "http://localhost:3000";
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.provider = account.provider;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.provider = token.provider;
      session.userId = token.userId;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Use dynamic base URL
      const dynamicBaseUrl = getBaseUrl();

      // If the url is relative, prepend the dynamic base URL
      if (url.startsWith("/")) return `${dynamicBaseUrl}${url}`;

      // If the url is for the same origin, allow it
      if (new URL(url).origin === dynamicBaseUrl) return url;

      // Otherwise, redirect to home
      return dynamicBaseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  // Debug mode in development
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
