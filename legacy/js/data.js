/**
 * Mock Data for klip
 * Standardized schema for video objects.
 */

const FEATURED_VIDEOS = [
    {
        title: "The Future of Sustainable Architecture",
        thumbnail: "https://picsum.photos/id/1018/800/450",
        userProfilePicture: "https://picsum.photos/id/64/100/100",
        userName: "Design Digest",
        userVerifiedStatus: true,
        videoCategory: "Education",
        uploadDate: "2 days ago",
        viewCount: "245K views",
        duration: "14:20"
    },
    {
        title: "Full Gameplay Walkthrough: Elden Ring DLC",
        thumbnail: "https://picsum.photos/id/1015/800/450",
        userProfilePicture: "https://picsum.photos/id/1005/100/100",
        userName: "ProGamerHub",
        userVerifiedStatus: true,
        videoCategory: "Gaming",
        uploadDate: "5 hours ago",
        viewCount: "1.2M views",
        duration: "28:45"
    },
    {
        title: "Deep Dive: Quantum Computing Explained",
        thumbnail: "https://picsum.photos/id/1016/800/450",
        userProfilePicture: "https://picsum.photos/id/1011/100/100",
        userName: "Science Today",
        userVerifiedStatus: true,
        videoCategory: "Technology",
        uploadDate: "1 week ago",
        viewCount: "89K views",
        duration: "45:10"
    },
    {
        title: "Jazz Fusion Essentials - Live Performance",
        thumbnail: "https://picsum.photos/id/1019/800/450",
        userProfilePicture: "https://picsum.photos/id/453/100/100",
        userName: "Music Lounge",
        userVerifiedStatus: false,
        videoCategory: "Music",
        uploadDate: "3 days ago",
        viewCount: "56K views",
        duration: "1:12:05"
    }
];

const CATEGORIES = [
    {
        name: "Entertainment",
        icon: "fa-solid fa-film",
        videos: [
            {
                title: "Top 10 Comedy Sketches of the Month",
                thumbnail: "https://picsum.photos/id/1025/800/450",
                userProfilePicture: "https://picsum.photos/id/237/100/100",
                userName: "Laugh Out Loud",
                userVerifiedStatus: true,
                videoCategory: "Entertainment",
                uploadDate: "Yesterday",
                viewCount: "2.1M views",
                duration: "18:30"
            },
            {
                title: "Try Not To Laugh Challenge (Impossible)",
                thumbnail: "https://picsum.photos/id/1035/800/450",
                userProfilePicture: "https://picsum.photos/id/65/100/100",
                userName: "Daily Humour",
                userVerifiedStatus: false,
                videoCategory: "Entertainment",
                uploadDate: "3 days ago",
                viewCount: "500K views",
                duration: "10:45"
            },
            {
                title: "Behind The Scenes: Blockbuster Movie",
                thumbnail: "https://picsum.photos/id/1040/800/450",
                userProfilePicture: "https://picsum.photos/id/91/100/100",
                userName: "MovieBuffs",
                userVerifiedStatus: false,
                videoCategory: "Entertainment",
                uploadDate: "1 week ago",
                viewCount: "800K views",
                duration: "22:15"
            },
            {
                title: "Celebrity Impressions That Are Spot On",
                thumbnail: "https://picsum.photos/id/1050/800/450",
                userProfilePicture: "https://picsum.photos/id/669/100/100",
                userName: "Talent Show",
                userVerifiedStatus: false,
                videoCategory: "Entertainment",
                uploadDate: "2 weeks ago",
                viewCount: "1.5M views",
                duration: "08:20"
            }
        ]
    },
    {
        name: "Gaming",
        icon: "fa-solid fa-gamepad",
        videos: [
            { title: "Speedrun World Record: Any% Glitchless", thumbnail: "https://picsum.photos/id/1018/800/450", userProfilePicture: "https://picsum.photos/id/823/100/100", userName: "SpeedRunnerX", userVerifiedStatus: false, videoCategory: "Gaming", uploadDate: "2 weeks ago", viewCount: "890K views", duration: "3:45:10" },
            { title: "Reviewing The Newest VR Headset", thumbnail: "https://picsum.photos/id/1015/800/450", userProfilePicture: "https://picsum.photos/id/1027/100/100", userName: "TechGaming", userVerifiedStatus: false, videoCategory: "Gaming", uploadDate: "Yesterday", viewCount: "120K views", duration: "25:30" },
            { title: "Top 10 RPGs You Must Play in 2026", thumbnail: "https://picsum.photos/id/1016/800/450", userProfilePicture: "https://picsum.photos/id/338/100/100", userName: "RPG Fanatic", userVerifiedStatus: true, videoCategory: "Gaming", uploadDate: "1 month ago", viewCount: "2M views", duration: "12:00" },
            { title: "E-Sports Championship Finals - Live Replay", thumbnail: "https://picsum.photos/id/1019/800/450", userProfilePicture: "https://picsum.photos/id/203/100/100", userName: "ESL Official", userVerifiedStatus: true, videoCategory: "Gaming", uploadDate: "3 days ago", viewCount: "5M views", duration: "45:20" }
        ]
    },
    {
        name: "Music",
        icon: "fa-solid fa-music",
        videos: [
            { title: "Midnight Tides - Official Music Video", thumbnail: "https://picsum.photos/id/1025/800/450", userProfilePicture: "https://picsum.photos/id/449/100/100", userName: "Indie Sounds", userVerifiedStatus: true, videoCategory: "Music", uploadDate: "1 month ago", viewCount: "5M views", duration: "04:35" },
            { title: "Lo-Fi Hip Hop Radio - Beats to Study/Relax To", thumbnail: "https://picsum.photos/id/1035/800/450", userProfilePicture: "https://picsum.photos/id/1012/100/100", userName: "ChilledCow", userVerifiedStatus: false, videoCategory: "Music", uploadDate: "LIVE", viewCount: "20K watching", duration: "1:12:00" },
            { title: "Summer Vibes 2026 Mix", thumbnail: "https://picsum.photos/id/1040/800/450", userProfilePicture: "https://picsum.photos/id/1009/100/100", userName: "DJ Alex", userVerifiedStatus: false, videoCategory: "Music", uploadDate: "2 weeks ago", viewCount: "300K views", duration: "03:45" },
            { title: "Learn Piano in 10 Minutes", thumbnail: "https://picsum.photos/id/1050/800/450", userProfilePicture: "https://picsum.photos/id/838/100/100", userName: "Music Academy", userVerifiedStatus: false, videoCategory: "Music", uploadDate: "1 year ago", viewCount: "100K views", duration: "05:10" }
        ]
    },
    {
        name: "Science & Technology",
        icon: "fa-solid fa-microchip",
        videos: [
            { title: "The Future of AI Robotics", thumbnail: "https://picsum.photos/id/1018/800/450", userProfilePicture: "https://picsum.photos/id/531/100/100", userName: "Tech Insider", userVerifiedStatus: true, videoCategory: "Technology", uploadDate: "5 hours ago", viewCount: "120K views", duration: "15:20" },
            { title: "Understanding Astrophysics: Black Holes", thumbnail: "https://picsum.photos/id/1015/800/450", userProfilePicture: "https://picsum.photos/id/77/100/100", userName: "EduTube", userVerifiedStatus: false, videoCategory: "Education", uploadDate: "4 days ago", viewCount: "400K views", duration: "22:00" },
            { title: "Smartphone Review: Is It Worth It?", thumbnail: "https://picsum.photos/id/1016/800/450", userProfilePicture: "https://picsum.photos/id/4/100/100", userName: "Gadget Reviews", userVerifiedStatus: false, videoCategory: "Technology", uploadDate: "2 days ago", viewCount: "90K views", duration: "10:15" },
            { title: "Coding a Website in 10 Minutes", thumbnail: "https://picsum.photos/id/1019/800/450", userProfilePicture: "https://picsum.photos/id/0/100/100", userName: "Dev Tutorials", userVerifiedStatus: false, videoCategory: "Education", uploadDate: "1 month ago", viewCount: "250K views", duration: "08:45" }
        ]
    },
    {
        name: "Lifestyle & Vlogs",
        icon: "fa-solid fa-camera-retro",
        videos: [
            { title: "A Week in My Life: Tokyo Edition", thumbnail: "https://picsum.photos/id/1025/800/450", userProfilePicture: "https://picsum.photos/id/35/100/100", userName: "DailyVlogger", userVerifiedStatus: false, videoCategory: "Vlogs", uploadDate: "3 weeks ago", viewCount: "300K views", duration: "12:45" },
            { title: "Backpacking Through Europe Guide", thumbnail: "https://picsum.photos/id/1035/800/450", userProfilePicture: "https://picsum.photos/id/900/100/100", userName: "Travel Bug", userVerifiedStatus: false, videoCategory: "Travel", uploadDate: "2 months ago", viewCount: "500K views", duration: "25:10" },
            { title: "Authentic Carbonara Recipe - No Cream!", thumbnail: "https://picsum.photos/id/1040/800/450", userProfilePicture: "https://picsum.photos/id/40/100/100", userName: "Chef Mario", userVerifiedStatus: false, videoCategory: "Cooking", uploadDate: "2 months ago", viewCount: "800K views", duration: "12:30" },
            { title: "Full Body HIIT Workout - No Equipment", thumbnail: "https://picsum.photos/id/1050/800/450", userProfilePicture: "https://picsum.photos/id/41/100/100", userName: "Fitness Pro", userVerifiedStatus: false, videoCategory: "Fitness", uploadDate: "5 months ago", viewCount: "1.5M views", duration: "45:00" }
        ]
    },
    {
        name: "News & Information",
        icon: "fa-solid fa-newspaper",
        videos: [
            { title: "Global Market Update: Tech Stocks Rise", thumbnail: "https://picsum.photos/id/1018/800/450", userProfilePicture: "https://picsum.photos/id/60/100/100", userName: "Finance Daily", userVerifiedStatus: true, videoCategory: "News", uploadDate: "4 hours ago", viewCount: "55K views", duration: "10:15" },
            { title: "The Lost City of Petra: Revealed", thumbnail: "https://picsum.photos/id/1015/800/450", userProfilePicture: "https://picsum.photos/id/80/100/100", userName: "History Channel", userVerifiedStatus: false, videoCategory: "Documentary", uploadDate: "1 year ago", viewCount: "2M views", duration: "55:40" },
            { title: "Deep Analysis: Policy Changes in 2026", thumbnail: "https://picsum.photos/id/1016/800/450", userProfilePicture: "https://picsum.photos/id/101/100/100", userName: "Political Review", userVerifiedStatus: false, videoCategory: "News", uploadDate: "3 days ago", viewCount: "150K views", duration: "28:00" },
            { title: "Sunday Football Highlights - Week 4", thumbnail: "https://picsum.photos/id/1019/800/450", userProfilePicture: "https://picsum.photos/id/102/100/100", userName: "Sports Central", userVerifiedStatus: true, videoCategory: "Sports", uploadDate: "1 day ago", viewCount: "900K views", duration: "12:50" }
        ]
    }
];

// Hydrate video objects with mock interaction data
const VIDEO_COMMENTS = [
    { user: "Tech Enthusiast", text: "This is exactly what I was looking for!", date: "2 hours ago", likes: 124, replies: [] },
    { user: "Sarah Jenkins", text: "Great production quality. Subscribed!", date: "1 day ago", likes: 45, replies: [] },
    { user: "GamingPro99", text: "Can you do a tutorial on the advanced settings?", date: "3 days ago", likes: 8, replies: [] },
    { user: "Alice Wonder", text: "First comment!", date: "1 week ago", likes: 2, replies: [] }
];

function hydrateVideoData(video) {
    if (!video.likes) {
        video.likes = Math.floor(Math.random() * 50000) + 500;
        video.dislikes = Math.floor(Math.random() * 1000);
        video.subscriberCount = (Math.floor(Math.random() * 5) + 1) + "M";
        video.comments = [...VIDEO_COMMENTS]; // Shared reference is fine for mock
        video.description = `Enjoy this amazing content about ${video.title}. Don't forget to like and subscribe for more ${video.videoCategory} videos!`;
        video.id = btoa(video.title).replace(/=/g, '').substring(0, 12); // Simple base64 ID from title
    }
}

FEATURED_VIDEOS.forEach(hydrateVideoData);
CATEGORIES.forEach(cat => cat.videos.forEach(hydrateVideoData));

// Export if module system is available, otherwise global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FEATURED_VIDEOS, CATEGORIES };
}
