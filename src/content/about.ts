/**
 * About page — brand story, philosophy, mission, vision, promise, and team.
 * Quantum = metaphor/ambition, never a hardware claim (same rule as content/edge.ts).
 */
export const aboutIntro = {
  kicker: "ABOUT QUBITRIX",
  heading: "Engineering the future of intelligent businesses.",
  sub: "Technology should adapt to businesses — not the other way around.",
};

export const aboutStory = {
  heading: "Every business deserves its own intelligence.",
  paragraphs: [
    "At Qubitrix, we believe every organization deserves intelligent systems designed around the way it works. Whether it's a local entrepreneur, a healthcare provider, a manufacturing unit, a logistics company, or a global enterprise, we build customized AI-powered ecosystems that understand operations, automate repetitive work, and optimize business performance.",
    "Our goal isn't to replace people — it's to empower them. By combining artificial intelligence with intelligent automation, we help businesses eliminate operational complexity, improve efficiency, and free people to focus on innovation, creativity, and meaningful decisions.",
  ],
  tag: "Every workflow. Every department. Every business. Built with intelligence.",
};

export const aboutWhatWeDo = {
  kicker: "WHAT WE DO",
  heading: "End-to-end AI systems, built around how you work.",
  text: "We design and develop end-to-end AI business solutions tailored to each organization's unique way of working — AI employees, AI agents, workflow automation, custom software, web and mobile applications, intelligent dashboards, enterprise platforms, and fully connected digital ecosystems. From strategy to deployment, every solution integrates seamlessly into existing operations, creating smarter, faster, and more scalable businesses.",
};

export const aboutPhilosophy = {
  kicker: "OUR PHILOSOPHY",
  heading: "No two businesses are the same.",
  text: "A farmer, a doctor, a retailer, a manufacturer, and a multinational enterprise all operate differently. That's why we never believe in one-size-fits-all software. We begin by understanding how a business works — its people, workflows, challenges, and goals — then build intelligent systems that fit naturally into its operations. From small businesses to global enterprises, our philosophy stays the same.",
};

export const aboutMission = {
  kicker: "OUR MISSION",
  heading: "Advanced AI, accessible to everyone.",
  text: "We simplify complex technology so entrepreneurs, business owners, and organizations — regardless of technical background — can adopt intelligent solutions with confidence. By delivering customized AI systems, intelligent automation, and scalable digital platforms, we help businesses operate more efficiently, make smarter decisions, and unlock sustainable growth.",
};

export const aboutResearch = {
  kicker: "RESEARCH & INNOVATION",
  heading: "Building today. Researching tomorrow.",
  text: "While we build intelligent business solutions today, we're equally committed to the technologies of tomorrow. Qubitrix is steadily investing in research across artificial intelligence, advanced computational systems, and quantum computing — guided by scientific thinking and engineering excellence, aiming to shape the next generation of intelligent technologies for business and society.",
  tag: "Innovation isn't just part of what we do. It's the foundation of who we are.",
};

export const aboutVision = {
  kicker: "OUR VISION",
  heading: "An intelligent digital workforce for every business.",
  text: "We envision a future where every business operates with its own intelligent digital workforce — where AI understands operations, automates repetitive tasks, supports better decisions, and adapts to the unique needs of every organization. From a farmer managing a single field to a multinational enterprise operating across continents, our vision stays the same: make intelligent technology accessible, practical, and transformative for everyone. Our long-term ambition reaches further still — contributing to the evolution of quantum computing and next-generation computational intelligence.",
};

export const aboutPromise = {
  kicker: "OUR PROMISE",
  heading: "We don't build generic software.",
  lines: [
    "We build intelligent systems that understand businesses.",
    "We don't simply automate processes — we optimize the way organizations think, operate, and grow.",
  ],
  tagline: "Every business deserves its own intelligence.",
};

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Public path to headshot, or null while awaiting a photo. */
  photo: string | null;
}

export const team: TeamMember[] = [
  {
    name: "Devika NR",
    role: "Founder · Head of AI Automation & Quantum Computing Research",
    bio: "Devika combines advanced AI innovation with the vision of next-generation computing. She leads Qubitrix's research-driven approach to AI automation, enterprise workflow architecture, and quantum computing — turning ambitious ideas into technologies that help businesses grow smarter and faster.",
    photo: "/team/devika-nr.png",
  },
  {
    name: "Legith Kumar",
    role: "Chief Technology Officer",
    bio: "With over 15 years of enterprise software engineering experience at organizations including Wipro and Cognizant, Legith leads the engineering vision at Qubitrix. His expertise in scalable architecture and enterprise systems ensures every solution is secure, reliable, and built for long-term growth.",
    photo: "/team/legith-kumar.jpg",
  },
  {
    name: "Abhishek M Nair",
    role: "Full-Stack Software Engineer",
    bio: "Abhishek develops scalable software platforms and intelligent applications, helping transform innovative ideas into practical digital solutions.",
    photo: null,
  },
  {
    name: "Sudhin K V",
    role: "Engineering & Project Advisor",
    bio: "Sudhin contributes to project planning, technical coordination, and engineering excellence, ensuring consistent execution and high-quality delivery across every initiative.",
    photo: null,
  },
];
