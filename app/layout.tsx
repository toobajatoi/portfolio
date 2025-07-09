import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Tooba Jatoi - Portfolio',
  description: 'AI Research Engineer & Creative Director',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' }
    ],
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <link rel="icon" href={process.env.NODE_ENV === 'production' ? '/portfolio/favicon.png' : '/favicon.png'} type="image/png" />
      </head>
      <body className={inter.className + ' ' + jetbrainsMono.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen bg-white dark:bg-black">
            {children}
          </main>
        </ThemeProvider>
        <Script
          id="voice-command"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  if (typeof window === 'undefined') return;
  if (document.getElementById('voice-command-injected')) return;
  var container = document.createElement('div');
  container.className = 'voice-command-container';
  container.id = 'voice-command-injected';
  container.innerHTML = \`
    <button class="mic-button" id="micButton">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
      </svg>
    </button>
    <div class="transcript" id="transcript"></div>
  \`;
  document.body.appendChild(container);
  var micButton = document.getElementById('micButton');
  var transcriptElement = document.getElementById('transcript');
  var recognition = null;
  var isListening = false;
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onstart = function() {
      isListening = true;
      micButton.classList.add('listening');
      transcriptElement.textContent = 'Listening...';
    };
    recognition.onresult = function(event) {
      var transcript = Array.from(event.results)
        .map(function(result) { return result[0].transcript; })
        .join('');
      transcriptElement.textContent = transcript;
      matchAndNavigate(transcript);
    };
    recognition.onerror = function(event) {
      transcriptElement.textContent = 'Error: ' + event.error;
      isListening = false;
      micButton.classList.remove('listening');
    };
    recognition.onend = function() {
      isListening = false;
      micButton.classList.remove('listening');
    };
    micButton.addEventListener('click', function() {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    });
  } else {
    micButton.disabled = true;
    transcriptElement.textContent = 'Speech recognition not supported in this browser.';
  }
  function matchAndNavigate(transcript) {
    var lowerTranscript = transcript.toLowerCase();
    // External links
    if (lowerTranscript.includes('linkedin')) {
      transcriptElement.textContent = 'Opening LinkedIn...';
      window.open('https://www.linkedin.com/in/tooba-jatoi44/', '_blank');
      return;
    }
    if (lowerTranscript.includes('github')) {
      transcriptElement.textContent = 'Opening GitHub...';
      window.open('https://github.com/toobajatoi', '_blank');
      return;
    }
    if (lowerTranscript.includes('behance')) {
      transcriptElement.textContent = 'Opening Behance...';
      window.open('https://www.behance.net/toobajatoi', '_blank');
      return;
    }
    if (lowerTranscript.includes('supportiyo')) {
      transcriptElement.textContent = 'Opening Supportiyo...';
      window.open('https://supportiyo.com', '_blank');
      return;
    }
    if (lowerTranscript.includes('theforgedev')) {
      transcriptElement.textContent = 'Opening TheForgeDev...';
      window.open('https://www.linkedin.com/company/theforgedev/posts/?feedView=all', '_blank');
      return;
    }
    if (lowerTranscript.includes('mlabs') || lowerTranscript.includes('m-labs')) {
      transcriptElement.textContent = 'Opening M-Labs...';
      window.open('https://www.linkedin.com/company/mindstorm-studios/posts/?feedView=all', '_blank');
      return;
    }
    if (lowerTranscript.includes('procreate')) {
      transcriptElement.textContent = 'Opening Procreate Portfolio...';
      window.open('https://folio.procreate.com/tmax_artistic', '_blank');
      return;
    }
    // Theme switching
    if (lowerTranscript.includes('dark mode') || lowerTranscript.includes('night mode')) {
      transcriptElement.textContent = 'Switching to dark mode...';
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      return;
    }
    if (lowerTranscript.includes('light mode') || lowerTranscript.includes('day mode')) {
      transcriptElement.textContent = 'Switching to light mode...';
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      return;
    }
    // Home/main/about navigation
    var homeKeywords = [
      'main page', 'home', 'start', 'go to start', 'go to main', 'go to home', 'top of page', 'scroll to top', 'tell me about her', 'about', 'about her', 'about tooba', 'who is tooba', 'who are you', 'introduction', 'intro', 'landing', 'landing page', 'hero section', 'show me about', 'show me introduction', 'show me intro', 'show me landing', 'show me hero', 'show me main', 'show me home', 'show me start'
    ];
    for (var h = 0; h < homeKeywords.length; h++) {
      if (lowerTranscript.includes(homeKeywords[h])) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        transcriptElement.textContent = 'Navigating to the top/main page...';
        return;
      }
    }
    // Section navigation
    var sectionMap = {
      'work': [
        'work', 'experience', 'job', 'jobs', 'career', 'professional background', 'employment', 'work history', 'show me your work', 'tell me about your work', 'show me your experience', 'what is your experience', 'show me your job', 'show me your jobs', 'show me your career', 'show me your professional background', 'show me your employment', 'show me your work history'
      ],
      'projects': [
        'projects', 'portfolio', 'show me your projects', 'what have you worked on', 'project', 'my work', 'see your projects', 'see your portfolio', 'show me your portfolio', 'show me your work', 'what are your projects', 'what projects have you done', 'project section'
      ],
      'certificates': [
        'certificates', 'certification', 'achievements', 'awards', 'accomplishments', 'show me your certificates', 'show me your certifications', 'show me your achievements', 'show me your awards', 'show me your accomplishments', 'certificate section', 'certification section', 'achievement section', 'award section', 'accomplishment section'
      ],
      'skills': [
        'skills', 'abilities', 'expertise', 'what are your skills', 'tell me about your abilities', 'show me your expertise', 'skillset', 'proficiencies', 'competencies', 'show me your skills', 'show me your abilities', 'show me your skillset', 'show me your proficiencies', 'show me your competencies', 'skills section', 'abilities section', 'expertise section', 'skill section'
      ],
      'education': [
        'education', 'studies', 'school', 'university', 'academic', 'background', 'degree', 'show me your education', 'show me your studies', 'show me your school', 'show me your university', 'show me your academic background', 'show me your degree', 'education section', 'studies section', 'school section', 'university section', 'academic section', 'background section', 'degree section'
      ],
      'contact': [
        'contact', 'get in touch', 'how to contact', 'open contact info', 'reach out', 'contact information', 'contact details', 'email', 'message', 'send a message', 'how can i contact you', 'how do i contact you', 'contact section', 'contact me', 'contact page', 'contact info', 'get in contact', 'reach me', 'how to reach you', 'how to reach me'
      ]
    };
    var entries = Object.entries(sectionMap);
    for (var i = 0; i < entries.length; i++) {
      var section = entries[i][0];
      var keywords = entries[i][1];
      for (var j = 0; j < keywords.length; j++) {
        var keyword = keywords[j];
        if (lowerTranscript.includes(keyword)) {
          var element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            transcriptElement.textContent = 'Navigating to ' + section.charAt(0).toUpperCase() + section.slice(1) + ' section...';
            return;
          }
        }
      }
    }
  }
  // Bitmoji fallback: always show fallback if Next.js Image fails
  var fallback = document.getElementById('bitmoji-fallback');
  var bitmojiImg = document.querySelector('img[alt="Tooba Bitmoji"]');
  if (bitmojiImg) {
    bitmojiImg.onerror = function() {
      if (fallback) fallback.style.display = 'block';
      this.style.display = 'none';
    };
  }
})();
            `
          }}
        />
      </body>
    </html>
  )
}
