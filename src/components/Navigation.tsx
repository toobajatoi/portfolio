'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [showFallback, setShowFallback] = useState(false);
  const bitmojiRef = useRef(null);
  const isGithubPages = typeof window !== 'undefined' && window.location.hostname === 'toobajatoi.github.io';
  const bitmojiPath = isGithubPages ? '/portfolio/images/bitmoji.png' : '/images/bitmoji.png';

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href="#"
              className="flex items-center gap-2 focus:outline-none"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow">
                <img
                  ref={bitmojiRef}
                  src={bitmojiPath}
                  alt="Tooba Bitmoji"
                  width={40}
                  height={40}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '9999px', zIndex: 10, display: showFallback ? 'none' : 'block' }}
                  className="relative shadow-lg"
                  onError={() => setShowFallback(true)}
                />
                {showFallback && (
                  <img
                    id="bitmoji-fallback"
                    src="/images/bitmoji.png"
                    alt="Tooba Bitmoji Fallback"
                    width={40}
                    height={40}
                    style={{ display: 'block' }}
                  />
                )}
              </div>
            </a>
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-8">
                {sections.map((section) => (
                  <motion.a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-blue-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.label}
                  </motion.a>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative group"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
                
                {/* Tooltip */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 shadow-lg whitespace-nowrap">
                  Because bright screens are for rookies 😎
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                </div>
              </motion.button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-black z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {sections.map((section) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-blue-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 