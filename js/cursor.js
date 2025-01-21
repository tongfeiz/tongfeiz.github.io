// Cache DOM elements
const cursor = document.querySelector('.custom-cursor');
const coordsDiv = document.querySelector('.coordinates');

// Set initial styles for performance optimization
if (cursor && coordsDiv) {
    cursor.style.position = 'fixed';
    cursor.style.willChange = 'transform';
    cursor.style.backfaceVisibility = 'hidden';
    cursor.style.pointerEvents = 'none';
    
    coordsDiv.style.position = 'fixed';
    coordsDiv.style.willChange = 'transform';
    coordsDiv.style.pointerEvents = 'none';
}

// Initialize mousemove tracking
let rafId = null;
document.addEventListener('mousemove', (event) => {
    if (rafId) {
        cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
        if (!cursor || !coordsDiv) return;
    
        // Calculate coordinates relative to center of page
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const relativeX = event.clientX - centerX;
        const relativeY = event.clientY - centerY;
    
        // Export these values for model3d.js
        window.mouseX = relativeX / centerX;
        window.mouseY = relativeY / centerY;
    
        // Position cursor exactly at mouse position
        cursor.style.left = '0';
        cursor.style.top = '0';
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
        
        // Position coordinates div offset from cursor
        coordsDiv.style.transform = `translate3d(${event.clientX + 40}px, ${event.clientY + 15}px, 0)`;
        coordsDiv.innerHTML = `X: ${relativeX.toFixed(2)} px<br>Y: ${relativeY.toFixed(2)} px`;
    });
});

// Handle cursor visibility
document.addEventListener('mouseleave', () => {
    if (cursor && coordsDiv) {
        cursor.style.opacity = '0';
        coordsDiv.style.opacity = '0';
    }
});

document.addEventListener('mouseenter', () => {
    if (cursor && coordsDiv) {
        cursor.style.opacity = '1';
        coordsDiv.style.opacity = '1';
    }
});

// Initialize global variables
window.mouseX = 0;
window.mouseY = 0;

// Add DOMContentLoaded event listener for initialization
document.addEventListener('DOMContentLoaded', () => {
    // Update time if time element exists
    const timeElement = document.querySelector('.time');
    if (timeElement) {
        const updateTime = () => {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        
        resizeTimeout = setTimeout(() => {
            // Handle resize operations here
            if (window.mainModule && window.mainModule.handleResize) {
                window.mainModule.handleResize();
            }
        }, 100);
    });

    // Handle scroll events with requestAnimationFrame
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(() => {
            if (window.mainModule && window.mainModule.handleScroll) {
                window.mainModule.handleScroll();
            }
        });
    }, { passive: true });
});

// Album cover click handlers
const createAlbumOpener = (url) => () => window.open(url, "_blank");

window.openalbum1 = createAlbumOpener("https://open.spotify.com/track/6GiaZkiBrXNIfOCzCb2ION?si=6d263733152f4fa4");
window.openalbum2 = createAlbumOpener("https://open.spotify.com/track/0ExIWTffDUVQkBThvZ6L7T?si=b238dd7b97da41c6");
window.openalbum3 = createAlbumOpener("https://open.spotify.com/track/1DI9xDTHOcltHdy5K6m1vR?si=059d54aa5f4f47b4");
window.openalbum4 = createAlbumOpener("https://open.spotify.com/album/4VJWm9anX7wnh7JR0vQUfx?si=CygbkdF8RXewimufY2-2kA");
window.openalbum5 = createAlbumOpener("https://open.spotify.com/track/2TQ8gQc0RyCMBoWJcbzV0l?si=df11222e1ed64fce");
window.openalbum6 = createAlbumOpener("https://open.spotify.com/track/6xXL3jjqiODm3gBEVbMU9n?si=fc23d72d5c91403d");
window.openalbum7 = createAlbumOpener("https://open.spotify.com/track/6x6kpmcGN7XtAW7tpd1wTz?si=5e3d5ce39ed8493c");
window.openalbum8 = createAlbumOpener("https://open.spotify.com/track/1dgnotuTuf6f01DKvN4F6B?si=1a896ef7f3ac42a1");

// Spotify artist profile opener
window.openspotify = createAlbumOpener("https://open.spotify.com/artist/4PIfXMZruV443MzPI1YUY4?si=Z6jW2MxMSeKT5MWN7wsNIw");