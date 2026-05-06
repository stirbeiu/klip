import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Video from '@/models/Video';
import User from '@/models/User';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThumbsUp, ThumbsDown, Share2, Flag } from 'lucide-react';

async function getVideo(id: string) {
  try {
    await dbConnect();
    User.init();
    
    // Increment views (simple way)
    const video = await Video.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )
    .populate('uploaderId', 'username profilePicture')
    .lean();
    
    if (!video) return null;
    return JSON.parse(JSON.stringify(video));
  } catch (e) {
    console.error(e);
    return null;
  }
}

function formatViews(views: number) {
  return new Intl.NumberFormat('en-US').format(views);
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const video = await getVideo(resolvedParams.id);
  
  if (!video) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-xl overflow-hidden w-full shadow-lg border border-border">
            <video 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
              poster={video.thumbnailUrl}
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold line-clamp-2 mb-2">{video.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Uploader Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={video.uploaderId?.profilePicture} alt={video.uploaderId?.username} />
                  <AvatarFallback>{video.uploaderId?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{video.uploaderId?.username || 'Unknown'}</div>
                  <div className="text-xs text-muted-foreground">1.2M subscribers</div>
                </div>
                <Button variant="default" className="ml-2 rounded-full">Subscribe</Button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                <div className="flex bg-muted rounded-full items-center">
                  <Button variant="ghost" className="rounded-l-full px-4 border-r border-border hover:bg-muted-foreground/10">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    <span>24K</span>
                  </Button>
                  <Button variant="ghost" className="rounded-r-full px-4 hover:bg-muted-foreground/10">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="secondary" className="rounded-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                <Button variant="secondary" size="icon" className="rounded-full flex-shrink-0">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-4" />
          
          {/* Description Box */}
          <div className="bg-muted/50 rounded-xl p-4 text-sm whitespace-pre-wrap">
            <div className="font-semibold mb-2">
              {formatViews(video.views)} views • {new Date(video.createdAt).toLocaleDateString()}
            </div>
            {video.description || 'No description provided.'}
          </div>
          
        </div>

        {/* Sidebar Column */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Up Next</h3>
          <div className="text-muted-foreground text-sm border-2 border-dashed rounded-xl p-8 text-center">
            Recommendations will appear here
          </div>
        </div>

      </div>
    </div>
  );
}
