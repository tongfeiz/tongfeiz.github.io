// First add these styles to your CSS
const styles = `
.parallax-wrapper {
    overflow-x: hidden;
    position: relative;
    width: 100%;
}

.parallax-element {
    transform: translateY(0);
    transition: transform 0.1s linear;
    will-change: transform;
}`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', () => {
    // Add wrapper class to body or main container
    document.body.classList.add('parallax-wrapper');
    
    // Add parallax class to elements
    const elements = [
        '.packback',
        '.packfront',
        '.stairs',
        '.album1',
        '.album2',
        '.album3',
        '.album4'
    ].forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.classList.add('parallax-element');
    });

    // Parallax speeds for each element
    const parallaxSpeeds = {
        '.packback': -0.3,
        '.packfront': -0.5,
        '.stairs': -0.2,
        '.album1': -0.4,
        '.album2': -0.5,
        '.album3': -0.6,
        '.album4': -0.7
    };

    let lastScrollTop = 0;
    let ticking = false;

    // Update element positions
    const updatePosition = () => {
        const scrollTop = window.pageYOffset;
        
        Object.entries(parallaxSpeeds).forEach(([selector, speed]) => {
            const element = document.querySelector(selector);
            if (element) {
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                const viewportHeight = window.innerHeight;
                
                // Check if element is in viewport
                if (scrollTop + viewportHeight > elementTop && 
                    scrollTop < elementTop + elementHeight) {
                    const yPos = (scrollTop * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                }
            }
        });

        lastScrollTop = scrollTop;
        ticking = false;
    };

    // Scroll event handler with requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updatePosition();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial position update
    updatePosition();
});