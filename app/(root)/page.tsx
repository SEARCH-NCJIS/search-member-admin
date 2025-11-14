// app/page.tsx
import { auth, signIn } from '@/app/auth';
import Image from 'next/image';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div className='p-6'>
        <h1 className='text-2xl font-semibold mb-4'>Members</h1>

        <form
          action={async () => {
            'use server';
            await signIn('microsoft-entra-id', {
              redirectTo: '/members' // <- land here after login
            });
          }}
        >
          <button
            type='submit'
            className='inline-flex items-center gap-2 rounded bg-black text-white px-4 py-2'
          >
            <Image
              src='/mlogo.png'
              alt='Microsoft Logo'
              className='h-4 w-4'
              width={4}
              height={4}
            />
            <span>Sign in with Microsoft Entra ID</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='p-6'>
      Signed in as <span className='font-semibold'>{session.user?.email}</span>
    </div>
  );
}
