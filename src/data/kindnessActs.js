/*
filename: kindnessActs.js
date: March 16, 2025
programmer: James Tran
title: Kindness Acts Data
purpose: Provides the data structure for random acts of kindness
*/

/* ┌──────────────────────────────────────┐
    KINDNESS ACTS DATA
└──────────────────────────────────────┘ */

const kindnessActs = [
    {
        id: 1,
        act: "Compliment a stranger on something you genuinely admire about them",
        category: "social",
        effort: "low"
    },
    {
        id: 2,
        act: "Leave a positive review for a small business you appreciate",
        category: "community",
        effort: "low"
    },
    {
        id: 3,
        act: "Send a text to someone you haven't spoken to in a while",
        category: "personal",
        effort: "low"
    },
    {
        id: 4,
        act: "Hold the door open for someone",
        category: "social",
        effort: "minimal"
    },
    {
        id: 5,
        act: "Buy a meal for someone experiencing homelessness",
        category: "community",
        effort: "medium"
    },
    {
        id: 6,
        act: "Leave a generous tip for your server",
        category: "social",
        effort: "low"
    },
    {
        id: 7,
        act: "Write a thank you note to someone who has positively impacted your life",
        category: "personal",
        effort: "medium"
    },
    {
        id: 8,
        act: "Donate clothes you no longer wear to a shelter",
        category: "community",
        effort: "medium"
    },
    {
        id: 9,
        act: "Let someone go ahead of you in line",
        category: "social",
        effort: "minimal"
    },
    {
        id: 10,
        act: "Pick up litter in your local park",
        category: "environment",
        effort: "medium"
    },
    {
        id: 11,
        act: "Offer to help an elderly neighbor with groceries or yard work",
        category: "community",
        effort: "medium"
    },
    {
        id: 12,
        act: "Share a book that changed your perspective with someone",
        category: "personal",
        effort: "low"
    },
    {
        id: 13,
        act: "Plant a tree or donate to a reforestation project",
        category: "environment",
        effort: "medium"
    },
    {
        id: 14,
        act: "Forgive someone who hurt you, even if just in your heart",
        category: "personal",
        effort: "high"
    },
    {
        id: 15,
        act: "Volunteer at a local food bank",
        category: "community",
        effort: "high"
    },
    {
        id: 16,
        act: "Make a donation to a cause you believe in",
        category: "community",
        effort: "medium"
    },
    {
        id: 17,
        act: "Send flowers to someone going through a difficult time",
        category: "personal",
        effort: "medium"
    },
    {
        id: 18,
        act: "Pay for the coffee of the person behind you in line",
        category: "social",
        effort: "low"
    },
    {
        id: 19,
        act: "Reduce your water usage by taking shorter showers this week",
        category: "environment",
        effort: "medium"
    },
    {
        id: 20,
        act: "Write a positive comment on a blog or article you enjoyed",
        category: "social",
        effort: "minimal"
    },
    {
        id: 21,
        act: "Create a care package for a friend who's feeling down",
        category: "personal",
        effort: "medium"
    },
    {
        id: 22,
        act: "Start a fundraiser for a cause you care about",
        category: "community",
        effort: "high"
    },
    {
        id: 23,
        act: "Teach someone a skill you're good at",
        category: "personal",
        effort: "medium"
    },
    {
        id: 24,
        act: "Reduce single-use plastic in your daily routine",
        category: "environment",
        effort: "medium"
    },
    {
        id: 25,
        act: "Listen attentively to someone without interrupting",
        category: "social",
        effort: "low"
    },
    {
        id: 26,
        act: "Offer to walk a neighbor's dog",
        category: "community",
        effort: "medium"
    },
    {
        id: 27,
        act: "Practice patience with someone who is frustrating you",
        category: "personal",
        effort: "medium"
    },
    {
        id: 28,
        act: "Share your umbrella with a stranger on a rainy day",
        category: "social",
        effort: "low"
    },
    {
        id: 29,
        act: "Start a community garden",
        category: "environment",
        effort: "high"
    },
    {
        id: 30,
        act: "Tutor a student who is struggling with a subject you know well",
        category: "community",
        effort: "high"
    },
    {
        id: 31,
        act: "Write a genuine note of appreciation to someone whose work often goes unnoticed and give it to them directly",
        category: "social",
        effort: "medium"
    },
    {
        id: 32,
        act: "Smile and make eye contact with people you pass on the street",
        category: "social",
        effort: "minimal"
    },
    {
        id: 33,
        act: "Bring reusable bags to the grocery store and encourage others to do the same",
        category: "environment",
        effort: "low"
    },
    {
        id: 34,
        act: "Offer to take a photo for tourists or groups struggling with selfies",
        category: "social",
        effort: "minimal"
    },
    {
        id: 35,
        act: "Compliment a coworker on their recent accomplishment",
        category: "personal",
        effort: "minimal"
    },
    {
        id: 36,
        act: "Donate blood at your local blood bank",
        category: "community",
        effort: "medium"
    },
    {
        id: 37,
        act: "Leave quarters at a laundromat for someone who might need them",
        category: "social",
        effort: "low"
    },
    {
        id: 38,
        act: "Call a family member you haven't spoken to in a while",
        category: "personal",
        effort: "low"
    },
    {
        id: 39,
        act: "Pick up groceries for an elderly or disabled neighbor",
        category: "community",
        effort: "medium"
    },
    {
        id: 40,
        act: "Share helpful resources or articles with someone who could benefit from them",
        category: "social",
        effort: "low"
    },
    {
        id: 41,
        act: "Mentor someone younger in your profession or hobby",
        category: "community",
        effort: "high"
    },
    {
        id: 42,
        act: "Say 'please' and 'thank you' more often and truly mean it",
        category: "social",
        effort: "minimal"
    },
    {
        id: 43,
        act: "Support local artists by purchasing their work or attending their shows",
        category: "community",
        effort: "medium"
    },
    {
        id: 44,
        act: "Bring coffee or treats to your coworkers",
        category: "social",
        effort: "low"
    },
    {
        id: 45,
        act: "Spend quality time with a loved one without your phone",
        category: "personal",
        effort: "medium"
    },
    {
        id: 46,
        act: "Feed birds or squirrels in your local park",
        category: "environment",
        effort: "low"
    },
    {
        id: 47,
        act: "Return shopping carts to the store entrance",
        category: "social",
        effort: "minimal"
    },
    {
        id: 48,
        act: "Offer your seat to someone on public transportation",
        category: "social",
        effort: "minimal"
    },
    {
        id: 49,
        act: "Create a playlist for someone based on their music taste",
        category: "personal",
        effort: "low"
    },
    {
        id: 50,
        act: "Apologize sincerely to someone you've wronged",
        category: "personal",
        effort: "high"
    },
    {
        id: 51,
        act: "Share your knowledge by writing a helpful blog post or tutorial",
        category: "community",
        effort: "high"
    },
    {
        id: 52,
        act: "Give genuine compliments to service workers (cashiers, servers, etc.)",
        category: "social",
        effort: "minimal"
    },
    {
        id: 53,
        act: "Organize a neighborhood cleanup event",
        category: "environment",
        effort: "high"
    },
    {
        id: 54,
        act: "Buy from local farmers markets instead of big chains",
        category: "community",
        effort: "low"
    },
    {
        id: 55,
        act: "Send an encouraging message to someone going through a tough time",
        category: "personal",
        effort: "low"
    },
    {
        id: 56,
        act: "Repair something instead of throwing it away",
        category: "environment",
        effort: "medium"
    },
    {
        id: 57,
        act: "Volunteer to read to children at a local library or school",
        category: "community",
        effort: "medium"
    },
    {
        id: 58,
        act: "Give someone your full attention when they're speaking to you",
        category: "social",
        effort: "low"
    },
    {
        id: 59,
        act: "Share your skills by teaching a free workshop or class",
        category: "community",
        effort: "high"
    },
    {
        id: 60,
        act: "Leave a book you've enjoyed in a public place for someone else to discover",
        category: "social",
        effort: "low"
    }
];

export default kindnessActs;
