import * as React from 'react';
import { cn } from '@/lib/utils2'; // Utility function to handle classNames conditionally
import {
  Root,
  Trigger,
  Content,
  Item,
  Label,
} from '@radix-ui/react-dropdown-menu'; // You can use Radix UI for accessibility

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <Root>{children}</Root>;
};

const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => {
  return <Trigger asChild>{children}</Trigger>;
};

const DropdownMenuContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      side="bottom"
      align="start"
      className={cn(
        'z-50 mt-2 min-w-[8rem] rounded-md border bg-white shadow-lg dark:bg-gray-800',
        'dark:border-gray-700',
      )}
    >
      {children}
    </Content>
  );
};

const DropdownMenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Item
      className="py-2 px-4 text-sm cursor-pointer text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
      onClick={onClick}
    >
      {children}
    </Item>
  );
};

const DropdownMenuLabel = ({ children }: { children: React.ReactNode }) => {
  return <Label className="py-2 px-4 text-sm text-gray-500">{children}</Label>;
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
};
