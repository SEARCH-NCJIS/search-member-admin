// app/auth.ts
import NextAuth, { type NextAuthConfig } from 'next-auth';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/app/lib/mongodb';

const tenantId = process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID;
if (!tenantId) {
  throw new Error('Missing AUTH_MICROSOFT_ENTRA_ID_TENANT_ID');
}

const config: NextAuthConfig = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,
      authorization: { params: { scope: 'openid profile email' } }
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email ?? '';
      return email.toLowerCase().endsWith('@search.org');
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/members/state-members`; // default after login
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST }
} = NextAuth(config);
