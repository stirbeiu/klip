/**
 * theme-init.js
 * Runs immediately in <head> to prevent FOUC (Flash of Unstyled Content)
 * Checks localStorage or system preference and applies 'light-mode' class if needed.
 */
(function () {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    let shouldBeLight = false;

    if (savedTheme) {
        shouldBeLight = (savedTheme === 'light');
    } else if (systemPrefersLight) {
        shouldBeLight = true;
    }

    if (shouldBeLight) {
        document.documentElement.classList.add('light-mode');
    }

    // --- Dynamic Head Resources ---

    // Inject Favicon
    if (!document.querySelector('link[rel="icon"]')) {
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        favicon.href = 'assets/favicon.png';
        document.head.appendChild(favicon);
    }
})();
