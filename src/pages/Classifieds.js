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
    // SERVICES
    {
        id: 1,
        title: "Eco-Friendly Cleaning Service",
        description: "Professional home cleaning using only natural, environmentally safe products. Certified green cleaning specialists.",
        contact: "greenclean@example.com",
        category: "Services",
        tags: ["eco-friendly", "cleaning", "sustainable"]
    },
    {
        id: 2,
        title: "Free Tax Help for Seniors",
        description: "Volunteer tax assistance program for seniors and low-income families. AARP certified volunteers ready to help.",
        contact: "taxhelp@community.org",
        category: "Services",
        tags: ["free", "tax-help", "seniors", "volunteer"]
    },
    {
        id: 3,
        title: "Mobile Pet Grooming - Rescue Discount",
        description: "Professional pet grooming that comes to you. 20% discount for rescued pets. We use cruelty-free products only.",
        contact: "petgrooming@kindpaws.com",
        category: "Services",
        tags: ["pets", "grooming", "mobile", "rescue"]
    },
    {
        id: 4,
        title: "Ethical Web Design & Development",
        description: "Building accessible, sustainable websites for nonprofits and social enterprises. Sliding scale pricing available.",
        contact: "hello@ethicalweb.dev",
        category: "Services",
        tags: ["web-design", "nonprofit", "accessible", "sustainable"]
    },
    {
        id: 5,
        title: "Community Bike Repair Workshop",
        description: "Learn to fix your own bike or get help from our volunteers. Free workshops every Saturday. All tools provided.",
        contact: "bikes@community.org",
        category: "Services",
        tags: ["bikes", "repair", "workshop", "free"]
    },

    // PRODUCTS
    {
        id: 6,
        title: "Handmade Wooden Toys",
        description: "Locally crafted wooden toys made from sustainable sources. Perfect for children of all ages. Each toy is unique.",
        contact: "woodentoys@example.com",
        category: "Products",
        tags: ["handmade", "wooden", "toys", "children"]
    },
    {
        id: 7,
        title: "Organic Vegetable CSA Shares",
        description: "Fresh, organic vegetables delivered weekly from our local farm. Supporting regenerative agriculture practices.",
        contact: "farm@greenacres.org",
        category: "Products",
        tags: ["organic", "vegetables", "CSA", "local-farm"]
    },
    {
        id: 8,
        title: "Upcycled Furniture & Home Goods",
        description: "Beautiful furniture pieces made from reclaimed wood and salvaged materials. Custom orders welcome.",
        contact: "upcycle@renewhome.com",
        category: "Products",
        tags: ["upcycled", "furniture", "reclaimed", "sustainable"]
    },
    {
        id: 9,
        title: "Fair Trade Coffee & Tea",
        description: "Direct trade coffee and tea sourced from small farmers. Every purchase supports sustainable farming communities.",
        contact: "shop@fairtradebrew.com",
        category: "Products",
        tags: ["fair-trade", "coffee", "tea", "ethical"]
    },
    {
        id: 10,
        title: "Handwoven Textiles & Blankets",
        description: "Traditional handwoven blankets and textiles. Proceeds support artisan cooperatives in developing countries.",
        contact: "textiles@artisancraft.org",
        category: "Products",
        tags: ["handwoven", "textiles", "fair-trade", "artisan"]
    },

    // COMMUNITY
    {
        id: 11,
        title: "Community Garden Volunteers Needed",
        description: "Join our weekly gardening sessions to help maintain the community garden. All experience levels welcome!",
        contact: "garden@community.org",
        category: "Community",
        tags: ["community", "garden", "volunteer", "outdoors"]
    },
    {
        id: 12,
        title: "Free English Conversation Classes",
        description: "Practice English in a friendly, welcoming environment. Native speakers and learners meet every Tuesday evening.",
        contact: "english@communitycenter.org",
        category: "Community",
        tags: ["education", "english", "free", "language"]
    },
    {
        id: 13,
        title: "Tool Library Membership",
        description: "Borrow tools instead of buying them! Annual membership gives you access to hundreds of tools and equipment.",
        contact: "tools@sharelibrary.org",
        category: "Community",
        tags: ["sharing", "tools", "library", "sustainable"]
    },
    {
        id: 14,
        title: "Neighborhood Watch Group",
        description: "Join our neighborhood safety initiative. Monthly meetings and community building events. All neighbors welcome.",
        contact: "safety@neighborhood.org",
        category: "Community",
        tags: ["safety", "neighborhood", "community", "watch"]
    },
    {
        id: 15,
        title: "Little Free Library - Books Needed",
        description: "Donate gently used books to our little free library. All genres welcome, especially children's books.",
        contact: "books@littlelibrary.org",
        category: "Community",
        tags: ["books", "library", "donation", "reading"]
    },

    // EVENTS
    {
        id: 16,
        title: "Monthly Clothing Swap",
        description: "First Saturday of every month. Bring clothes you don't wear, take home something new to you. Free and fun!",
        contact: "swap@sustainablestyle.org",
        category: "Events",
        tags: ["clothing-swap", "sustainable", "free", "fashion"]
    },
    {
        id: 17,
        title: "Community Repair Cafe",
        description: "Bring broken items and learn to fix them with help from skilled volunteers. Third Sunday monthly at Community Center.",
        contact: "repair@cafe.org",
        category: "Events",
        tags: ["repair", "workshop", "sustainable", "skills"]
    },
    {
        id: 18,
        title: "Meditation & Mindfulness Group",
        description: "Free guided meditation sessions every Wednesday evening. Beginners welcome. Donation-based, no one turned away.",
        contact: "peace@mindfulcommunity.org",
        category: "Events",
        tags: ["meditation", "wellness", "free", "mindfulness"]
    },
    {
        id: 19,
        title: "Community Potluck Dinner",
        description: "Monthly gathering to share food and stories. Bring a dish to share and meet your neighbors. Everyone welcome!",
        contact: "potluck@neighborhood.org",
        category: "Events",
        tags: ["potluck", "community", "food", "neighbors"]
    },
    {
        id: 20,
        title: "Park Cleanup Day",
        description: "Join us for our quarterly park cleanup! Gloves and bags provided. Refreshments served. Kids and families encouraged.",
        contact: "cleanup@parkscommittee.org",
        category: "Events",
        tags: ["cleanup", "environment", "volunteer", "community"]
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
