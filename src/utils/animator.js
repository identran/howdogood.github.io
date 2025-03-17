/*
filename: animator.js
date: March 16, 2025
programmer: James Tran
title: Animation Utility
purpose: Provides utility functions for animations and transitions
*/

/* ┌──────────────────────────────────────┐
    ANIMATION FUNCTIONS
└──────────────────────────────────────┘ */

/**
 * Creates a loading animation with dots
 * @param {HTMLElement} parentElement - The element to append the loading animation to
 * @param {Number} dotCount - Number of dots to display (default: 3)
 * @returns {HTMLElement} - The created loading element
 */
export const createLoadingAnimation = (parentElement, dotCount = 3) => {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-dots';
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        loadingElement.appendChild(dot);
    }
    
    parentElement.appendChild(loadingElement);
    return loadingElement;
};

/**
 * Removes a loading animation from the DOM
 * @param {HTMLElement} loadingElement - The loading element to remove
 */
export const removeLoadingAnimation = (loadingElement) => {
    if (loadingElement && loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
    }
};

/**
 * Fades in an element
 * @param {HTMLElement} element - The element to fade in
 * @param {Number} duration - Duration of the animation in milliseconds (default: 800)
 * @returns {Promise} - Resolves when the animation is complete
 */
export const fadeIn = (element, duration = 800) => {
    return new Promise((resolve) => {
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.style.opacity = '0';
        
        // Force a reflow to ensure the initial state is applied
        void element.offsetWidth;
        
        element.style.opacity = '1';
        
        setTimeout(() => {
            resolve();
        }, duration);
    });
};

/**
 * Fades out an element
 * @param {HTMLElement} element - The element to fade out
 * @param {Number} duration - Duration of the animation in milliseconds (default: 800)
 * @returns {Promise} - Resolves when the animation is complete
 */
export const fadeOut = (element, duration = 800) => {
    return new Promise((resolve) => {
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.style.opacity = '1';
        
        // Force a reflow to ensure the initial state is applied
        void element.offsetWidth;
        
        element.style.opacity = '0';
        
        setTimeout(() => {
            resolve();
        }, duration);
    });
};

/**
 * Typewriter effect that types out text character by character
 * @param {HTMLElement} element - The element to type text into
 * @param {String} text - The text to type
 * @param {Number} speed - Delay between characters in milliseconds (default: 50)
 * @returns {Promise} - Resolves when typing is complete
 */
export const typeText = (element, text, speed = 50) => {
    return new Promise((resolve) => {
        let i = 0;
        element.textContent = '';
        
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                resolve();
            }
        }, speed);
    });
};
