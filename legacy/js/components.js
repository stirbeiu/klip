/**
 * components.js
 * Reusable HTML components for klip
 */

/**
 * Renders a grid of video cards for a specific category
 * @param {Object} category - The category object containing title and videos
 * @param {Array} videos - List of video objects
 */
function renderCategoryRow(category) {
    // Note: videos are now inside the category object in the new data structure, 
    // but the function signature in main.js calls it as (category).
    // The previous implementation mapped category.videos.
    // The new data structure in data.js aligns with this (category.videos).
    const videoCardsHTML = category.videos.map(video => createVideoCardHTML(video)).join('');

    return `
    <div class="category-row">
        <div class="category-header">
            <h3 class="category-title"><i class="${category.icon}"></i> ${category.name}</h3>
            <a href="#" class="see-all">See All</a>
        </div>
        <div class="video-grid">
            ${videoCardsHTML}
        </div>
    </div>
    `;
}

/**
 * Creates HTML for a single vertical video card
 * @param {Object} video 
 */
function createVideoCardHTML(video) {
    const verificationIcon = video.userVerifiedStatus ? '<i class="fa-solid fa-circle-check"></i>' : '';

    // Explicitly inline properties
    // title, thumbnail(url), userProfilePicture(url), userName, userVerifiedStatus, videoCategory, uploadDate, viewCount, duration
    return `
    <article class="video-card">
        <a href="watch.html?id=${video.id}" class="thumbnail-link">
            <div class="thumbnail" style="background-image: url('${video.thumbnail}');">
                <span class="duration">${video.duration}</span>
            </div>
        </a>
        <div class="video-details">
            <div class="channel-avatar" style="background-image: url('${video.userProfilePicture}');"></div>
            <div class="video-text">
                <h3 class="video-title"><a href="watch.html?id=${video.id}">${video.title}</a></h3>
                <a href="#" class="channel-name">${video.userName} ${verificationIcon}</a>
                <div class="video-meta">
                    <span>${video.viewCount}</span> • <span>${video.uploadDate}</span>
                </div>
            </div>
        </div>
    </article>
    `;
}
