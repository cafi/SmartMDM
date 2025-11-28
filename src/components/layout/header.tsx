'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  GanttChartSquare,
  ChevronDown,
  Menu,
  KeyRound,
  Languages,
  LogOut,
  User,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { NavItem, navigation } from '@/lib/navigation';
import React from 'react';

const NavLink = ({ item, isMobile = false }: { item: NavItem, isMobile?: boolean }) => {
  const pathname = usePathname();

  if (item.children) {
    if (isMobile) {
      return (
        <div className="flex flex-col space-y-2">
          <span className="font-semibold">{item.label}</span>
          {item.children.map((child) => (
            <NavLink key={child.label} item={child} isMobile={isMobile} />
          ))}
        </div>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-sm font-medium">
            {item.label}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {item.children.map((child, index) =>
            child.children ? (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger>
                  {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                  <span>{child.label}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {child.children.map((subChild, subIndex) => (
                    <DropdownMenuItem key={subIndex} asChild>
                      <Link href={subChild.href || '#'}>
                        {subChild.icon && (
                          <subChild.icon className="mr-2 h-4 w-4" />
                        )}
                        {subChild.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem key={index} asChild>
                <Link href={child.href || '#'}>
                  {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                  {child.label}
                </Link>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        isMobile ? 'block w-full text-left py-2' : 'px-3 py-2',
        pathname === item.href ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      {item.label}
    </Link>
  );
};

export function Header() {
  const router = useRouter();
  
  const handleLogout = () => {
    // In a real app, you'd clear the user session
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center">
            <Link
                href="/dashboard"
                className="flex items-center space-x-2"
            >
                <GanttChartSquare className="h-6 w-6 text-primary" />
                <span className="hidden font-bold sm:inline-block font-headline">
                Smart MDM
                </span>
            </Link>
        </div>
        
        <nav className="hidden flex-1 items-center gap-1 md:flex ml-6">
          {navigation.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>

        <div className="flex items-center justify-end ml-auto">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="mr-2">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <GanttChartSquare className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Smart MDM</span>
                  </Link>
                  <div className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                        <NavLink key={item.label} item={item} isMobile />
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@user" />
                  <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    j.doe@acme.inc
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <KeyRound className="mr-2 h-4 w-4" />
                  <span>Alterar Senha</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Languages className="mr-2 h-4 w-4" />
                  <span>Alterar Idioma</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
