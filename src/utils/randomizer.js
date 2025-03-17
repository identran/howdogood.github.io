/*
filename: randomizer.js
date: March 16, 2025
programmer: James Tran
title: Randomizer Utility
purpose: Provides utility functions for randomizing content
*/

/* ┌──────────────────────────────────────┐
    RANDOMIZATION FUNCTIONS
└──────────────────────────────────────┘ */

/**
 * Gets a random element from an array
 * @param {Array} array - The array to get a random element from
 * @returns {*} - A random element from the array
 */
export const getRandomElement = (array) => {
    if (!array || array.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

/**
 * Gets a random element from an array, excluding previously selected elements
 * @param {Array} array - The array to get a random element from
 * @param {Array} previousSelections - Array of previously selected elements to exclude
 * @param {Number} maxPreviousToCheck - Maximum number of previous selections to check against (default: 5)
 * @returns {*} - A random element from the array
 */
export const getUniqueRandomElement = (array, previousSelections = [], maxPreviousToCheck = 5) => {
    if (!array || array.length === 0) {
        return null;
    }
    
    // If previous selections is larger than our check limit, only use the most recent selections
    const recentSelections = previousSelections.slice(-maxPreviousToCheck);
    
    // Filter out any elements that are in our recent selections
    const availableElements = array.filter(item => !recentSelections.some(prev => prev.id === item.id));
    
    // If we've exhausted unique elements, just get a random element from the original array
    if (availableElements.length === 0) {
        return getRandomElement(array);
    }
    
    return getRandomElement(availableElements);
};

/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};
