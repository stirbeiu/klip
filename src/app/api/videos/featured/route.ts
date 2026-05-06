import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Video from '@/models/Video';

export async function GET() {
  try {
    await dbConnect();
    
    // Find videos marked as featured, populate uploader info
    const featuredVideos = await Video.find({ isFeatured: true })
      .populate('uploaderId', 'username profilePicture')
      .sort({ createdAt: -1 })
      .limit(6);
      
    return NextResponse.json({ success: true, data: featuredVideos });
  } catch (error: any) {
    console.error('Error fetching featured videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured videos' },
      { status: 500 }
    );
  }
}
