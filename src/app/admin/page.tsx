import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Video from '@/models/Video';
import UploadVideoDialog from '@/components/video/UploadVideoDialog';
import DeleteVideoButton from '@/components/video/DeleteVideoButton';

async function getVideos() {
  await dbConnect();
  const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(videos));
}

export default async function AdminPage() {
  const session = await getSession();
  
  if (!session || session.role !== 'admin') {
    redirect('/');
  }

  const videos = await getVideos();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <UploadVideoDialog />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Video</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Views</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No videos found. Upload one to get started.
                  </td>
                </tr>
              ) : (
                videos.map((video: any) => (
                  <tr key={video._id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title} 
                          className="w-16 h-10 object-cover rounded"
                        />
                        <div className="font-medium line-clamp-1">{video.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {video.views}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeleteVideoButton id={video._id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
