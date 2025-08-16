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
    }
  ],

  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      description: "Lead development of multiple client projects, mentor junior developers, and architect scalable web applications."
    },
    {
      company: "StartupXYZ",
      position: "Frontend Developer",
      duration: "2020 - 2022",
      description: "Developed responsive web applications using React and implemented modern UI/UX designs."
    },
    {
      company: "Digital Agency",
      position: "Web Developer",
      duration: "2019 - 2020",
      description: "Built custom websites and web applications for various clients using modern web technologies."
    }
  ]
};