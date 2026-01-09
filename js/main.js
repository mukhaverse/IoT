// Global data store
let appData = {};
let galleryData = {};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadData();
});

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data.json');
        appData = await response.json();
        
        // Load gallery data separately
        const galleryResponse = await fetch('gallery.json');
        galleryData = await galleryResponse.json();
        
        console.log('Gallery data loaded:', galleryData);
        
        // Initialize everything in correct order
        initParticles();
        initHeroAnimations();
        
        // ----------------------------------------------------
        // FIX: RENDER STATS AND THEN INITIATE THE ANIMATION IMMEDIATELY
        renderStats();
        animateStats(); // <-- MOVED HERE TO RUN RIGHT AFTER ELEMENTS ARE CREATED
        // ----------------------------------------------------
        
        renderProjects();
        renderInsights();
        // renderTestimonials(); 
        
        // Update counts in hero section
        // IoT projects don't have a "team" field, so we count unique project leads instead
        // Or simply use the total number of projects as a fallback
        const uniqueLeads = appData.projects 
            ? new Set(appData.projects.map(p => p.scrumMaster || p.projectLead)).size 
            : 0;
        
        const teamCount = uniqueLeads > 0 ? uniqueLeads : Math.ceil(appData.projects.length / 2);
        
        // document.getElementById('teamsCount').textContent = `${teamCount} TEAMS`;
        // document.getElementById('projectsCount').textContent = `${appData.projects.length} PROJECTS`;
        
        // Initialize interactive components after rendering
        setTimeout(() => {
            initCarousel();
            
            initProjectExpansion();
            // initScrollAnimations will run all other section animations
            initScrollAnimations();
            
            // Render and initialize gallery
            console.log('About to render gallery');
            renderGallery();
            initGalleryScroll();
        }, 100);
        
    } catch (error) {
        console.error('Error loading data:', error);
    }
}