import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  uploaderId: mongoose.Types.ObjectId;
  categoryIds: mongoose.Types.ObjectId[];
  isFeatured: boolean;
  createdAt: Date;
}

const VideoSchema: Schema<IVideo> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    duration: { type: String, default: '0:00' },
    views: { type: Number, default: 0 },
    uploaderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Video: Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);

export default Video;
