
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}


function renderStats() {
    const statsGrid = document.getElementById('statsGrid');
    

    const iotStats = {
        "studentsCollaborated": 45,
        "sensorsDeployed": 180,
        "dataPointsCollected": 25000,
        "hoursSpent": 3200
    };

    if (!statsGrid || !iotStats) return;


    const stats = [
        { number: iotStats.studentsCollaborated, label: 'Students Collaborated', unit: '' },
        { number: iotStats.sensorsDeployed, label: 'Sensors Deployed', unit: '+' },
        { number: iotStats.dataPointsCollected, label: 'Data Points Collected', unit: '+' },
        { number: iotStats.hoursSpent, label: 'Hours Spent', unit: '+' }
    ];

    statsGrid.innerHTML = stats.map((stat, index) => `
        <div class="stat-card stat-card-${index + 1}">
            <span class="stat-number" data-target="${stat.number}" data-unit="${stat.unit}">0</span>
            <span class="stat-label">${stat.label}</span>
        </div>
    `).join('');
}


function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statCards = document.querySelectorAll('.stat-card');
    
  
    if (statCards.length === 0) {
        console.warn("AnimateStats: No stat cards found. Rendering may have failed.");
        return;
    }
    

    gsap.set(statCards, { opacity: 1, visibility: "visible" });


    gsap.from(statCards, 
        {
            y: 50,
            opacity: 0,
            scale: 0.8,
            duration: 1.2,
            stagger: 0.15, 
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
                trigger: ".stats-section",
                start: "top 80%", 
                toggleActions: "play none none reverse"
            }
        }
    );

    //count-up for the numbers
    statNumbers.forEach(numberEl => {
        const targetValue = parseInt(numberEl.getAttribute('data-target'));
        const unit = numberEl.getAttribute('data-unit') || '';
        
        // unique ID to prevent double-triggering
        const triggerID = 'countUp-' + targetValue + '-' + Math.random().toString(36).substring(7);
        
        const counter = { value: 0 };

        gsap.to(counter, {
            value: targetValue,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                id: triggerID,
                trigger: numberEl,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            onUpdate: () => {
                numberEl.textContent = Math.ceil(counter.value).toLocaleString('en-US') + unit;
            },
            onComplete: () => {
                numberEl.textContent = targetValue.toLocaleString('en-US') + unit;
            }
        });
    });
}