'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaLinkedin, FaGithub, FaBehance, FaBriefcase, FaTools, FaGraduationCap, FaProjectDiagram, FaCertificate, FaEnvelope } from 'react-icons/fa';
import { SiAdobeaftereffects } from 'react-icons/si';
import { Typewriter } from 'react-simple-typewriter';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const technicalProjects = [
  {
    title: 'Lead Generation Web Scraper',
    description: 'A full-stack lead generation application that scrapes Google Maps and business websites for contact information, including emails, social media, and key personnel. Built with Python, Flask, and Selenium, and designed for easy deployment with Docker.',
    link: 'https://github.com/toobajatoi/lead-gen'
  },
  {
    title: 'BrainPan: Real-time Emotion & Tone Detector',
    description: 'Developed a real-time emotion and tone detection system using BERT models, achieving 92% accuracy across 3 languages. Integrated with RESTful APIs for seamless deployment.',
    link: 'https://github.com/toobajatoi/BrainPan'
  },
  {
    title: 'Jobflux - AI Job Scraper & Outreach Automator',
    description: 'A free Chrome extension that auto-detects jobs on LinkedIn, Wellfound, or Indeed, scrapes key job info, and generates customized cover letters and outreach messages using free LLM APIs. Enables direct sending via LinkedIn DM, email, or Notion save.',
    link: 'https://github.com/toobajatoi/jobflux'
  },
  {
    title: 'Real-time Sarcasm Detector',
    description: 'Implemented a real-time sarcasm detection system using machine learning and audio processing techniques. Captures audio input, extracts relevant features, and uses a trained model to classify whether the speech contains sarcasm with high accuracy.',
    link: 'https://github.com/toobajatoi/real-time-sarcasm-detector'
  },
  {
    title: 'Vocal Lock',
    description: 'Built a voice authentication system using Python, Whisper for speech-to-text, and machine learning for voice feature extraction and verification. Includes both command-line and Streamlit web interfaces for user enrollment and authentication.',
    link: 'https://github.com/toobajatoi/vocal-lock2'
  },
  {
    title: 'Tone Switcher',
    description: 'Developed a professional voice and text analysis tool that detects emotions from voice recordings and analyzes sentiment from text input. Provides real-time analysis and visualizations for both audio and text inputs with intuitive user interface.',
    link: 'https://github.com/toobajatoi/tone-switcher'
  },
  {
    title: 'LLM Scheduling Engine',
    description: 'Engineered a robust scheduling engine using FastAPI and Redis, achieving 99.9% uptime and 200ms response time for high-volume booking logic.'
  }
];

const designProjects = [
  {
    title: 'Supportiyo Dashboard',
    description: 'Designed and implemented a scalable dashboard for Supportiyo, leading the end-to-end UI/UX overhaul and increasing user engagement by 40%. Created intuitive user flows, responsive design systems, and seamless integration with backend services.',
    link: 'https://www.behance.net/gallery/229851743/Supportiyo-UIUX-Case-Study'
  },
  {
    title: 'DartMania - Mlabs',
    description: 'Designed and developed DartMania, a mobile game for M-Labs. Responsible for game mechanics, UI/UX, and asset creation using Unity, Figma, Illustrator, and Blender. Achieved 85% positive user feedback and implemented engaging gameplay loops, level design, and visual effects.',
    link: 'https://www.behance.net/gallery/206445581/Dart-Mania-Game-Promo-Video'
  },
  {
    title: 'Supportiyo Promo Video',
    description: 'Created compelling promotional video content for Supportiyo, showcasing the platform\'s features and benefits through engaging visual storytelling. Designed motion graphics, transitions, and visual effects to effectively communicate brand messaging.',
    link: 'https://www.behance.net/gallery/206443857/Supportiyo-Promo-Video'
  },
  {
    title: 'Spider-Man Across the PAKISTAN',
    description: 'Created a unique Spider-Man concept design using AI prompt engineering for ideation and concept development. Used Procreate for typography and Adobe Photoshop for final design execution, blending traditional design principles with modern AI-assisted creative workflows.',
    link: 'https://www.behance.net/gallery/206446173/Spider-Man-Across-the-PAKISTAN'
  },
  {
    title: 'Guitar Music Video - 2D Stop Motion',
    description: 'Produced engaging 2D stop motion animation for music videos using Procreate for illustration and Adobe After Effects for editing. Created character designs, storyboards, and motion graphics that enhance storytelling and user engagement.',
    link: 'https://www.behance.net/gallery/206447077/GUITAR-Music-cover-album-2D-stop-motion'
  }
];

const experiences = [
  {
    title: "AI Research Architect & Creative Director",
    company: "Supportiyo",
    period: "Jul 2024 -- Jul 2025",
    location: "Remote",
    type: "Full-time",
    emoji: "🤖",
    link: "https://www.linkedin.com/company/supportiyo/?viewAsMember=true",
    description: [
      "Built real-time automation flows using FastAPI, Zapier, and Redis for scheduling and booking.",
      "Developed scalable APIs with Google Calendar integration and webhook support.",
      "Led LLM-based R&D and built a real-time Emotion & Tone Detector using BERT with multilingual support.",
      "Redesigned Supportiyo's website and dashboard UI/UX, improving usability and visual consistency.",
      "Created a scalable design system and delivered high-fidelity prototypes for seamless developer handoff."
    ]
  },
  {
    title: "Game Designer Intern",
    company: "M-Labs",
    period: "Jun 2024 -- Aug 2024",
    location: "Pakistan",
    type: "Full-time",
    emoji: "🎮",
    link: "https://www.linkedin.com/company/mindstorm-studios/posts/?feedView=all",
    description: [
      "Designed and developed the core gameplay experience for Dart Mania, a casual arcade game where the dart itself is the moving target.",
      "Developed UI concepts, animations, and visual elements in collaboration with the art team to deliver a polished and cohesive experience.",
      "Iterated on gameplay features based on testing and feedback, focusing on difficulty scaling as levels progressed."
    ]
  },
  {
    title: "User Interface Designer",
    company: "TheForgeDev",
    period: "Jun 2023 -- Jul 2024",
    location: "Remote",
    type: "Full-time",
    emoji: "💡",
    link: "https://www.linkedin.com/company/theforgedev/posts/?feedView=all",
    description: [
      "Designed modern, user-centered interfaces for web and mobile applications, aligning visuals with brand identity and product goals.",
      "Created interactive wireframes, user flows, and high-fidelity prototypes using Figma, enhancing clarity in development handoffs.",
      "Conducted user research, competitive analysis, and usability testing to identify pain points and optimize user journeys.",
      "Collaborated closely with product managers and frontend developers to ensure design feasibility and consistency across platforms.",
      "Led the design system development to maintain visual consistency and streamline future product updates.",
      "Applied accessibility best practices (WCAG) to ensure inclusive design across devices.",
      "Iterated rapidly on feedback to refine layouts, microinteractions, and responsiveness for different screen sizes."
    ]
  },
  {
    title: "Illustrator & Animation Designer",
    company: "Freelance",
    period: "Jun 2020 -- Present",
    location: "Remote",
    type: "Contract",
    emoji: "🎨",
    link: "https://folio.procreate.com/tmax_artistic",
    description: [
      "Created 2D animations and illustrations for different clients. Worked on music videos, boosting user engagement through expressive visuals and storytelling.",
      "Designed logos and brand assets for multiple startups and clients, contributing to strong brand identity.",
      "Developed product design concepts, UI mockups, and visual assets for apps, social media, and promotional content.",
      "Collaborated with cross-functional teams to ensure design consistency and smooth asset integration."
    ]
  }
];

const skills = [
  {
    category: "Programming Languages",
    items: ["Python", "JavaScript", "TypeScript", "C/C++", "HTML5", "CSS3", "SQL", "Shell Scripting"],
    emoji: "💻"
  },
  {
    category: "Frameworks & Libraries",
    items: ["FastAPI", "React", "BERT", "Redis", "Zapier", "LLM", "Prompt Engineering"],
    emoji: "⚡"
  },
  {
    category: "Tools & Technologies",
    items: ["Git", "Docker", "REST APIs", "Webhooks", "CI/CD", "Agile Methodologies"],
    emoji: "🛠️"
  },
  {
    category: "Design & Prototyping",
    items: ["Figma", "Adobe Creative Suite", "Blender", "Procreate", "UI/UX Design"],
    emoji: "🎨"
  },
  {
    category: "Soft Skills",
    items: ["Technical Leadership", "Project Management", "Problem Solving", "Team Collaboration"],
    emoji: "🌟"
  }
];

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "National University of Computer and Emerging Sciences",
    location: "Karachi, Pakistan",
    period: "2022 -- 2026",
    emoji: "🎓"
  },
  {
    degree: "Advanced Level GCSE",
    school: "Beaconhouse School System",
    location: "Hyderabad, Pakistan",
    period: "2019 -- 2021",
    emoji: "📚"
  }
];

const certificates = [
  {
    name: 'SQL (Advanced) Certificate',
    url: 'https://www.hackerrank.com/certificates/fe65b4e9ee5c'
  },
  {
    name: 'CSS (Basic) Certificate',
    url: 'https://www.hackerrank.com/certificates/088c3978ddd0'
  },
  {
    name: 'Software Engineer Intern Certificate',
    url: 'https://www.hackerrank.com/certificates/23e71663bfef'
  },
  {
    name: 'SQL (Basic) Certificate',
    url: 'https://www.hackerrank.com/certificates/de27adc0932a'
  },
  {
    name: 'M-Lab Summer Jam Completion',
    url: 'https://drive.google.com/file/d/1TgujRolPw1hNm5-qF90w5XvhG1QY4Gm2/view'
  }
];

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [shouldAnimate, setShouldAnimate] = useState(true);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  const isGithubPages = typeof window !== 'undefined' && window.location.hostname === 'toobajatoi.github.io';
  const bitmojiPath = process.env.NODE_ENV === 'production' ? '/portfolio/images/bitmoji.png' : '/images/bitmoji.png';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 100) {
        setShouldAnimate(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Floating Background Blobs - Reduced size on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-72 lg:w-96 h-32 sm:h-48 md:h-72 lg:h-96 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute top-1/3 right-1/4 w-32 sm:w-48 md:w-72 lg:w-96 h-32 sm:h-48 md:h-72 lg:h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed" />
          <div className="absolute bottom-1/4 left-1/3 w-32 sm:w-48 md:w-72 lg:w-96 h-32 sm:h-48 md:h-72 lg:h-96 bg-pink-200/20 dark:bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-float-more-delayed" />
        </div>
        {/* Doodles - Hidden on mobile */}
        <svg className="absolute top-20 right-20 w-16 sm:w-24 h-16 sm:h-24 text-indigo-200/30 dark:text-indigo-500/20 hidden sm:block" viewBox="0 0 100 100">
          <path d="M10,50 Q25,25 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-draw" />
          <path d="M10,70 Q25,45 50,70 T90,70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-draw-delayed" />
        </svg>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full max-w-4xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            className="mb-6 sm:mb-8 mx-auto flex items-center justify-center group"
          >
            <a 
              href="https://www.linkedin.com/in/tooba-jatoi44/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 rounded-full bg-white/80 dark:bg-gray-900/80 p-1 shadow-xl flex items-center justify-center group-hover:animate-bitmoji-bounce backdrop-blur-xl border-2 border-white/20 dark:border-indigo-500/20 cursor-pointer transition-transform hover:scale-105"
            >
              <div className="absolute inset-0 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl z-0" />
              <img
                src={bitmojiPath}
                alt="Tooba's Bitmoji"
                width={300}
                height={300}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '9999px', zIndex: 10 }}
                className="relative shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-300" />
            </a>
          </motion.div>
          <motion.h4 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-3 sm:mb-4 tracking-wider uppercase font-sans"
          >
            AI Research Architect & Creative Director
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 md:mb-8 tracking-tighter text-gray-900 dark:text-white font-sans"
          >
            <span className="typewriter">
              <Typewriter
                words={["Tooba Jatoi"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={120}
                deleteSpeed={100}
                delaySpeed={3000}
                cursorBlinking={true}
              />
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-sans px-2 sm:px-0"
          >
            CS major who merges logic, design, and AI sorcery, because why pick one when you can stress over all three? From clean UIs to real-time backend chaos, I make smart stuff that (usually) works.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center w-full max-w-xs sm:max-w-none mx-auto"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg font-sans border-2 border-transparent dark:border-indigo-400/20 text-center"
            >
              Let's Talk
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigator.clipboard.writeText('toobajatoi44@gmail.com');
                // Add toast notification here
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-gray-800/80 text-indigo-600 dark:text-indigo-400 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-indigo-200 dark:border-indigo-500/30 text-base sm:text-lg font-sans backdrop-blur-md text-center"
            >
              Copy Email
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="work" className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-2 mb-8 sm:mb-12 md:mb-16 relative"
          >
            <div className="flex items-center gap-3 relative">
              <FaBriefcase className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white font-sans relative">
                Experience
              </h2>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card glass-effect border-2 border-white/20 dark:border-indigo-500/20 hover:border-indigo-200 dark:hover:border-indigo-500/40 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30"
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-center md:items-start">
                  <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
                    <span className="text-3xl sm:text-4xl md:text-5xl mb-2">{exp.emoji}</span>
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                      {exp.company}
                      <FaLinkedin className="inline-block text-indigo-600 dark:text-indigo-400" />
                    </a>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.period}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{exp.location}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{exp.type}</p>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <ul className="space-y-2 mt-2">
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 flex items-start font-sans"
                        >
                          <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-32 sm:w-48 md:w-72 lg:w-96 h-32 sm:h-48 md:h-72 lg:h-96 bg-pink-200/20 dark:bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/3 w-32 sm:w-48 md:w-72 lg:w-96 h-32 sm:h-48 md:h-72 lg:h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 md:w-[500px] lg:w-[600px] h-64 sm:h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-r from-blue-200/10 via-purple-200/10 to-pink-200/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-float-more-delayed" />
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 dark:opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 sm:mb-12 md:mb-16 relative"
          >
            <FaProjectDiagram className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white font-sans relative">
              Projects
            </h2>
          </motion.div>

          {/* Technical Projects Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 mb-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200/50 dark:border-blue-500/30 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <FaTools className="text-2xl sm:text-3xl text-blue-600 dark:text-blue-400" />
              </motion.div>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-sans">
                  Technical Projects
                </h3>
                <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-medium mt-1">
                  AI/ML • Web Development • Automation
                </p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              {technicalProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`card glass-effect border-2 border-blue-200/50 dark:border-blue-500/30 hover:border-blue-300 dark:hover:border-blue-400 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 hover:bg-white/50 dark:hover:bg-gray-900/50 ${project.link ? 'cursor-pointer hover:scale-105 hover:-translate-y-2' : ''}`}
                  onClick={project.link ? () => window.open(project.link, '_blank') : undefined}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white font-sans mb-2">{project.title}</h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4"></div>
                    </div>
                    {project.link && (
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl ml-4">
                        <FaGithub className="text-blue-600 dark:text-blue-400 text-xl sm:text-2xl hover:text-blue-700 dark:hover:text-blue-300 transition-colors" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-sans leading-relaxed">{project.description}</p>
                  {project.link && (
                    <div className="mt-6 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                      <span>View Project</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Design Projects Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 mb-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-200/50 dark:border-purple-500/30 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <FaBehance className="text-2xl sm:text-3xl text-purple-600 dark:text-purple-400" />
              </motion.div>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-sans">
                  Design Projects
                </h3>
                <p className="text-sm sm:text-base text-purple-600 dark:text-purple-400 font-medium mt-1">
                  UI/UX • Branding • Animation • Game Design
                </p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              {designProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`card glass-effect border-2 border-purple-200/50 dark:border-purple-500/30 hover:border-purple-300 dark:hover:border-purple-400 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 hover:bg-white/50 dark:hover:bg-gray-900/50 ${project.link ? 'cursor-pointer hover:scale-105 hover:-translate-y-2' : ''}`}
                  onClick={project.link ? () => window.open(project.link, '_blank') : undefined}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white font-sans mb-2">{project.title}</h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"></div>
                    </div>
                    {project.link && (
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl ml-4">
                        <FaBehance className="text-purple-600 dark:text-purple-400 text-xl sm:text-2xl hover:text-purple-700 dark:hover:text-purple-300 transition-colors" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-sans leading-relaxed">{project.description}</p>
                  
                  {/* Show tools for different projects */}
                  {project.title === 'Supportiyo Dashboard' && (
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Tools:</span>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Figma</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {project.title === 'DartMania - Mlabs' && (
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Tools:</span>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Unity</span>
                        </div>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Figma</span>
                        </div>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <SiAdobeaftereffects className="text-purple-600 dark:text-purple-400 text-sm" />
                        </div>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Procreate</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {project.title === 'Supportiyo Promo Video' && (
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Tools:</span>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <SiAdobeaftereffects className="text-purple-600 dark:text-purple-400 text-sm" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {project.title === 'Guitar Music Video - 2D Stop Motion' && (
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Tools:</span>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Procreate</span>
                        </div>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <SiAdobeaftereffects className="text-purple-600 dark:text-purple-400 text-sm" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {project.title === 'Spider-Man Across the PAKISTAN' && (
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Tools:</span>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">AI Prompt Engineering</span>
                        </div>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Procreate</span>
                        </div>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Adobe Photoshop</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {project.link && (
                    <div className="mt-6 flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-semibold">
                      <span>View Project</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-32 px-4 relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Doodles */}
        <svg className="absolute top-20 left-20 w-28 h-28 text-indigo-200/30 dark:text-indigo-500/20" viewBox="0 0 100 100">
          <path d="M10,10 L90,90 M90,10 L10,90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-draw" />
        </svg>
        <svg className="absolute bottom-20 right-20 w-24 h-24 text-purple-200/30 dark:text-purple-500/20" viewBox="0 0 100 100">
          <path d="M50,10 Q90,50 50,90 Q10,50 50,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-draw-delayed" />
        </svg>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-16 relative"
          >
            <svg className="absolute -left-8 -top-4 w-16 h-16 text-purple-200/30 dark:text-purple-500/20" viewBox="0 0 100 100">
              <path d="M10,50 Q25,25 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-draw" />
            </svg>
            <FaCertificate className="text-2xl text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white font-sans relative">
              Certificates
              <svg className="absolute -right-12 -bottom-4 w-16 h-16 text-purple-200/30 dark:text-purple-500/20" viewBox="0 0 100 100">
                <path d="M10,50 Q25,25 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-draw-delayed" />
              </svg>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((cert, idx) => (
              <motion.a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card glass-effect border-2 border-white/20 dark:border-purple-500/20 hover:border-indigo-200 dark:hover:border-purple-500/40 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30"
              >
                <span className="text-2xl">🎓</span>
                <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 underline font-sans">{cert.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 sm:mb-12 md:mb-16 relative"
          >
            <FaTools className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white font-sans relative">
              Skills
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card glass-effect border-2 border-white/20 dark:border-indigo-500/20 hover:border-indigo-200 dark:hover:border-indigo-500/40 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30"
                whileHover={{ y: -5, rotate: -1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl sm:text-4xl">{skillGroup.emoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-sans">
                    {skillGroup.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-2 sm:px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs sm:text-sm font-medium font-sans border border-indigo-200 dark:border-indigo-500/20"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 sm:mb-12 md:mb-16 relative"
          >
            <FaGraduationCap className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white font-sans relative">
              Education
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card glass-effect border-2 border-white/20 dark:border-pink-500/20 hover:border-indigo-200 dark:hover:border-pink-500/40 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30"
                whileHover={{ y: -5, rotate: 1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl sm:text-4xl">{edu.emoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-sans">
                    {edu.degree}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-2 font-sans">{edu.school}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans">{edu.location}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6 sm:mb-8 justify-center relative"
          >
            <FaEnvelope className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white font-sans relative">
              Let's work together.
            </h2>
          </motion.div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed font-sans px-2 sm:px-0">
            Creating innovative solutions with AI and creative design
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center w-full max-w-xs sm:max-w-none mx-auto">
            <motion.a
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:toobajatoi44@gmail.com"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg font-sans border-2 border-transparent dark:border-indigo-400/20"
            >
              Let's Talk
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigator.clipboard.writeText('toobajatoi44@gmail.com');
                // Add toast notification here
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-gray-800/80 text-indigo-600 dark:text-indigo-400 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-indigo-200 dark:border-indigo-500/30 text-base sm:text-lg font-sans backdrop-blur-md"
            >
              Copy Email
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">© 2024 Tooba Jatoi</p>
          <div className="flex gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/in/tooba-jatoi44/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-white transition-colors text-xl sm:text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.behance.net/toobajatoi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white transition-colors text-xl sm:text-2xl"
            >
              <FaBehance />
            </a>
            <a
              href="http://github.com/toobajatoi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-xl sm:text-2xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </footer>

      {/* Vertical Social Bar - Hidden on mobile */}
      <div className="hidden sm:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 items-center bg-white/80 dark:bg-gray-900/80 rounded-full shadow-lg p-4 border-2 border-gray-200 dark:border-indigo-500/20 backdrop-blur-xl">
        <a href="https://www.linkedin.com/in/tooba-jatoi44/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-white text-xl sm:text-2xl"><FaLinkedin /></a>
        <a href="https://www.behance.net/toobajatoi" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white text-xl sm:text-2xl"><FaBehance /></a>
        <a href="http://github.com/toobajatoi" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-xl sm:text-2xl"><FaGithub /></a>
      </div>
    </div>
  );
} 