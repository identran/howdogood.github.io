/*
filename: main.js
date: March 16, 2025
programmer: James Tran
title: Main Application Logic
purpose: Controls the main functionality of the How Do Good web application
*/

import kindnessActs from '../data/kindnessActs.js';
import { getUniqueRandomElement } from './randomizer.js';
import { createLoadingAnimation, removeLoadingAnimation, fadeIn } from './animator.js';

/* ┌──────────────────────────────────────┐
    STATE MANAGEMENT
└──────────────────────────────────────┘ */

// Store previous selections to avoid immediate repetition
const state = {
    previousSelections: [],
    isLoading: false,
    currentAct: null,
    statistics: {
        actsViewed: 0,
        lastVisit: null
    }
};

// Load statistics from localStorage on startup
const loadStatistics = () => {
    try {
        const savedStats = localStorage.getItem('howDoGoodStats');
        if (savedStats) {
            const parsed = JSON.parse(savedStats);
            state.statistics = { ...state.statistics, ...parsed };
        }
    } catch (error) {
        console.warn('Could not load statistics from localStorage:', error);
    }
};

// Save statistics to localStorage
const saveStatistics = () => {
    try {
        localStorage.setItem('howDoGoodStats', JSON.stringify(state.statistics));
    } catch (error) {
        console.warn('Could not save statistics to localStorage:', error);
    }
};

/* ┌──────────────────────────────────────┐
    DOM ELEMENTS & INITIALIZATION
└──────────────────────────────────────┘ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadStatistics();
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    const appContainer = document.getElementById('app');

    // Create navigation
    createNavigation(appContainer);

    // Create main content container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'container';
    appContainer.appendChild(mainContainer);

    // Create title
    const title = document.createElement('h1');
    title.textContent = 'How Do Good?';
    mainContainer.appendChild(title);

    // Create statistics display
    const statsContainer = document.createElement('div');
    statsContainer.className = 'statistics';
    statsContainer.id = 'statistics';
    mainContainer.appendChild(statsContainer);
    updateStatisticsDisplay();

    // Create kindness act container (initially empty)
    const kindnessActContainer = document.createElement('div');
    kindnessActContainer.className = 'kindness-act';
    kindnessActContainer.id = 'kindness-act';
    kindnessActContainer.setAttribute('role', 'status');
    kindnessActContainer.setAttribute('aria-live', 'polite');
    kindnessActContainer.setAttribute('aria-atomic', 'true');
    mainContainer.appendChild(kindnessActContainer);

    // Create action buttons container (initially hidden)
    const actionButtonsContainer = document.createElement('div');
    actionButtonsContainer.className = 'action-buttons';
    actionButtonsContainer.id = 'action-buttons';
    actionButtonsContainer.style.opacity = '0';
    actionButtonsContainer.style.display = 'none';
    mainContainer.appendChild(actionButtonsContainer);

    // Start the kindness act generation process
    generateKindnessAct();

    // Add footer with Buy Me a Coffee link
    createFooter(appContainer);
}

/**
 * Create the navigation bar
 * @param {HTMLElement} parent - The parent element to append navigation to
 */
function createNavigation(parent) {
    const nav = document.createElement('nav');
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');

    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = 'How Do Good?';

    const navList = document.createElement('ul');
    navList.setAttribute('role', 'menubar');

    const homeItem = document.createElement('li');
    homeItem.setAttribute('role', 'none');
    const homeLink = document.createElement('a');
    homeLink.href = './';
    homeLink.textContent = 'Home';
    homeLink.setAttribute('role', 'menuitem');
    homeLink.setAttribute('aria-label', 'Go to home page');
    homeItem.appendChild(homeLink);

    const classifiedsItem = document.createElement('li');
    classifiedsItem.setAttribute('role', 'none');
    const classifiedsLink = document.createElement('a');
    classifiedsLink.href = './classifieds.html';
    classifiedsLink.textContent = 'Classifieds';
    classifiedsLink.setAttribute('role', 'menuitem');
    classifiedsLink.setAttribute('aria-label', 'Go to classifieds page');
    classifiedsItem.appendChild(classifiedsLink);

    navList.appendChild(homeItem);
    navList.appendChild(classifiedsItem);

    nav.appendChild(logo);
    nav.appendChild(navList);

    parent.appendChild(nav);
}

/**
 * Create the footer with Buy Me a Coffee link
 * @param {HTMLElement} parent - The parent element to append footer to
 */
function createFooter(parent) {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    
    const container = document.createElement('div');
    container.className = 'container';
    
    const coffeeLink = document.createElement('a');
    coffeeLink.href = 'https://buymeacoffee.com/yotm';
    coffeeLink.target = '_blank';
    coffeeLink.rel = 'noopener noreferrer';
    coffeeLink.className = 'coffee-link';
    
    const coffeeIcon = document.createElement('span');
    coffeeIcon.className = 'coffee-icon';
    coffeeIcon.textContent = '☕';
    
    coffeeLink.appendChild(coffeeIcon);
    coffeeLink.appendChild(document.createTextNode(' Support this project'));
    
    container.appendChild(coffeeLink);
    footer.appendChild(container);
    
    parent.appendChild(footer);
}

/* ┌──────────────────────────────────────┐
    STATISTICS MANAGEMENT
└──────────────────────────────────────┘ */

/**
 * Update the statistics display
 */
function updateStatisticsDisplay() {
    const statsElement = document.getElementById('statistics');
    if (!statsElement) return;

    const actsViewed = state.statistics.actsViewed;
    if (actsViewed > 0) {
        statsElement.textContent = `Acts of kindness viewed: ${actsViewed}`;
        statsElement.style.opacity = '1';
    } else {
        statsElement.textContent = '';
        statsElement.style.opacity = '0';
    }
}

/* ┌──────────────────────────────────────┐
    ACTION BUTTONS
└──────────────────────────────────────┘ */

/**
 * Create action buttons (Share and Get Another)
 */
function createActionButtons() {
    const actionButtonsContainer = document.getElementById('action-buttons');
    if (!actionButtonsContainer) return;

    // Clear existing buttons
    actionButtonsContainer.innerHTML = '';

    // Create Share button
    const shareButton = document.createElement('button');
    shareButton.className = 'action-button share-button';
    shareButton.textContent = '📤 Share This Act';
    shareButton.setAttribute('aria-label', 'Share this act of kindness');
    shareButton.addEventListener('click', shareCurrentAct);

    // Create Get Another button
    const refreshButton = document.createElement('button');
    refreshButton.className = 'action-button refresh-button';
    refreshButton.textContent = '🔄 Get Another Act';
    refreshButton.setAttribute('aria-label', 'Get another random act of kindness');
    refreshButton.addEventListener('click', () => {
        hideActionButtons();
        generateKindnessAct();
    });

    actionButtonsContainer.appendChild(shareButton);
    actionButtonsContainer.appendChild(refreshButton);
}

/**
 * Show action buttons with fade-in animation
 */
function showActionButtons() {
    const actionButtonsContainer = document.getElementById('action-buttons');
    if (!actionButtonsContainer) return;

    actionButtonsContainer.style.display = 'flex';

    // Small delay before fading in
    setTimeout(() => {
        actionButtonsContainer.style.opacity = '1';
    }, 100);
}

/**
 * Hide action buttons
 */
function hideActionButtons() {
    const actionButtonsContainer = document.getElementById('action-buttons');
    if (!actionButtonsContainer) return;

    actionButtonsContainer.style.opacity = '0';
    setTimeout(() => {
        actionButtonsContainer.style.display = 'none';
    }, 400);
}

/**
 * Share the current act of kindness
 */
async function shareCurrentAct() {
    if (!state.currentAct) return;

    const shareData = {
        title: 'How Do Good?',
        text: `${state.currentAct.act}\n\nFind more acts of kindness at:`,
        url: window.location.href
    };

    try {
        // Try using the Web Share API if available
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard
            const textToCopy = `${shareData.text} ${shareData.url}`;
            await navigator.clipboard.writeText(textToCopy);

            // Show feedback
            const shareButton = document.querySelector('.share-button');
            if (shareButton) {
                const originalText = shareButton.textContent;
                shareButton.textContent = '✓ Copied to clipboard!';
                shareButton.disabled = true;

                setTimeout(() => {
                    shareButton.textContent = originalText;
                    shareButton.disabled = false;
                }, 2000);
            }
        }
    } catch (error) {
        console.warn('Could not share:', error);
    }
}

/* ┌──────────────────────────────────────┐
    KINDNESS ACT GENERATION
└──────────────────────────────────────┘ */

/**
 * Generates and displays a random kindness act
 */
function generateKindnessAct() {
    if (state.isLoading) return;

    state.isLoading = true;
    const kindnessActElement = document.getElementById('kindness-act');

    // Clear any existing content
    kindnessActElement.textContent = '';
    kindnessActElement.style.opacity = '0';

    // Create and show loading animation
    const loadingElement = createLoadingAnimation(kindnessActElement.parentNode);

    // Simulate "thinking" with a 7-second delay as specified in requirements
    setTimeout(() => {
        // Get a random kindness act
        const randomKindnessAct = getUniqueRandomElement(kindnessActs, state.previousSelections);

        // Update state
        state.previousSelections.push(randomKindnessAct);
        state.currentAct = randomKindnessAct;

        // Update statistics
        state.statistics.actsViewed += 1;
        state.statistics.lastVisit = new Date().toISOString();
        saveStatistics();
        updateStatisticsDisplay();

        // Remove loading animation
        removeLoadingAnimation(loadingElement);

        // Display the kindness act
        kindnessActElement.textContent = randomKindnessAct.act;

        // Fade in the kindness act
        fadeIn(kindnessActElement);

        // Create and show action buttons
        createActionButtons();
        setTimeout(() => {
            showActionButtons();
        }, 1000);

        // Reset loading state
        state.isLoading = false;
    }, 7000);
}

/* ┌──────────────────────────────────────┐
    EVENT LISTENERS & EXPORTS
└──────────────────────────────────────┘ */

// Export any functions that might be needed by other modules
export { generateKindnessAct };
