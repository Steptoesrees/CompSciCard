// Window management system with layout animations
const windowManager = {
    windows: {
        chatbot: {
            element: null,
            tabElement: null,
            isMinimized: false,
            isAnimating: false
        },
        leftBG: {
            element: null,
            tabElement: null,
            isMinimized: false,
            isAnimating: false
        },
        rightBG: {
            element: null,
            tabElement: null,
            isMinimized: false,
            isAnimating: false
        }
    },

    init() {
        // Initialize window elements
        for (const [windowId, windowData] of Object.entries(this.windows)) {
            windowData.element = document.getElementById(windowId);
            windowData.tabElement = document.getElementById(windowId + 'Tab');
            
            if (windowData.tabElement) {
                windowData.tabElement.classList.add('active');
            }
        }
    },

    async toggleWindow(windowId) {
        const window = this.windows[windowId];
        if (!window || !window.element || window.isAnimating) return;

        window.isAnimating = true;
        this.addLayoutAnimation();

        if (window.isMinimized) {
            await this.restoreWindow(windowId);
        } else {
            await this.minimizeWindow(windowId);
        }

        // Wait for animation to complete
        setTimeout(() => {
            window.isAnimating = false;
            this.removeLayoutAnimation();
        }, 600);
    },

    async minimizeWindow(windowId) {
        const window = this.windows[windowId];
        if (!window || !window.element) return;

        // Add collapsing animation
        window.element.classList.add('collapsing', 'layout-changing');
        
        // Animate to minimized state
        setTimeout(() => {
            window.element.style.transform = 'scale(0) translateY(100px)';
            window.element.style.opacity = '0';
            window.element.style.flex = '0';
            window.element.style.maxWidth = '0';
            window.element.style.margin = '0';
            window.element.style.padding = '0';
        }, 10);

        // Update tab state
        window.tabElement.classList.add('window-minimized');
        window.tabElement.classList.remove('active');

        // Hide completely after animation
        setTimeout(() => {
            window.element.style.display = 'none';
            window.element.style.pointerEvents = 'none';
            window.element.classList.remove('collapsing', 'layout-changing');
            window.isMinimized = true;
            this.adjustLayout();
        }, 400);
    },

    async restoreWindow(windowId) {
        const window = this.windows[windowId];
        if (!window || !window.element) return;

        // Show element first
        window.element.style.display = '';
        window.element.style.pointerEvents = '';
        window.element.classList.add('expanding', 'layout-changing');

        // Set initial state for animation
        window.element.style.transform = 'scale(0) translateY(100px)';
        window.element.style.opacity = '0';
        window.element.style.flex = '0';
        window.element.style.maxWidth = '0';

        setTimeout(() => {
            window.element.style.transform = 'scale(1) translateY(0)';
            window.element.style.opacity = '1';
            window.element.style.flex = '1';
            window.element.style.maxWidth = '100%';
            window.element.style.margin = '';
            window.element.style.padding = '';
        }, 10);

        // Update tab state
        window.tabElement.classList.remove('window-minimized');
        window.tabElement.classList.add('active');

        // Clean up animation classes
        setTimeout(() => {
            window.element.classList.remove('expanding', 'layout-changing');
            window.isMinimized = false;
            this.adjustLayout();
        }, 600);
    },

    addLayoutAnimation() {
        const mainContainer = document.getElementById('mainContainer');
        const flexContainer = document.querySelector('.flex-container');
        
        if (mainContainer) {
            mainContainer.classList.add('resizing');
        }
        if (flexContainer) {
            flexContainer.classList.add('resizing');
        }
    },

    removeLayoutAnimation() {
        const mainContainer = document.getElementById('mainContainer');
        const flexContainer = document.querySelector('.flex-container');
        
        if (mainContainer) {
            mainContainer.classList.remove('resizing');
        }
        if (flexContainer) {
            flexContainer.classList.remove('resizing');
        }
    },

    adjustLayout() {
        // Trigger layout reflow for smooth transitions
        const mainContainer = document.getElementById('mainContainer');
        if (mainContainer) {
            mainContainer.style.display = 'none';
            mainContainer.offsetHeight; // Force reflow
            mainContainer.style.display = '';
        }
    },

    // Minimize all windows with staggered animation
    async minimizeAll() {
        const windowIds = Object.keys(this.windows);
        for (let i = 0; i < windowIds.length; i++) {
            const windowId = windowIds[i];
            const window = this.windows[windowId];
            
            if (!window.isMinimized) {
                // Add stagger class for sequential animation
                window.element.classList.add(`stagger-${i + 1}`);
                await this.minimizeWindow(windowId);
                
                // Remove stagger class after animation
                setTimeout(() => {
                    window.element.classList.remove(`stagger-${i + 1}`);
                }, 400 + (i * 100));
            }
        }
    },

    // Restore all windows with staggered animation
    async restoreAll() {
        const windowIds = Object.keys(this.windows).reverse(); // Reverse for nice effect
        for (let i = 0; i < windowIds.length; i++) {
            const windowId = windowIds[i];
            const window = this.windows[windowId];
            
            if (window.isMinimized) {
                // Add stagger class for sequential animation
                window.element.classList.add(`stagger-${i + 1}`);
                await this.restoreWindow(windowId);
                
                // Remove stagger class after animation
                setTimeout(() => {
                    window.element.classList.remove(`stagger-${i + 1}`);
                }, 600 + (i * 100));
            }
        }
    },

    // Add new window dynamically
    addWindow(windowId, tabId) {
        this.windows[windowId] = {
            element: document.getElementById(windowId),
            tabElement: document.getElementById(tabId),
            isMinimized: false,
            isAnimating: false
        };
        
        if (this.windows[windowId].tabElement) {
            this.windows[windowId].tabElement.classList.add('active');
        }
    }
};

// Global function for onclick handlers
function toggleWindow(windowId) {
    windowManager.toggleWindow(windowId);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    windowManager.init();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+M to minimize all
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            windowManager.minimizeAll();
        }
        // Ctrl+Shift+M to restore all
        if (e.ctrlKey && e.shiftKey && e.key === 'M') {
            e.preventDefault();
            windowManager.restoreAll();
        }
    });

    // Add window resize observer for smooth responsive behavior
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const windows = entry.target.querySelectorAll('.windowouter:not(.minimized)');
            windows.forEach((window, index) => {
                window.style.animationDelay = `${index * 50}ms`;
            });
        }
    });

    const mainContainer = document.getElementById('mainContainer');
    if (mainContainer) {
        resizeObserver.observe(mainContainer);
    }
});