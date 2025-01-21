// Initialize any global variables
window.mouseX = 0;
window.mouseY = 0;

// Add any additional initialization code here
document.addEventListener('DOMContentLoaded', () => {
    // Update time
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
        
        // Update immediately and then every second
        updateTime();
        setInterval(updateTime, 1000);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        // Add any specific resize handling here
        // Note: 3D model resize is handled in model3d.js
    });

    // Handle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Add any specific scroll handling here
                // Note: 3D model scroll handling is in model3d.js
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize any other features
    document.addEventListener('keydown', (event) => {
        // Add any keyboard controls here if needed
        // For example:
        // if (event.key === 'Escape') {
        //     // Handle escape key
        // }
    });
});

// Export any functions that need to be accessed by other modules
window.mainModule = {
    // Add any functions that need to be accessed by other js files
    handleResize: () => {
        // Add resize handling logic
    },
    handleScroll: () => {
        // Add scroll handling logic
    }
};




// ---------------------------- CLICK ALBUM COVERS --------------------------------------------------
function openalbum1() {
    const url = "https://open.spotify.com/track/6GiaZkiBrXNIfOCzCb2ION?si=6d263733152f4fa4"; // Replace with your desired URL
    window.open(url, "_blank"); // Opens the URL in a new tab
}
function openalbum2() {
    const url = "https://open.spotify.com/track/0ExIWTffDUVQkBThvZ6L7T?si=b238dd7b97da41c6"; 
    window.open(url, "_blank"); // Opens the URL in a new tab
}
function openalbum3() {
    const url = "https://open.spotify.com/track/1DI9xDTHOcltHdy5K6m1vR?si=059d54aa5f4f47b4";
    window.open(url, "_blank"); // Opens the URL in a new tab
}
function openalbum4() {
    const url = "https://open.spotify.com/album/4VJWm9anX7wnh7JR0vQUfx?si=CygbkdF8RXewimufY2-2kA"
    window.open(url, "_blank"); // Opens the URL in a new tab
}
function openalbum5() {
    const url = "https://open.spotify.com/track/2TQ8gQc0RyCMBoWJcbzV0l?si=df11222e1ed64fce"
    window.open(url, "_blank"); // Opens the URL in a new tab
}

function openalbum6() {
    const url = "https://open.spotify.com/track/6xXL3jjqiODm3gBEVbMU9n?si=fc23d72d5c91403d"
    window.open(url, "_blank"); // Opens the URL in a new tab
}

function openalbum7() {
    const url = "https://open.spotify.com/track/6x6kpmcGN7XtAW7tpd1wTz?si=5e3d5ce39ed8493c"
    window.open(url, "_blank"); // Opens the URL in a new tab
}

function openalbum8() {
    const url = "https://open.spotify.com/track/1dgnotuTuf6f01DKvN4F6B?si=1a896ef7f3ac42a1"
    window.open(url, "_blank"); // Opens the URL in a new tab
}

// ARTIST PROFILE OPEN 
function openspotify() {
    const url = "https://open.spotify.com/artist/4PIfXMZruV443MzPI1YUY4?si=Z6jW2MxMSeKT5MWN7wsNIw";
    window.open(url, "_blank"); // Opens the URL in a new tab
  }

