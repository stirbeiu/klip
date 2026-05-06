/**
 * watch.js
 * Logic for the Watch Page (Video playback, details, comments)
 */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id');

    if (videoId) {
        loadVideo(videoId);
    } else {
        // Fallback: load first featured video if no ID
        if (typeof FEATURED_VIDEOS !== 'undefined' && FEATURED_VIDEOS.length > 0) {
            // We need to assume the ID was generated consistently
            // Since hydration is deterministic for the same title, we can just pick one.
            loadVideo(FEATURED_VIDEOS[0].id);
        }
    }

    initPlayerControls();
});

/**
 * Find video by ID and render details
 */
function loadVideo(id) {
    let video = findVideoById(id);

    if (!video) {
        document.getElementById('watchTitle').textContent = "Video not found";
        return;
    }

    // Render Title & Meta
    document.title = `${video.title} - Klip`;
    document.getElementById('watchTitle').textContent = video.title;
    document.getElementById('watchViews').textContent = video.viewCount;
    document.getElementById('watchDate').textContent = video.uploadDate;

    // Render Stats
    document.getElementById('likeCount').textContent = formatCount(video.likes);
    document.getElementById('dislikeCount').textContent = video.dislikes; // or format if needed

    // Render Channel
    document.getElementById('channelName').textContent = video.userName;
    document.getElementById('subCount').textContent = `${video.subscriberCount} subscribers`;
    const avatar = document.getElementById('channelAvatar');
    avatar.style.backgroundImage = `url('${video.userProfilePicture}')`;

    // Render Description
    document.getElementById('videoDescription').textContent = video.description || `Mock description for ${video.title}.`;

    // Render Comments
    renderComments(video.comments || []);

    // Simulate Player Loading (Placeholder is already there)
}

/**
 * Search both Featured and Categories to find video
 */
function findVideoById(id) {
    // Check Featured
    let found = FEATURED_VIDEOS.find(v => v.id === id);
    if (found) return found;

    // Check Categories
    for (const cat of CATEGORIES) {
        found = cat.videos.find(v => v.id === id);
        if (found) return found;
    }
    return null;
}

/**
 * Render Comments List
 */
function renderComments(comments) {
    const list = document.getElementById('commentsList');
    document.querySelector('.comment-count-display').textContent = comments.length;

    list.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-avatar"></div> <!-- Placeholder avatar -->
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-user">${comment.user}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
                <div class="comment-actions">
                    <button class="btn-comment-action"><i class="fa-regular fa-thumbs-up"></i> ${comment.likes > 0 ? comment.likes : ''}</button>
                    <button class="btn-comment-action"><i class="fa-regular fa-thumbs-down"></i></button>
                    <button class="btn-comment-action">Reply</button>
                    <button class="btn-comment-action" title="Report"><i class="fa-regular fa-flag"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Initialize Player Controls (Custom)
 */
// Player controls are initialized from components/video-player/video-player.js

/**
 * Helper to format numbers (e.g. 1200 -> 1.2K) - Basic version
 */
function formatCount(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
}
