/*
filename: Classifieds.js
date: March 16, 2025
programmer: James Tran
title: Classifieds Page
purpose: Manages the classifieds page of the How Do Good application
*/

/* ┌──────────────────────────────────────┐
    CLASSIFIEDS PAGE INITIALIZATION
└──────────────────────────────────────┘ */

// Sample classifieds data
// In a production environment, this would be fetched from an API or database
const classifiedsData = [
    {
        id: 1,
        title: "Eco-Friendly Cleaning Service",
        description: "Professional home cleaning using only natural, environmentally safe products.",
        contact: "greenclean@example.com",
        category: "Services",
        tags: ["eco-friendly", "cleaning", "sustainable"]
    },
    {
        id: 2,
        title: "Handmade Wooden Toys",
        description: "Locally crafted wooden toys made from sustainable sources. Perfect for children of all ages.",
        contact: "woodentoys@example.com",
        category: "Products",
        tags: ["handmade", "wooden", "toys", "children"]
    },
    {
        id: 3,
        title: "Community Garden Volunteers Needed",
        description: "Join our weekly gardening sessions to help maintain the community garden. All experience levels welcome!",
        contact: "garden@community.org",
        category: "Volunteer",
        tags: ["community", "garden", "volunteer", "outdoors"]
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeClassifiedsPage();
});

/**
 * Initialize the classifieds page
 */
function initializeClassifiedsPage() {
    const appContainer = document.getElementById('app');
    
    // Create navigation
    createNavigation(appContainer);
    
    // Create main content container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'container';
    appContainer.appendChild(mainContainer);
    
    // Create page title
    const title = document.createElement('h1');
    title.textContent = 'Curated Classifieds';
    mainContainer.appendChild(title);
    
    // Create classifieds description
    const description = document.createElement('p');
    description.textContent = 'Below you\'ll find a curated list of advertisements that align with our ethical values.';
    description.className = 'page-description';
    mainContainer.appendChild(description);
    
    // Create classifieds container
    const classifiedsContainer = document.createElement('div');
    classifiedsContainer.className = 'classifieds-container';
    mainContainer.appendChild(classifiedsContainer);
    
    // Populate classifieds
    populateClassifieds(classifiedsContainer);
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

/**
 * Populate classifieds with data
 * @param {HTMLElement} container - The container to append classifieds to
 */
function populateClassifieds(container) {
    classifiedsData.forEach(item => {
        const classifiedCard = createClassifiedCard(item);
        container.appendChild(classifiedCard);
    });
}

/**
 * Create a classified ad card
 * @param {Object} data - The classified ad data
 * @returns {HTMLElement} - The created card element
 */
function createClassifiedCard(data) {
    const card = document.createElement('div');
    card.className = 'classified-card';
    
    const title = document.createElement('h3');
    title.textContent = data.title;
    card.appendChild(title);
    
    const category = document.createElement('div');
    category.className = 'category';
    category.textContent = data.category;
    card.appendChild(category);
    
    const description = document.createElement('p');
    description.textContent = data.description;
    card.appendChild(description);
    
    const contact = document.createElement('div');
    contact.className = 'contact';
    contact.textContent = `Contact: ${data.contact}`;
    card.appendChild(contact);
    
    const tags = document.createElement('div');
    tags.className = 'tags';
    data.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tag;
        tags.appendChild(tagSpan);
    });
    card.appendChild(tags);
    
    return card;
}

/* ┌──────────────────────────────────────┐
    EXPORTS (if needed)
└──────────────────────────────────────┘ */

export { initializeClassifiedsPage };
