/**
 * main.js
 * Core application logic for klip
 */

document.addEventListener('DOMContentLoaded', async () => {
    console.log('klip application initialized');

    // 1. ASYNC: Load Structural Components
    // We use Promise.all to fetch them in parallel
    await Promise.all([
        // Load Header & Footer
        loadComponent('app-header', 'components/header/header.html'),
        loadComponent('app-footer', 'components/footer/footer.html')
    ]);

    // 1b. Initialize Internal Notice (Dynamic Injection)
    initInternalNotice();

    // 1c. Initialize Auth
    await initAuth();

    // 2. Render Content (Data-driven)
    renderFeaturedContent();
    renderPopularContent();

    // 3. Initialize Interactions
    initSearch();
    initVideoInteractions();

    // 4. Initialize Theme Logic (requires Header to be present)
    if (typeof window.initTheme === 'function') {
        window.initTheme();
    }

    // 5. Update Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

/**
 * Loads an external HTML file into a container
 * @param {string} containerId 
 * @param {string} filePath 
 */
async function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const html = await response.text();
            container.innerHTML = html;
        } else {
            console.error(`Failed to load ${filePath}: ${response.status}`);
            container.innerHTML = `<p>Error loading component</p>`;
        }
    } catch (e) {
        console.error(`Error fetching ${filePath}:`, e);
    }
}

/**
 * Renders the Featured Videos Section
 */
function renderFeaturedContent() {
    const container = document.getElementById('featured-container');
    if (!container) return;

    // We can reuse createVideoCardHTML from components.js
    // Assuming FEATURED_VIDEOS is global from data.js
    if (typeof FEATURED_VIDEOS !== 'undefined') {
        const videoCardsHTML = FEATURED_VIDEOS.map(video => createVideoCardHTML(video)).join('');
        container.innerHTML = videoCardsHTML;
    }
}

/**
 * Renders the Most Popular Category Rows
 */
function renderPopularContent() {
    const container = document.getElementById('popular-container');
    if (!container) return;

    if (typeof CATEGORIES !== 'undefined') {
        // renderCategoryRow is in components.js
        const rowsHTML = CATEGORIES.map(category => renderCategoryRow(category)).join('');
        container.innerHTML = rowsHTML;
    }
}

/**
 * Initialize Search Functionality
 */
function initSearch() {
    // Delegation or wait for render
    // Since we rendered synchronously inside DOMContentLoaded, we can specific query
    const searchForm = document.querySelector('.search form');
    if (!searchForm) return;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchForm.querySelector('input').value;
        if (query.trim()) {
            console.log(`Searching for: ${query}`);
            alert(`Search functionality coming soon!\nYou searched for: "${query}"`);
        }
    });
}

/**
 * Initialize Video Card Interactions
 */
function initVideoInteractions() {
    // Intercept clicks for View Transitions
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('.thumbnail-link');
        if (link) {
            // Find the thumbnail image element within
            const thumb = link.querySelector('.thumbnail');
            if (thumb) {
                // Set the unique transition name to ANY thumbnail clicked
                thumb.style.viewTransitionName = 'hero-video';
            }
        }
    });
}

// REMOVE ME BEFORE I GO INTO PROD LOL :)
/**
 * Initialize Internal Notice
 * Injects CSS and HTML for the "Internal Build" banner
 */
function initInternalNotice() {
    const container = document.getElementById('app-notice');
    if (!container) return;

    // Inject Styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        /* Internal Notice - Shared Component */
        .internal-notice {
            text-align: center;
            color: var(--accent-color);
            padding: 0.8rem;
            background-color: rgba(255, 111, 111, 0.1);
            border-bottom: 1px solid rgba(255, 111, 111, 0.2);
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);

    // Inject HTML
    container.innerHTML = `
        <div class="internal-notice">
            <strong>klip v0.0.1 - internal build - NOT FOR PUBLIC USE</strong>
        </div>
    `;

}

/**
 * Initialize Auth UI and Login Modal
 */
async function initAuth() {
    // 1. Inject Login Modal into the DOM if it doesn't exist
    if (!document.getElementById('login-modal')) {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'login-modal-container';
        document.body.appendChild(modalContainer);
        await loadComponent('login-modal-container', 'components/login-modal/login-modal.html');
    }

    const loginHeaderBtn = document.getElementById('loginHeaderBtn');
    const authUserMenu = document.getElementById('authUserMenu');
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    const loginModal = document.getElementById('login-modal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginForm = document.getElementById('loginForm');
    const loginErrorMsg = document.getElementById('loginErrorMsg');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const passwordInput = document.getElementById('password');

    // UI State Update Function
    const updateHeaderUI = () => {
        const user = Auth.getCurrentUser();

        if (user) {
            // Logged In State
            if (loginHeaderBtn) loginHeaderBtn.classList.add('auth-hidden');
            if (authUserMenu) authUserMenu.classList.remove('auth-hidden');

            // Update Profile Info
            const adminPanelLink = document.getElementById('adminPanelLink');
            const headerAvatar = document.getElementById('headerAvatar');
            const headerMenuUsername = document.getElementById('headerMenuUsername');

            if (headerAvatar) headerAvatar.style.backgroundImage = `url('${user.profilePicture}')`;
            if (headerMenuUsername) headerMenuUsername.textContent = user.username;

            // Admin Panel Visibility
            if (adminPanelLink) {
                if (user.role === 'admin') {
                    adminPanelLink.classList.remove('auth-hidden');
                } else {
                    adminPanelLink.classList.add('auth-hidden');
                }
            }
        } else {
            // Logged Out State
            if (loginHeaderBtn) loginHeaderBtn.classList.remove('auth-hidden');
            if (authUserMenu) authUserMenu.classList.add('auth-hidden');
            if (userDropdown) userDropdown.classList.remove('show');
        }
    };

    // Initial state check
    updateHeaderUI();

    // Listeners for Auth Events
    document.addEventListener('auth:login_success', updateHeaderUI);
    document.addEventListener('auth:logout', updateHeaderUI);

    // Open/Close Modal
    if (loginHeaderBtn && loginModal) {
        loginHeaderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('active');
            if (loginErrorMsg) loginErrorMsg.classList.add('hidden');
            loginForm.reset();
        });
    }

    if (closeLoginModal && loginModal) {
        closeLoginModal.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });
    }

    // Toggle Password Visibility
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePasswordBtn.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
        });
    }

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value.trim();
            const password = loginForm.password.value;

            const user = Auth.login(username, password);

            if (user) {
                // Success
                loginModal.classList.remove('active');
            } else {
                // Error
                if (loginErrorMsg) {
                    loginErrorMsg.classList.remove('hidden');
                    // Add a subtle shake animation to the form
                    loginForm.style.animation = 'none';
                    loginForm.offsetHeight; /* trigger reflow */
                    loginForm.style.animation = 'shake 0.4s';
                }
            }
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
        });
    }
}

// Add shake animation to CSS dynamically for login errors
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);
