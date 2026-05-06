import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlayCircle } from 'lucide-react';

interface VideoCardProps {
  _id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  uploaderId?: {
    username: string;
    profilePicture: string;
  };
  createdAt: string;
}

function formatViews(views: number) {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function VideoCard({
  _id,
  title,
  thumbnailUrl,
  duration,
  views,
  uploaderId,
  createdAt,
}: VideoCardProps) {
  return (
    <Link href={`/watch/${_id}`}>
      <Card className="group overflow-hidden border-transparent bg-transparent shadow-none transition-all hover:bg-muted/50 hover:shadow-lg hover:border-border cursor-pointer">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <img
            src={thumbnailUrl || 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80'}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {duration}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            <PlayCircle className="h-12 w-12 text-white shadow-sm" />
          </div>
        </div>
        <CardContent className="p-3">
          <div className="flex gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={uploaderId?.profilePicture} alt={uploaderId?.username} />
              <AvatarFallback>{uploaderId?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <h3 className="line-clamp-2 text-sm font-medium leading-tight text-foreground">
                {title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground hover:text-foreground">
                {uploaderId?.username || 'Unknown User'}
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{formatViews(views)} views</span>
                <span className="mx-1">•</span>
                <span>{timeAgo(createdAt)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
