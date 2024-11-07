'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Images', href: '/images' },
];

export const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between gap-4 p-4">
      {menuItems.map((item) => (
        <Button
          key={item.label}
          component={Link}
          href={item.href}
          radius="lg"
          variant={pathname === item.href ? 'filled' : 'subtle'}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
};
