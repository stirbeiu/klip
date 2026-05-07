import mongoose from 'mongoose';
import 'dotenv/config'; // We'll install dotenv to run this easily

// Define basic schemas for seeding since we run this standalone
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profilePicture: String,
  role: String,
}, { timestamps: true });

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  duration: String,
  views: Number,
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isFeatured: Boolean,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

async function seed() {
  // Use the URI from environment, or default to Docker's port mappings if running locally
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/klip';
  
  try {
    console.log(`Connecting to MongoDB at ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to database. Seeding data...');

    // Clear existing data
    await User.deleteMany({});
    await Video.deleteMany({});

    // 1. Create Admin Account
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await User.create({
      username: 'sstirbeiu',
      email: 'sstirbeiu@klip.com',
      password: hashedPassword,
      profilePicture: 'https://ui-avatars.com/api/?name=Stefan&background=random',
      role: 'admin'
    });
    console.log(`✅ Admin account created: ${admin.username} (Password: admin123)`);

    // 2. Create Sample Video
    const sampleVideo = await Video.create({
      title: 'Sample Video: The Future of Klip',
      description: 'This is a test video uploaded automatically during the database verification phase.',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80',
      duration: '0:14',
      views: 42,
      uploaderId: admin._id,
      isFeatured: true
    });
    console.log(`✅ Sample video created: ${sampleVideo.title}`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
