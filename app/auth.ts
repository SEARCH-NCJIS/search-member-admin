// app/auth.ts
import NextAuth, { type NextAuthConfig } from 'next-auth';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/app/lib/mongodb';

const config: NextAuthConfig = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },

  // Provider gets ID/SECRET/ISSUER from env automatically
  providers: [MicrosoftEntraID],

  callbacks: {
    async signIn({ profile }) {
      // Only allow SEARCH folks
      const email = profile?.email?.toLowerCase() ?? '';
      return email.endsWith('@search.org');
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).user.id = token.sub;
      return session;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
