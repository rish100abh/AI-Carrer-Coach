import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app",name:"Sensai",credentials: { gemini: {
    apiKey: process.env.GOOGLE_API_KEY,
} } });