import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Video from '@/models/Video';

export async function GET() {
  try {
    await dbConnect();
    
    // Find popular videos sorted by views descending
    const popularVideos = await Video.find({})
      .populate('uploaderId', 'username profilePicture')
      .sort({ views: -1 })
      .limit(12);
      
    return NextResponse.json({ success: true, data: popularVideos });
  } catch (error: any) {
    console.error('Error fetching popular videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch popular videos' },
      { status: 500 }
    );
  }
}
