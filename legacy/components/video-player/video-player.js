/**
 * Initialize Player Controls (Custom)
 */
function initPlayerControls() {
    const video = document.getElementById('mainVideo');
    const playerContainer = document.getElementById('videoPlayerContainer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const bigPlayBtn = document.getElementById('bigPlayBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const fsBtn = document.getElementById('fsBtn');
    const pipBtn = document.getElementById('pipBtn');

    // Time & Seek IDs
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const seekSlider = document.getElementById('seekSlider');

    // Menus
    const speedMenu = document.getElementById('speedMenu');
    const speedBtn = document.getElementById('speedBtn');
    const qualityMenu = document.getElementById('qualityMenu');
    const qualityBtn = document.getElementById('qualityBtn');

    if (!video) return;

    // --- Core Playback --- //

    function togglePlay() {
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    }

    function updatePlayIcon() {
        if (video.paused) {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            bigPlayBtn.style.display = 'flex';
            requestAnimationFrame(() => bigPlayBtn.style.opacity = '1');
        } else {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            bigPlayBtn.style.opacity = '0';
            setTimeout(() => {
                if (!video.paused) bigPlayBtn.style.display = 'none';
            }, 300);
        }
    }

    // --- Time & Scrubbing --- //

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    function updateProgress() {
        const current = video.currentTime;
        const duration = video.duration || 0;

        // Update Text
        currentTimeEl.textContent = formatTime(current);
        durationEl.textContent = formatTime(duration);

        // Update Slider if not currently being dragged (simple check usually needed, but basic works)
        const percentage = (current / duration) * 100;
        seekSlider.value = isNaN(percentage) ? 0 : percentage;

        // Update slider background gradient for fill effect
        seekSlider.style.background = `linear-gradient(to right, white ${percentage}%, rgba(255,255,255,0.2) ${percentage}%)`;
    }

    function seek(e) {
        const seekTo = (video.duration / 100) * e.target.value;
        video.currentTime = seekTo;
    }

    // --- Volume --- //

    function updateVolume() {
        video.volume = volumeSlider.value;
        updateVolumeIcon();
    }

    function updateVolumeIcon() {
        // Static icon as requested - only change if muted
        if (video.muted || video.volume === 0) {
            volumeBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            // Always use high icon regardless of level
            volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }

        // Update slider fill
        // Fix: If muted, show 0 fill
        const percentage = (video.muted) ? 0 : (video.volume * 100);
        volumeSlider.style.background = `linear-gradient(to right, white ${percentage}%, rgba(255,255,255,0.2) ${percentage}%)`;
    }

    function toggleMute() {
        video.muted = !video.muted;
        if (video.muted) {
            volumeSlider.value = 0;
        } else {
            volumeSlider.value = video.volume || 1;
        }
        updateVolumeIcon();
    }

    // --- Auto-Hide Controls --- //
    let controlsTimer;

    function showControls() {
        if (!playerContainer) return;
        playerContainer.classList.remove('user-inactive');

        clearTimeout(controlsTimer);

        // Only hide again if playing
        if (!video.paused) {
            controlsTimer = setTimeout(() => {
                playerContainer.classList.add('user-inactive');
                closeAllMenus(); // Close menus when hiding UI
            }, 3000);
        }
    }

    // Setup activity listeners
    if (playerContainer) {
        playerContainer.addEventListener('mousemove', showControls);
        playerContainer.addEventListener('click', showControls);
        playerContainer.addEventListener('keydown', showControls);
    }

    // --- Settings (Speed/Quality) --- //

    // --- Settings (Speed/Quality) --- //

    function closeAllMenus() {
        if (speedMenu) speedMenu.classList.remove('show');
        if (qualityMenu) qualityMenu.classList.remove('show');
    }

    function toggleMenu(menu) {
        if (!menu) return;
        const isShown = menu.classList.contains('show');
        closeAllMenus();
        if (!isShown) {
            menu.classList.add('show');
            // When menu is open, we might want to prevent auto-hide immediately, 
            // but the user said "if no interaction detected... close menu and hide".
            // So we just rely on standard timer reset by click.
            showControls();
        }
    }

    // Speed
    if (speedBtn && speedMenu) {
        speedBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(speedMenu);
        });

        speedMenu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent document click handling immediately
                const speed = parseFloat(item.dataset.speed);
                video.playbackRate = speed;
                speedBtn.textContent = item.textContent;

                speedMenu.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                closeAllMenus();
            });
        });
    }

    // Quality (Mock)
    if (qualityBtn && qualityMenu) {
        qualityBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(qualityMenu);
        });

        qualityMenu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                qualityBtn.textContent = item.textContent;

                qualityMenu.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                console.log(`Switched quality to ${item.textContent}`);
                closeAllMenus();
            });
        });
    }

    // Close menus on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-control')) {
            closeAllMenus();
        }
    });


    // --- Hotkeys --- //
    document.addEventListener('keydown', (e) => {
        // Ignore if user is typing in an input text area
        const tagName = document.activeElement.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea' || document.activeElement.isContentEditable) {
            return;
        }

        const key = e.key.toLowerCase();

        switch (key) {
            case ' ':
            case 'k':
                e.preventDefault(); // Prevent scrolling for space
                togglePlay();
                showControls(); // Show controls on interaction
                break;

            case 'm':
                toggleMute();
                showControls();
                break;

            case 'f':
                if (fsBtn) fsBtn.click();
                showControls();
                break;

            case 'i':
                if (pipBtn) pipBtn.click();
                showControls();
                break;

            case 'arrowright':
            case 'l':
                e.preventDefault(); // Prevent scroll
                video.currentTime = Math.min(video.duration, video.currentTime + (key === 'l' ? 10 : 5));
                showControls();
                break;

            case 'arrowleft':
            case 'j':
                e.preventDefault();
                video.currentTime = Math.max(0, video.currentTime - (key === 'j' ? 10 : 5));
                showControls();
                break;

            case 'arrowup':
                e.preventDefault();
                video.volume = Math.min(1, video.volume + 0.1);
                volumeSlider.value = video.volume;
                updateVolumeIcon();
                showControls();
                break;

            case 'arrowdown':
                e.preventDefault();
                video.volume = Math.max(0, video.volume - 0.1);
                volumeSlider.value = video.volume;
                updateVolumeIcon();
                showControls();
                break;
        }
    });

    // --- Event Listeners --- //
    playPauseBtn.addEventListener('click', togglePlay);
    bigPlayBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    video.addEventListener('play', () => {
        updatePlayIcon();
        showControls();
    });
    video.addEventListener('pause', () => {
        updatePlayIcon();
        showControls();
    });
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);

    // Seek
    // Seek
    function updateSeekTooltip(e) {
        const rect = seekSlider.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        let percentage = (offsetX / rect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage)); // Clamp

        const time = (video.duration || 0) * (percentage / 100);

        seekSlider.setAttribute('data-tooltip', formatTime(time));
        seekSlider.style.setProperty('--seek-tooltip-pos', percentage + '%');
    }

    seekSlider.addEventListener('mousemove', updateSeekTooltip);

    seekSlider.addEventListener('input', (e) => {
        // Realtime scrubbing visual
        const val = e.target.value;
        seekSlider.style.background = `linear-gradient(to right, white ${val}%, rgba(255,255,255,0.2) ${val}%)`;

        // Update time text while dragging
        const time = (video.duration / 100) * val;
        currentTimeEl.textContent = formatTime(time);

        // Update tooltip while dragging (sync with thumb)
        seekSlider.setAttribute('data-tooltip', formatTime(time));
        seekSlider.style.setProperty('--seek-tooltip-pos', val + '%');

        // Actually seek
        seek(e);
    });

    // Volume
    volumeSlider.addEventListener('input', updateVolume);
    volumeBtn.addEventListener('click', toggleMute);

    // Fullscreen
    if (fsBtn && playerContainer) {
        fsBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (playerContainer.requestFullscreen) playerContainer.requestFullscreen();
                else if (playerContainer.webkitRequestFullscreen) playerContainer.webkitRequestFullscreen();
                else if (playerContainer.msRequestFullscreen) playerContainer.msRequestFullscreen();
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
            }
        });
    }

    // PIP
    if (pipBtn && video.requestPictureInPicture) {
        pipBtn.addEventListener('click', async () => {
            try {
                if (document.pictureInPictureElement) {
                    await document.exitPictureInPicture();
                } else {
                    await video.requestPictureInPicture();
                }
            } catch (error) {
                console.error(error);
            }
        });
    } else if (pipBtn) {
        pipBtn.style.display = 'none'; // Hide if not supported
    }

    // Initial State
    updateVolumeIcon();
    updateProgress();
}
