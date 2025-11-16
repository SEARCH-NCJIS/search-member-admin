'use client';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { Users } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from '@/components/ui/sidebar';
import { Button } from './ui/button';

export function SidebarNav() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const tabs = [
    { href: '/members/state-members', label: 'State Members', icon: Users },
    { href: '/members/at-large', label: 'At-Large Members', icon: Users },
    { href: '/members/emeritus', label: 'Member Emeritus', icon: Users },
    { href: '/members/all', label: 'All Members', icon: Users }
  ];

  const reportItems = [
    { label: 'State Members Report', href: '/api/reports/state-members/excel' },
    { label: 'At-Large Report', href: '/api/reports/atLarge/excel' },
    { label: 'Emeritus Report', href: '/api/reports/emeritus/excel' },
    { label: 'All Members Report', href: '/api/reports/all/excel' }
  ];

  const activeTab =
    tabs.find(tab => pathname.startsWith(tab.href))?.label ?? 'Members';

  return (
    <Sidebar>
      <SidebarHeader className='border p-4'>
        <Image
          src='/SEARCHLogoTransparent.png'
          alt='SEARCH logo'
          width={150}
          height={150}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-xl'>
            Members Center
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map(tab => (
                <SidebarMenuItem key={tab.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(tab.href)}
                  >
                    <Link href={tab.href}>
                      <tab.icon className='w-4 h-4' />
                      <span>{tab.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className='text-xl'>Reports</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportItems.map(item => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} download>
                      <Image
                        src='/excel.jpg'
                        alt='Excel Logo'
                        width={16}
                        height={16}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='border-t p-4'>
        {session?.user && (
          <div className='flex text-xs text-gray-500 mb-2'>
            Signed in as&nbsp;
            <span className='font-medium'> {session.user.email}</span>
          </div>
        )}
        <Button
          variant='destructive'
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Sign out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
