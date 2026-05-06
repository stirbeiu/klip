import dbConnect from '@/lib/mongodb';
import Video from '@/models/Video';
import User from '@/models/User';
import Category from '@/models/Category';
import VideoCard from '@/components/video/VideoCard';
import { Star, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getFeaturedVideos() {
  try {
    await dbConnect();
    // Ensure User model is loaded
    User.init();
    
    const videos = await Video.find({ isFeatured: true })
      .populate('uploaderId', 'username profilePicture')
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();
      
    // Convert ObjectIds to strings for Next.js serialization
    return JSON.parse(JSON.stringify(videos));
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function getPopularVideos() {
  try {
    await dbConnect();
    const videos = await Video.find({})
      .populate('uploaderId', 'username profilePicture')
      .sort({ views: -1 })
      .limit(12)
      .lean();
      
    return JSON.parse(JSON.stringify(videos));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  // If there's no DB connection string, this might fail gracefully or throw.
  // We handle it in the catch block of the fetchers.
  let featuredVideos = [];
  let popularVideos = [];
  
  if (process.env.MONGODB_URI) {
    featuredVideos = await getFeaturedVideos();
    popularVideos = await getPopularVideos();
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {!process.env.MONGODB_URI && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-lg flex items-center justify-center">
          <p className="font-medium">Please configure MONGODB_URI in your .env.local file to see real data.</p>
        </div>
      )}

      {/* Featured Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
          <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
        </div>
        
        {featuredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredVideos.map((video: any) => (
              <VideoCard key={video._id} {...video} />
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground py-8 border-2 border-dashed rounded-xl text-center">
            No featured videos found.
          </div>
        )}
      </section>

      {/* Popular Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-bold tracking-tight">Most Popular</h2>
        </div>
        
        {popularVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularVideos.map((video: any) => (
              <VideoCard key={video._id} {...video} />
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground py-8 border-2 border-dashed rounded-xl text-center">
            No popular videos found.
          </div>
        )}
      </section>
    </div>
  );
}
