import { cn } from '@/lib/utils/cn';

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export const Main = ({ children, className }: MainProps) => {
  return <main className={cn('p-4', className)}>{children}</main>;
};
