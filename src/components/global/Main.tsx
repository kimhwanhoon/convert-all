import React from 'react';

export const Main = ({ children }: { children: React.ReactNode }) => {
  return <main className="p-4">{children}</main>;
};
