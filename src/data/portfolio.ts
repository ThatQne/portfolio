export const portfolioData = {
  personal: {
    name: "Matthew Zhong",
    title: "Full Stack Developer",
    subtitle: "Building digital experiences with modern technologies",
    bio: "I love making apps, games, and UI/UX designs. I started getting into programming when I was only 12 years old, and am now studying CS and AI in University.",
    location: "North Potomac, MD",
    email: "thatqne@gmail.com",
    phone: "+1 (240) ***-****",
    website: "https://thatqne.dev",
    avatar: "https://cdn.discordapp.com/avatars/619628288356253750/e1c9de273285f33c822079d66ea1a6c3?size=1024"
  },

  aboutItems: [
    {
      icon: "MapPin",
      text: "North Potomac, MD",
      label: "Location"
    },
    {
      icon: "Calendar",
      text: "19+ years of existence",
      label: "Experience"
    },
    {
      icon: "Award",
      text: "Certified Human",
      label: "Certification"
    }
  ],

  social: [
    {
      name: "GitHub",
      url: "https://github.com/thatqne",
      icon: "github"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/thatqne",
      icon: "linkedin"
    },
    {
      name: "X",
      url: "https://x.com/johndoe",
      icon: "x"
    },
    {
      name: "Discord",
      url: "https://discordapp.com/users/619628288356253750",
      icon: "discord"
    },
    {
      name: "Email",
      url: "thatqne@gmail.com",
      icon: "mail"
    }
  ],

  skills: [
    {
      name: "Frontend Technologies",
      speed: 50,
      items: [
        { name: "React", icon: "SiReact", pack: "si" },
        { name: "TypeScript", icon: "SiTypescript", pack: "si" },
        { name: "Next.js", icon: "SiNextdotjs", pack: "si" },
        { name: "Vue.js", icon: "SiVuedotjs", pack: "si" },
        { name: "JavaScript", icon: "SiJavascript", pack: "si" },
        { name: "HTML5", icon: "SiHtml5", pack: "si" },
        { name: "CSS3", icon: "SiCss3", pack: "si" },
        { name: "Tailwind", icon: "SiTailwindcss", pack: "si" },
        { name: "Lua", icon: "SiLua", pack: "si" },
        { name: "Python", icon: "SiPython", pack: "si" },
      ]
    },
    {
      name: "Backend & Database",
      speed: 50,
      items: [
        { name: "Node.js", icon: "SiNodedotjs", pack: "si" },
        { name: "SQLite", icon: "SiSqlite", pack: "si" },
        { name: "MongoDB", icon: "SiMongodb", pack: "si" },
        { name: "Redis", icon: "SiRedis", pack: "si" },
        { name: "Docker", icon: "SiDocker", pack: "si" },
        { name: "AWS", icon: "SiAmazonaws", pack: "si" }
      ]
    },
    {
      name: "Tools & Workflow",
      speed: 50,
      items: [
        { name: "Git", icon: "SiGit", pack: "si" },
        { name: "GitHub", icon: "SiGithub", pack: "si" },
        { name: "Figma", icon: "SiFigma", pack: "si" },
        { name: "VS Code", icon: "SiVisualstudiocode", pack: "si" },
        { name: "Vite", icon: "SiVite", pack: "si" }
      ]
    },
  ],

  // finished - Green badge
  // in-progress - Blue badge
  // abandoned - Red badge
  // paused - Yellow badge
  // planned - Purple badge

  projects: [
    {
      title: "Portfolio",
      description: "The portfolio site you are browsing right now.",
      technologies: ["React", "Node.js"],
      liveUrl: "https://thatqne.github.io/portfolio",
      githubUrl: "https://github.com/thatqne/portfolio",
      featured: false,
      status: "finished"
      // image: "car-trading-app.jpg" // Optional: add image filename from src/data/images/
    },
    {
      title: "Drivora",
      description: "A modern Car Auction and Trading platform. Features include user authentication, live chat, and trade system.",
      technologies: ["React", "Node.js"],
      liveUrl: "https://thatqne.github.io/drivora",
      githubUrl: "https://github.com/thatqne/drivora",
      featured: true,
      status: "paused"
      // image: "car-trading-app.jpg" // Optional: add image filename from src/data/images/
    },
    {
      title: "zer0",
      description: "An advanced QR code scanner for businesses, targeted to eliminate wait times and speed up purchases.",
      technologies: ["React", "Node.js"],
      liveUrl: "https://thatqne.github.io/zer0",
      githubUrl: "https://github.com/thatqne/zer0",
      featured: true,
      status: "in-progress"
      // image: "car-trading-app.jpg" // Optional: add image filename from src/data/images/
    },
    {
      title: "DoThat",
      description: "A minimalist task management application, with drag-and-drop functionality, reminders, and extra features.",
      technologies: ["Vue.js", "Firebase", "Vuetify"],
      liveUrl: "https://thatqne.github.io/dothat/",
      githubUrl: "https://github.com/thatqne/dothat",
      featured: true,
      status: "paused"
      // image: "task-app.png" // Optional: add image filename from src/data/images/
    },
    {
      title: "Vestro",
      description: "A modern mock gambling site with a live leaderboard and case battles",
      technologies: ["React"],
      liveUrl: "https://thatqne.github.io/vestro/",
      githubUrl: "https://github.com/thatqne/vestro",
      featured: false,
      status: "abandoned"
      // image: "weather-dashboard.jpg" // Optional: add image filename from src/data/images/
    },
    {
      title: "ZenTax",
      description: "Auto tax completion software with AI",
      technologies: ["React"],
      liveUrl: "https://thatqne.github.io/-",
      githubUrl: "https://github.com/thatqne/-",
      featured: false,
      status: "planned"
      // image: "weather-dashboard.jpg" // Optional: add image filename from src/data/images/
    },
    {
      title: "Lumo",
      description: "Very streamline and encrypted messaging service, prioritizing speed and simplicity.",
      technologies: ["React"],
      liveUrl: "https://thatqne.github.io/-",
      githubUrl: "https://github.com/thatqne/-",
      featured: false,
      status: "planned"
      // image: "weather-dashboard.jpg" // Optional: add image filename from src/data/images/
    },
    {
      title: "Versura",
      description: "Online ranked 1v1 games, from tetri to chess, in a reimagined look.",
      technologies: ["React"],
      liveUrl: "https://thatqne.github.io/-",
      githubUrl: "https://github.com/thatqne/-",
      featured: false,
      status: "planned"
      // image: "weather-dashboard.jpg" // Optional: add image filename from src/data/images/
    },
    {
      title: "AI Trade Bot",
      description: "A forex trade software with autotrading and mock testing of strategies",
      technologies: ["React"],
      liveUrl: "https://thatqne.github.io/-",
      githubUrl: "https://github.com/thatqne/-",
      featured: false,
      status: "planned"
      // image: "weather-dashboard.jpg" // Optional: add image filename from src/data/images/
    },
    {
      title: "Swipr",
      description: "A easy app to organize your gallery, swipe right to delete and left to keep, sorted by date, albums, ect",
      technologies: ["React"],
      liveUrl: "https://thatqne.github.io/-",
      githubUrl: "https://github.com/thatqne/-",
      featured: false,
      status: "planned"
      // image: "weather-dashboard.jpg" // Optional: add image filename from src/data/images/
    },
    {
      title: "Pet Trade",
      description: "An app to trade and sell pets and animals",
      technologies: ["React"],
      liveUrl: "https://thatqne.github.io/-",
      githubUrl: "https://github.com/thatqne/-",
      featured: false,
      status: "planned"
      // image: "weather-dashboard.jpg" // Optional: add image filename from src/data/images/
    },
  ],

  experience: [
    {
      company: "MeLand LLC",
      position: "Point-of-Sale Operations Associate",
      duration: "May 2022 - August 2022",
      description: "Dealt with sums of cash and handles customers in a one to one environment"
    },
    {
      company: "iFix",
      position: "Technical Service Operations Executive",
      duration: "May 2025 - August 2025",
      description: "Worked on high end pieces of technology"
    },
  ],

  // Easter egg casual content - code editor style
  casualConfig: {
    spotify: {
      playlistId: "094vqnt9DTvSHbJ40sETuu?si=30f33fe04ee04eb9", // Replace with your playlist ID
      playlistUrl: "https://open.spotify.com/playlist/094vqnt9DTvSHbJ40sETuu?si=30f33fe04ee04eb9", // Replace with your playlist URL
      description: "My coding soundtrack - lo-fi beats and synthwave vibes" // Your personal description
    },
    categories: [
      {
        id: "music",
        title: "music.json",
        description: "// Coding soundtracks and chill vibes",
        icon: "music",
        color: "#1DB954", // Spotify green
        content: {
          type: "spotify",
          data: {}
        }
      },
      {
        id: "gaming",
        title: "gaming.js",
        description: "// Current setup and favorite games",
        icon: "gamepad",
        color: "#FF6B35", // Gaming orange
        content: {
          type: "gaming",
          data: {
            setup: {
              gpu: "RTX 4070",
              cpu: "Ryzen 7 5800X",
              ram: "32GB DDR4",
              monitor: "27\" 1440p 144Hz"
            },
            games: [
              { name: "Valorant", hours: 500, rank: "Diamond" },
              { name: "Apex Legends", hours: 300, rank: "Platinum" },
              { name: "CS2", hours: 200, rank: "Global Elite" }
            ]
          }
        }
      },
      {
        id: "hobbies",
        title: "hobbies.tsx",
        description: "// Random interests and side projects",
        icon: "camera",
        color: "#8B5CF6", // Purple
        content: {
          type: "hobbies",
          data: {
            photography: {
              camera: "Canon EOS R6",
              style: "Street & Portrait",
              instagram: "@thatqne"
            },
            coffee: {
              shops_visited: 42,
              favorite_brew: "Ethiopian Single Origin",
              current_quest: "Perfect espresso in DMV"
            },
            other: [
              "Mechanical keyboards",
              "Home automation",
              "3D printing experiments"
            ]
          }
        }
      }
    ]
  },

  casualStats: [
    { label: "Hours in Apex", value: "100+" },
    { label: "Rank in Apex", value: "Bronze III" },
    { label: "Bugs created", value: "∞" },
    { label: "Side projects started", value: "127" },
    { label: "Side projects finished", value: "3" },
  ]
};