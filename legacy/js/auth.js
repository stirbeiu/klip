/**
 * auth.js
 * Handles mock authentication and state management for klip.
 */

const Auth = {
    // Mock user database
    users: {
        'admin': {
            id: 'admin_123',
            username: 'admin',
            password: 'admin123', // DO NOT USE THIS IN PROD - Plaintext password for demo purposes only
            role: 'admin',
            profilePicture: 'https://ui-avatars.com/api/?name=Admin&background=random',
            verified: true
        },
        'user': {
            id: 'user_456',
            username: 'user',
            password: 'user123', // DO NOT USE THIS IN PROD - Plaintext password for demo purposes only
            role: 'user',
            profilePicture: 'https://ui-avatars.com/api/?name=User&background=random',
            verified: false
        }
    },

    /**
     * Authenticates a user based on username and password.
     * @param {string} username 
     * @param {string} password 
     * @returns {Object|null} The user object if successful, null otherwise.
     */
    login: function (username, password) {
        const user = this.users[username.toLowerCase()];
        if (user && user.password === password) {
            // Remove password from stored session data
            const sessionUser = { ...user };
            delete sessionUser.password;

            localStorage.setItem('klip_auth_user', JSON.stringify(sessionUser));

            // Dispatch a custom event to notify components
            document.dispatchEvent(new CustomEvent('auth:login_success', { detail: sessionUser }));
            return sessionUser;
        }
        return null;
    },

    /**
     * Logs out the current user by clearing localStorage.
     */
    logout: function () {
        localStorage.removeItem('klip_auth_user');
        // Dispatch a custom event to notify components
        document.dispatchEvent(new Event('auth:logout'));
    },

    /**
     * Retrieves the currently logged-in user from localStorage.
     * @returns {Object|null} The user object or null if not logged in.
     */
    getCurrentUser: function () {
        const storedUser = localStorage.getItem('klip_auth_user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (e) {
                console.error("Failed to parse stored user data.", e);
                return null;
            }
        }
        return null;
    },

    /**
     * Checks if the currently logged-in user has admin privileges.
     * @returns {boolean} True if admin, false otherwise.
     */
    isAdmin: function () {
        const user = this.getCurrentUser();
        return user !== null && user.role === 'admin';
    }
};

// Make Auth available globally
window.Auth = Auth;
