import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload } from 'lucide-react';
import AuthDialog from '@/components/auth/AuthDialog';

export default function Header() {
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
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Upload Video</span>
          </Button>
          <AuthDialog />
        </div>
      </div>
    </header>
  );
}
