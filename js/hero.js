// Create floating particles
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particlesContainer.appendChild(particle);

        gsap.to(particle, {
            y: -100 + Math.random() * 200,
            x: -50 + Math.random() * 100,
            opacity: Math.random() * 0.5,
            duration: 3 + Math.random() * 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// Initialize hero animations
function initHeroAnimations() {
    // Hero animations
    gsap.from('.hero-label', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-title span', {
        duration: 2,
        y: 80,
        opacity: 0,
        stagger: 0.7,
        delay: 0.5,
        ease: 'power4.out'
    });

    gsap.from('.hero-subtitle', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        delay: 1.5,
        ease: 'power3.out'
    });

    gsap.from('.hero-meta span', {
        duration: 1,
        y: 20,
        opacity: 0,
        stagger: 0.5,
        delay: 2,
        ease: 'power3.out'
    });


    // Corner UI fade in
    gsap.from('.corner-ui', {
        duration: 1,
        opacity: 0,
        delay: 1.5,
        stagger: 0.1,
        ease: 'power2.out'
    });
}