/*
filename: KindnessGenerator.js
date: March 16, 2025
programmer: James Tran
title: Kindness Generator Component
purpose: Component for generating and displaying kindness acts
*/

import { generateKindnessAct } from '../utils/main.js';

/* ┌──────────────────────────────────────┐
    KINDNESS GENERATOR COMPONENT
└──────────────────────────────────────┘ */

/**
 * Creates a kindness generator component
 * @param {HTMLElement} parent - The parent element to append the component to
 * @returns {HTMLElement} - The created component
 */
export function createKindnessGenerator(parent) {
    const container = document.createElement('div');
    container.className = 'kindness-generator';
    
    const titleElement = document.createElement('h1');
    titleElement.textContent = 'How Do Good?';
    container.appendChild(titleElement);
    
    const kindnessActElement = document.createElement('div');
    kindnessActElement.className = 'kindness-act';
    kindnessActElement.id = 'kindness-act';
    container.appendChild(kindnessActElement);
    
    const refreshButton = document.createElement('button');
    refreshButton.className = 'refresh-button';
    refreshButton.textContent = 'Another Act of Kindness';
    refreshButton.addEventListener('click', generateKindnessAct);
    
    // Add the refresh button after a delay to not distract from the initial experience
    setTimeout(() => {
        container.appendChild(refreshButton);
    }, 10000); // 10 seconds after the page loads
    
    parent.appendChild(container);
    return container;
}

/**
 * Attaches the kindness generator to an existing element
 * @param {String} elementId - The ID of the element to attach to
 */
export function attachKindnessGenerator(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        createKindnessGenerator(element);
    }
}

export default { createKindnessGenerator, attachKindnessGenerator };
