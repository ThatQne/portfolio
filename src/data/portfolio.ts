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
        { name: "Sass", icon: "SiSass", pack: "si" },
        { name: "Tailwind", icon: "SiTailwindcss", pack: "si" },
        { name: "Bootstrap", icon: "SiBootstrap", pack: "si" }
      ]
    },
    {
      name: "Backend & Database",
      speed: 50,
      items: [
        { name: "Node.js", icon: "SiNodedotjs", pack: "si" },
        { name: "Python", icon: "SiPython", pack: "si" },
        { name: "PostgreSQL", icon: "SiPostgresql", pack: "si" },
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
        { name: "Jest", icon: "SiJest", pack: "si" },
        { name: "Webpack", icon: "SiWebpack", pack: "si" },
        { name: "Vite", icon: "SiVite", pack: "si" }
      ]
    },
  ],

  projects: [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A modern e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      image: "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/johndoe/ecommerce-platform",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Vue.js", "Firebase", "Vuetify"],
      liveUrl: "https://example-tasks.com",
      githubUrl: "https://github.com/johndoe/task-manager",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "Chart.js", "OpenWeather API"],
      liveUrl: "https://example-weather.com",
      githubUrl: "https://github.com/johndoe/weather-dashboard",
      featured: false
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