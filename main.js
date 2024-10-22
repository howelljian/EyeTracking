// Initialize currentSection
let currentSection = null;

// Function to start WebGazer
function startWebGazer() {
    webgazer.setRegression('ridge')
        .setGazeListener((data) => {
            if (data) {
                const x = data.x;
                const y = data.y;
                const focusedSection = getSectionByCoordinates(x, y);
                if (focusedSection) {
                    highlightSection(focusedSection);
                    updateFocusDuration(focusedSection);
                } else {
                    resetFocus();
                }
            }
        }).begin();
}

// Function to highlight the focused section
function highlightSection(sectionId) {
    // Check if the section has changed
    if (currentSection !== sectionId) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('highlight');
        });
        const focusedSection = document.getElementById(sectionId);
        focusedSection.classList.add('highlight');
        currentSection = sectionId; // Update the current section
        lastFocusTime = new Date().getTime(); // Update last focus time
    }
}

// Function to update the focus duration for a section
function updateFocusDuration(sectionId) {
    const now = new Date();
    const focusDuration = (now.getTime() - lastFocusTime) / 1000; // Duration in seconds

    if (!focusDurations[sectionId]) {
        focusDurations[sectionId] = [];
        longestFocusDurations[sectionId] = 0;
    }

    // Only log the duration if greater than zero
    if (focusDuration > 0) {
        focusDurations[sectionId].push(focusDuration);
        totalFocusDuration += focusDuration;
        totalFocusCount++;

        // Update longest duration if necessary
        if (focusDuration > longestFocusDurations[sectionId]) {
            longestFocusDurations[sectionId] = focusDuration;
        }
        
        updateStatisticsDisplay(); // Update stats whenever duration is updated
    }
}

// Reset focus
function resetFocus() {
    currentSection = null; // Clear the current section
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('highlight');
    });
}

// Other functions remain unchanged...
