import { Suspense } from 'react';
import { Logo } from '../global/Logo';
import { Nav } from './Nav';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <Logo />
      <Suspense fallback={null}>
        <Nav />
      </Suspense>
    </header>
  );
};
