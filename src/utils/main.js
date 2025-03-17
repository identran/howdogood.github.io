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
    isLoading: false
};

/* ┌──────────────────────────────────────┐
    DOM ELEMENTS & INITIALIZATION
└──────────────────────────────────────┘ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
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
    
    // Create kindness act container (initially empty)
    const kindnessActContainer = document.createElement('div');
    kindnessActContainer.className = 'kindness-act';
    kindnessActContainer.id = 'kindness-act';
    mainContainer.appendChild(kindnessActContainer);
    
    // Start the kindness act generation process
    generateKindnessAct();
}

/**
 * Create the navigation bar
 * @param {HTMLElement} parent - The parent element to append navigation to
 */
function createNavigation(parent) {
    const nav = document.createElement('nav');
    
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = 'How Do Good?';
    
    const navList = document.createElement('ul');
    
    const homeItem = document.createElement('li');
    const homeLink = document.createElement('a');
    homeLink.href = './';
    homeLink.textContent = 'Home';
    homeItem.appendChild(homeLink);
    
    const classifiedsItem = document.createElement('li');
    const classifiedsLink = document.createElement('a');
    classifiedsLink.href = './classifieds.html';
    classifiedsLink.textContent = 'Classifieds';
    classifiedsItem.appendChild(classifiedsLink);
    
    navList.appendChild(homeItem);
    navList.appendChild(classifiedsItem);
    
    nav.appendChild(logo);
    nav.appendChild(navList);
    
    parent.appendChild(nav);
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
        
        // Update previous selections
        state.previousSelections.push(randomKindnessAct);
        
        // Remove loading animation
        removeLoadingAnimation(loadingElement);
        
        // Display the kindness act
        kindnessActElement.textContent = randomKindnessAct.act;
        
        // Fade in the kindness act
        fadeIn(kindnessActElement);
        
        // Reset loading state
        state.isLoading = false;
    }, 7000);
}

/* ┌──────────────────────────────────────┐
    EVENT LISTENERS & EXPORTS
└──────────────────────────────────────┘ */

// Export any functions that might be needed by other modules
export { generateKindnessAct };
