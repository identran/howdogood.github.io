/*
filename: Home.js
date: March 16, 2025
programmer: James Tran
title: Home Page
purpose: Manages the home page of the How Do Good application
*/

import { createKindnessGenerator } from '../components/KindnessGenerator.js';

/* ┌──────────────────────────────────────┐
    HOME PAGE
└──────────────────────────────────────┘ */

/**
 * Initializes the home page
 * @param {HTMLElement} rootElement - The root element to append to
 */
export function initializeHomePage(rootElement) {
    // Create the main container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Create the kindness generator
    createKindnessGenerator(container);
    
    // Append to root element
    rootElement.appendChild(container);
}

export default { initializeHomePage };
