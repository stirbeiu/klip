import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import AuthDialog from '@/components/auth/AuthDialog';
import LogoutButton from '@/components/auth/LogoutButton';
import { getSession } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 mx-auto items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block text-2xl text-foreground">
              <span className="text-destructive">▶</span> klip
            </span>
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center px-6 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="w-full rounded-full bg-muted/50 pl-10 border-transparent focus-visible:bg-background focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <>

              <DropdownMenu>
                <DropdownMenuTrigger className="relative h-8 w-8 rounded-full cursor-pointer focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.profilePicture as string} alt={session.username as string} />
                    <AvatarFallback>{(session.username as string).charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.username as string}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.role === 'admin' ? 'Administrator' : 'User'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session.role === 'admin' && (
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/admin" className="flex items-center w-full">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="cursor-pointer">
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <AuthDialog />
          )}
        </div>
      </div>
    </header>
  );
}
