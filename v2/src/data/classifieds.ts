/*
filename: classifieds.ts
date: August 8, 2026
programmer: James Tran
title: Classifieds Listings Data
purpose: Curated classified listings (ported from v1 Classifieds.js).
         Current entries are SAMPLE listings with placeholder contacts —
         replace with real paying/community listings as they arrive
         (see docs/MONETIZATION.md).
*/

/* ┌──────────────────────────────────────┐
    TYPES
└──────────────────────────────────────┘ */

export interface Classified {
  id: number;
  title: string;
  description: string;
  contact: string;
  category: "Services" | "Products" | "Community" | "Events";
  tags: string[];
}

/* ┌──────────────────────────────────────┐
    LISTINGS (samples — see header note)
└──────────────────────────────────────┘ */

export const classifieds: Classified[] = [
  {
    id: 1,
    title: "Eco-Friendly Cleaning Service",
    description: "Professional home cleaning using only natural, environmentally safe products. Certified green cleaning specialists.",
    contact: "greenclean@example.com",
    category: "Services",
    tags: ["eco-friendly", "cleaning", "sustainable"],
  },
  {
    id: 2,
    title: "Free Tax Help for Seniors",
    description: "Volunteer tax assistance program for seniors and low-income families. AARP certified volunteers ready to help.",
    contact: "taxhelp@community.org",
    category: "Services",
    tags: ["free", "tax-help", "seniors", "volunteer"],
  },
  {
    id: 3,
    title: "Mobile Pet Grooming - Rescue Discount",
    description: "Professional pet grooming that comes to you. 20% discount for rescued pets. We use cruelty-free products only.",
    contact: "petgrooming@kindpaws.com",
    category: "Services",
    tags: ["pets", "grooming", "mobile", "rescue"],
  },
  {
    id: 4,
    title: "Ethical Web Design & Development",
    description: "Building accessible, sustainable websites for nonprofits and social enterprises. Sliding scale pricing available.",
    contact: "hello@ethicalweb.dev",
    category: "Services",
    tags: ["web-design", "nonprofit", "accessible", "sustainable"],
  },
  {
    id: 5,
    title: "Community Bike Repair Workshop",
    description: "Learn to fix your own bike or get help from our volunteers. Free workshops every Saturday. All tools provided.",
    contact: "bikes@community.org",
    category: "Services",
    tags: ["bikes", "repair", "workshop", "free"],
  },
  {
    id: 6,
    title: "Handmade Wooden Toys",
    description: "Locally crafted wooden toys made from sustainable sources. Perfect for children of all ages. Each toy is unique.",
    contact: "woodentoys@example.com",
    category: "Products",
    tags: ["handmade", "wooden", "toys", "children"],
  },
  {
    id: 7,
    title: "Organic Vegetable CSA Shares",
    description: "Fresh, organic vegetables delivered weekly from our local farm. Supporting regenerative agriculture practices.",
    contact: "farm@greenacres.org",
    category: "Products",
    tags: ["organic", "vegetables", "CSA", "local-farm"],
  },
  {
    id: 8,
    title: "Upcycled Furniture & Home Goods",
    description: "Beautiful furniture pieces made from reclaimed wood and salvaged materials. Custom orders welcome.",
    contact: "upcycle@renewhome.com",
    category: "Products",
    tags: ["upcycled", "furniture", "reclaimed", "sustainable"],
  },
  {
    id: 9,
    title: "Fair Trade Coffee & Tea",
    description: "Direct trade coffee and tea sourced from small farmers. Every purchase supports sustainable farming communities.",
    contact: "shop@fairtradebrew.com",
    category: "Products",
    tags: ["fair-trade", "coffee", "tea", "ethical"],
  },
  {
    id: 10,
    title: "Handwoven Textiles & Blankets",
    description: "Traditional handwoven blankets and textiles. Proceeds support artisan cooperatives in developing countries.",
    contact: "textiles@artisancraft.org",
    category: "Products",
    tags: ["handwoven", "textiles", "fair-trade", "artisan"],
  },
  {
    id: 11,
    title: "Community Garden Volunteers Needed",
    description: "Join our weekly gardening sessions to help maintain the community garden. All experience levels welcome!",
    contact: "garden@community.org",
    category: "Community",
    tags: ["community", "garden", "volunteer", "outdoors"],
  },
  {
    id: 12,
    title: "Free English Conversation Classes",
    description: "Practice English in a friendly, welcoming environment. Native speakers and learners meet every Tuesday evening.",
    contact: "english@communitycenter.org",
    category: "Community",
    tags: ["education", "english", "free", "language"],
  },
  {
    id: 13,
    title: "Tool Library Membership",
    description: "Borrow tools instead of buying them! Annual membership gives you access to hundreds of tools and equipment.",
    contact: "tools@sharelibrary.org",
    category: "Community",
    tags: ["sharing", "tools", "library", "sustainable"],
  },
  {
    id: 14,
    title: "Neighborhood Watch Group",
    description: "Join our neighborhood safety initiative. Monthly meetings and community building events. All neighbors welcome.",
    contact: "safety@neighborhood.org",
    category: "Community",
    tags: ["safety", "neighborhood", "community", "watch"],
  },
  {
    id: 15,
    title: "Little Free Library - Books Needed",
    description: "Donate gently used books to our little free library. All genres welcome, especially children's books.",
    contact: "books@littlelibrary.org",
    category: "Community",
    tags: ["books", "library", "donation", "reading"],
  },
  {
    id: 16,
    title: "Monthly Clothing Swap",
    description: "First Saturday of every month. Bring clothes you don't wear, take home something new to you. Free and fun!",
    contact: "swap@sustainablestyle.org",
    category: "Events",
    tags: ["clothing-swap", "sustainable", "free", "fashion"],
  },
  {
    id: 17,
    title: "Community Repair Cafe",
    description: "Bring broken items and learn to fix them with help from skilled volunteers. Third Sunday monthly at Community Center.",
    contact: "repair@cafe.org",
    category: "Events",
    tags: ["repair", "workshop", "sustainable", "skills"],
  },
  {
    id: 18,
    title: "Meditation & Mindfulness Group",
    description: "Free guided meditation sessions every Wednesday evening. Beginners welcome. Donation-based, no one turned away.",
    contact: "peace@mindfulcommunity.org",
    category: "Events",
    tags: ["meditation", "wellness", "free", "mindfulness"],
  },
  {
    id: 19,
    title: "Community Potluck Dinner",
    description: "Monthly gathering to share food and stories. Bring a dish to share and meet your neighbors. Everyone welcome!",
    contact: "potluck@neighborhood.org",
    category: "Events",
    tags: ["potluck", "community", "food", "neighbors"],
  },
  {
    id: 20,
    title: "Park Cleanup Day",
    description: "Join us for our quarterly park cleanup! Gloves and bags provided. Refreshments served. Kids and families encouraged.",
    contact: "cleanup@parkscommittee.org",
    category: "Events",
    tags: ["cleanup", "environment", "volunteer", "community"],
  },
];
