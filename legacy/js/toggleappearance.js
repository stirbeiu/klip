// Expose initTheme globally for main.js to call after header injection
window.initTheme = function () {
    const themeToggleBtn = document.getElementById('themeToggle');
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');

    // Determine current state from HTML class
    const htmlInfo = document.documentElement;

    // --- 1. Sync Button Text on Load ---
    const isInitiallyLight = htmlInfo.classList.contains('light-mode');
    if (themeToggleBtn) {
        const textSpan = themeToggleBtn.querySelector('span');
        const icon = themeToggleBtn.querySelector('i');
        if (textSpan) textSpan.innerText = isInitiallyLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
        if (icon) icon.className = isInitiallyLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }

    // --- 2. System Preference Listener ---
    // Remove existing listener to avoid duplicates if re-init (optional, but good practice)
    // For simplicity in this v1, we just add it.
    window.matchMedia('(prefers-color-scheme: light)').onchange = event => {
        // Only react if user hasn't manually overridden via localStorage
        if (!localStorage.getItem('theme')) {
            if (event.matches) {
                htmlInfo.classList.add('light-mode');
                if (themeToggleBtn) {
                    const textSpan = themeToggleBtn.querySelector('span');
                    const icon = themeToggleBtn.querySelector('i');
                    if (textSpan) textSpan.innerText = 'Switch to Dark Mode';
                    if (icon) icon.className = 'fa-solid fa-moon';
                }
            } else {
                htmlInfo.classList.remove('light-mode');
                if (themeToggleBtn) {
                    const textSpan = themeToggleBtn.querySelector('span');
                    const icon = themeToggleBtn.querySelector('i');
                    if (textSpan) textSpan.innerText = 'Switch to Light Mode';
                    if (icon) icon.className = 'fa-solid fa-sun';
                }
            }
        }
    };

    // --- 3. Toggle Theme Event ---
    if (themeToggleBtn) {
        // Clone to remove old listeners if any, or just ensure we don't double bind? 
        // Simple way: just add listener.
        themeToggleBtn.onclick = (e) => {
            e.preventDefault();

            // Toggle class on HTML element
            htmlInfo.classList.toggle('light-mode');

            // Check new state
            const isLight = htmlInfo.classList.contains('light-mode');

            // Save to localStorage
            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            // Update button text and icon
            const textSpan = themeToggleBtn.querySelector('span');
            const icon = themeToggleBtn.querySelector('i');

            if (textSpan) textSpan.innerText = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
            if (icon) icon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        };
    }

    // --- 4. User Menu Dropdown Toggle ---
    if (userMenuBtn && userDropdown) {
        userMenuBtn.onclick = (e) => {
            e.preventDefault();
            const isExpanded = userDropdown.classList.contains('show');
            if (isExpanded) {
                userDropdown.classList.remove('show');
            } else {
                userDropdown.classList.add('show');
            }
        };

        // Close when clicking outside
        window.onclick = (e) => {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        };
    }
};
