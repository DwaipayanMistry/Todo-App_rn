export interface data {
    id: number,
    title: string,
    description ?: string | null,
    completed: boolean
}

export const data: data[] = [
    {
        id: 1,
        title: "Finish reading the book",
        completed: true,
        description: "Complete the last two chapters of the book."
    },
    {
        id: 2,
        title: "Buy groceries",
        completed: false,
        description: "Purchase vegetables, fruits, and dairy products."
    },
    {
        id: 3,
        title: "Write a blog post",
        completed: true,
        description: "Draft and publish the blog post on web development."
    },
    {
        id: 4,
        title: "Clean the house",
        completed: false,
        description: "Vacuum and dust all rooms, and clean the bathrooms."
    },
    {
        id: 5,
        title: "Work out",
        completed: true,
        description: "Complete a 30-minute cardio session and strength training."
    },
    {
        id: 6,
        title: "Call the bank",
        completed: false,
        description: "Inquire about the new savings account options."
    },
    {
        id: 7,
        title: "Fix the leaking faucet",
        completed: true,
        description: "Replace the washer in the kitchen faucet."
    },
    {
        id: 8,
        title: "Plan the trip itinerary",
        completed: false,
        description: "Organize the travel schedule and book accommodations."
    },
    {
        id: 9,
        title: "Attend the meeting",
        completed: true,
        description: "Participate in the project status meeting at 10 AM."
    },
    {
        id: 10,
        title: "Finish the project report",
        completed: false,
        description: "Compile the final project report and submit it."
    },
    {
        id: 11,
        title: "Update the software",
        completed: true,
        description: "Install the latest updates for all software applications."
    },
    {
        id: 12,
        title: "Visit the doctor",
        completed: false,
        description: "Go for the annual health check-up appointment."
    },
    {
        id: 13,
        title: "Organize the desk",
        completed: true,
        description: "Sort and file all documents and clean the desk surface."
    },
    {
        id: 14,
        title: "Cook dinner",
        completed: false,
        description: "Prepare a healthy meal with vegetables and protein."
    },
    {
        id: 15,
        title: "Reply to emails",
        completed: true,
        description: "Respond to all pending emails in the inbox."
    },
    {
        id: 16,
        title: "Finish the presentation",
        completed: false,
        description: "Complete the slides for the upcoming presentation."
    },
    {
        id: 17,
        title: "Take the car for servicing",
        completed: true,
        description: "Get the car serviced and check for any issues."
    },
    {
        id: 18,
        title: "Pay the bills",
        completed: false,
        description: "Pay the electricity, water, and internet bills."
    },
    {
        id: 19,
        title: "Research for the article",
        completed: true,
        description: "Gather information and sources for the new article."
    },
    {
        id: 20,
        title: "Set up the new computer",
        completed: false,
        description: "Install all necessary software and transfer files."
    }
];
