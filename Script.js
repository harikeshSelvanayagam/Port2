document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('nav').offsetHeight; // Get nav height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Navbar Visibility on Scroll ---
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { // If scrolled down enough
            if (window.scrollY < lastScrollY) { // Scrolling up
                nav.classList.add('visible');
            } else { // Scrolling down
                nav.classList.remove('visible');
            }
        } else { // At the top
            nav.classList.remove('visible');
        }
        lastScrollY = window.scrollY;
    });

    // --- Section Animation on Scroll (Intersection Observer) ---
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove animate class when out of view
                // entry.target.classList.remove('animate');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Swiper Initialization for Projects Carousel ---
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000, // Advance every 4 seconds
            disableOnInteraction: false, // Continue autoplay even after user interaction
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // --- AI Avatar Following (More advanced, but still basic) ---
    const aiAvatar = document.getElementById('ai-avatar');
    if (aiAvatar) {
        let currentX = window.innerWidth / 2;
        let currentY = window.innerHeight / 2;
        const speed = 0.05; // Controls how quickly the avatar catches up

        function animateAvatar() {
            // Update avatar position towards the current target (mouse or scroll influence)
            aiAvatar.style.transform = `translate(${currentX}px, ${currentY}px)`;
            requestAnimationFrame(animateAvatar);
        }

        // Initial call to start animation loop
        animateAvatar();

        document.addEventListener('mousemove', (e) => {
            // Target position is mouse position + some offset
            const targetX = e.clientX + 30; // Offset to the right
            const targetY = e.clientY + 30; // Offset downwards

            // Smoothly move currentX and currentY towards targetX and targetY
            currentX += (targetX - currentX) * speed;
            currentY += (targetY - currentY) * speed;

            // Constrain avatar within viewport (optional, but good for edge cases)
            currentX = Math.max(0, Math.min(window.innerWidth - aiAvatar.offsetWidth, currentX));
            currentY = Math.max(0, Math.min(window.innerHeight - aiAvatar.offsetHeight, currentY));
        });

        // Add subtle vertical movement with scroll
        window.addEventListener('scroll', () => {
            // Adjust currentY based on scroll position, but more subtly
            // This makes it seem like it's keeping pace with the scroll but still influenced by mouse
            const scrollInfluence = window.scrollY * 0.05; // 5% of scroll distance
            currentY = Math.max(0, Math.min(window.innerHeight - aiAvatar.offsetHeight, currentY + scrollInfluence));
        });
    }

    // --- Button/Link Hover Effects (Add/Remove neon-hover class) ---
    document.querySelectorAll('.neon-button, .neon-link, nav a, .social-icon, .footer-icon').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('neon-hover-active'); // Use a specific class for JS-controlled hover
        });
        element.addEventListener('mouseleave', function() {
            this.classList.remove('neon-hover-active');
        });
    });

    // --- Typewriter Effect for H1 ---
    const h1Element = document.querySelector('.header-text h1.type-effect');
    if (h1Element) {
        const textToType = h1Element.getAttribute('data-text');
        h1Element.textContent = ''; // Clear text before typing
        let i = 0;
        const typingSpeed = 150; // Milliseconds per character

        function typeWriter() {
            if (i < textToType.length) {
                h1Element.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Remove blink-caret animation after typing is complete
                h1Element.style.borderRight = 'none';
                h1Element.style.animation = 'none'; // Stop previous animations
            }
        }
        // Start typing after a small delay
        setTimeout(typeWriter, 500);
    }
});

// A slightly more complex CSS glitch effect for text
// This JavaScript dynamically adds/removes/changes the 'glitch' class
// to trigger the CSS animations for elements that have 'glitch' class
function activateGlitch(element) {
    setInterval(() => {
        // Randomly apply/remove glitch class for a dynamic effect
        if (Math.random() > 0.7) { // 30% chance to glitch
            element.classList.add('glitch');
            const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random A-Z
            element.setAttribute('data-text', randomChar); // Change data-text for visual variation
        } else {
            element.classList.remove('glitch');
            element.setAttribute('data-text', element.textContent); // Reset to original text
        }
    }, 1000 + Math.random() * 2000); // Glitch every 1-3 seconds
}

// Apply glitch effect to header tagline
const taglineElement = document.querySelector('.header-text .vibe-coder');
if (taglineElement) {
    taglineElement.setAttribute('data-text', taglineElement.textContent); // Set initial data-text
    activateGlitch(taglineElement);
              }
              
