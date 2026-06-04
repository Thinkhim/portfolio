import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';
import {
  Grid, Bug, CheckSquare, Wrench, Layers, Terminal,
  Mail, Phone, MapPin, Linkedin, Menu, X, ChevronRight,
  Download, ExternalLink, Shield, Zap, Gamepad2, Link2,
  Brain, Eye, Globe, Lock, Activity, GraduationCap
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = ['about', 'skills', 'experience', 'projects', 'services', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E8EDF5] overflow-x-hidden" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* Navigation */}
      <Navigation
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} />

      {/* Metrics Dashboard */}
      <MetricsDashboard />

      {/* About Me */}
      <AboutSection />

      {/* Skills */}
      <SkillsSection />

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Projects */}
      <ProjectsSection
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />

      {/* Testing Domains */}
      <TestingDomains />

      {/* QA Services */}
      <ServicesSection />

      {/* Education */}
      <EducationSection />

      {/* Resume Download */}
      <ResumeSection />

      {/* Hire Me CTA */}
      <HireMeCTA scrollToSection={scrollToSection} />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 212, 255, 0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#00D4FF]/10 via-[#7B61FF]/10 to-transparent blur-3xl rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
      </div>
    </div>
  );
}

// Navigation Component
function Navigation({ isScrolled, isMenuOpen, setIsMenuOpen, activeSection, scrollToSection }: any) {
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A0C10]/80 backdrop-blur-xl border-b border-[#1C2130]' : ''
      }`}>
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
              HS
            </div>
            <span className="font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Himanshu Srivastava</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Skills', 'Experience', 'Projects', 'Services', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm transition-colors ${
                  activeSection === item.toLowerCase() ? 'text-[#00D4FF]' : 'text-[#7A8AA0] hover:text-[#E8EDF5]'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2 border border-[#00D4FF] rounded-lg text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all hover:shadow-[0_0_12px_rgba(0,212,255,0.3)]"
            >
              Hire Me
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#00D4FF]">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0C10] md:hidden pt-20 px-6">
          <div className="flex flex-col gap-6">
            {['About', 'Skills', 'Experience', 'Projects', 'Services', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xl text-left text-[#7A8AA0] hover:text-[#00D4FF] transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 border-2 border-[#00D4FF] rounded-lg text-[#00D4FF] text-center"
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Hero Section
function HeroSection({ scrollToSection }: any) {
  const [terminalText, setTerminalText] = useState(0);
  const terminalLines = [
    '> Loading test environment...',
    '> Scanning 14 active projects',
    '> Test types: manual, automation,',
    '  api, security, performance',
    '✓ All checks passed (0 critical)',
    '✓ Bug reports: filed & resolved',
    '> Status: READY FOR DEPLOYMENT'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalText(prev => (prev + 1) % terminalLines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-[1280px] mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F1318] border border-[#00E676]/30 rounded-full mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
            <span className="text-sm text-[#00E676]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              [ Available for Freelance & Contract ]
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Himanshu<br/>Srivastava
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-[#7A8AA0] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            QA Engineer · SDET · Automation QA
          </motion.p>

          <motion.p
            className="text-base text-[#3D4F63] mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Sole QA engineer across 14+ live projects. Delivering quality across
            gaming, blockchain, AI, AR/VR, and web — from test planning to release.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 bg-[#00D4FF] text-[#0A0C10] rounded-lg font-medium hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center gap-2"
            >
              View My Work <ChevronRight size={18} />
            </button>
            <button className="px-6 py-3 border border-[#7A8AA0] text-[#7A8AA0] rounded-lg font-medium hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all flex items-center gap-2">
              Download Resume <Download size={18} />
            </button>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-6 text-sm"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-[#7A8AA0]"><strong className="text-[#00D4FF]">14+</strong> Projects</span>
            <span className="text-[#3D4F63]">·</span>
            <span className="text-[#7A8AA0]"><strong className="text-[#00D4FF]">1+</strong> Years</span>
            <span className="text-[#3D4F63]">·</span>
            <span className="text-[#7A8AA0]"><strong className="text-[#00D4FF]">16</strong> Tools</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-[#0F1318] border border-[#00D4FF] rounded-lg p-6 font-mono text-sm"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-[#00E676]">
            <div className="mb-2">himanshu@qa-ops:~$ run test-suite</div>
            {terminalLines.slice(0, terminalText + 1).map((line, i) => (
              <div key={i} className="mb-1">{line}</div>
            ))}
            <div className="inline-block w-2 h-4 bg-[#00E676] animate-pulse ml-1" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Metrics Dashboard
function MetricsDashboard() {
  const metrics = [
    { label: 'Projects Tested', value: 14, icon: Grid, color: '#00D4FF' },
    { label: 'Defects Reported', value: 2000, icon: Bug, color: '#FF3D3D' },
    { label: 'Testing Types Mastered', value: 15, icon: CheckSquare, color: '#7B61FF' },
    { label: 'Tools & Platforms', value: 16, icon: Wrench, color: '#00D4FF' },
    { label: 'Domains Covered', value: 7, icon: Layers, color: '#FFB300' },
    { label: 'Test Cases Executed', value: 500, icon: Terminal, color: '#00E676' },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            QA At A Glance
          </h2>
          <p className="text-center text-[#7A8AA0] mb-16 max-w-2xl mx-auto">
            A snapshot of quality delivered across platforms and domains
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ metric, delay }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = metric.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, metric.value]);

  const Icon = metric.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="bg-[#0F1318] border-l-4 p-6 rounded-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all group"
      style={{ borderLeftColor: metric.color }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-4xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: metric.color }}>
          {count}+
        </h3>
        <Icon size={32} style={{ color: metric.color, opacity: 0.5 }} />
      </div>
      <p className="text-[#7A8AA0]">{metric.label}</p>
    </motion.div>
  );
}

// About Section
function AboutSection() {
  const philosophies = [
    { icon: '🧪', text: 'Test everything. Assume nothing.' },
    { icon: '🐛', text: 'Every bug found is a user protected.' },
    { icon: '🚀', text: 'Quality is not a phase. It\'s a discipline.' },
  ];

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#00D4FF]/20 to-[#7B61FF]/20 flex items-center justify-center mx-auto mb-6 border-4 border-[#00D4FF]/30" style={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)' }}>
                <div className="w-56 h-56 rounded-full bg-[#0F1318] flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-[#00E676]/10 border border-[#00E676] rounded-full w-fit mx-auto">
                <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                <span className="text-sm text-[#00E676]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Open to QA Opportunities
                </span>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              The Engineer Behind the Quality
            </h2>
            <div className="space-y-4 text-[#7A8AA0] leading-relaxed">
              <p>
                Computer Science graduate and QA Engineer at Abhiwan Technologies, Delhi. Sole QA across 14+ live products — Unity games, Unreal Engine, blockchain dApps, AR/VR, AI platforms, and web/mobile apps.
              </p>
              <p>
                Trained at QSPIDERS (Noida), independently owning end-to-end QA since October 2023. Published researcher (JETIR 2025) in ML-based cancer detection.
              </p>
              <p className="text-[#00D4FF] font-medium">
                Available for freelance, contract, part-time, and consulting QA engagements.
              </p>
            </div>
          </FadeInSection>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {philosophies.map((phil, i) => (
            <FadeInSection key={i}>
              <div className="bg-[#0F1318] border-l-4 border-[#00D4FF] p-6 rounded-lg">
                <div className="text-4xl mb-3">{phil.icon}</div>
                <p className="italic text-[#7A8AA0]">{phil.text}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const skillCategories = [
    {
      title: 'Testing Types',
      color: '#00D4FF',
      skills: ['Manual Testing', 'Functional Testing', 'Regression Testing', 'Smoke & Sanity', 'API Testing', 'Security Testing', 'Performance Testing', 'Load & Stress Testing', 'Usability Testing', 'Compatibility Testing', 'Region-Specific Testing', 'UAT', 'System Testing', 'E2E Testing']
    },
    {
      title: 'Automation & Frameworks',
      color: '#7B61FF',
      skills: ['Selenium WebDriver', 'Appium', 'Playwright']
    },
    {
      title: 'API & Network Testing',
      color: '#00D4FF',
      skills: ['Postman', 'Fiddler']
    },
    {
      title: 'Performance & Security',
      color: '#FFB300',
      skills: ['Apache JMeter', 'k6', 'OWASP ZAP', 'Google Lighthouse', 'DDoS Simulation', 'Vulnerability Assessment']
    },
    {
      title: 'Bug & Project Tracking',
      color: '#7B61FF',
      skills: ['JIRA', 'Bugzilla']
    },
    {
      title: 'Mobile Dev & Debug',
      color: '#00E676',
      skills: ['Android Studio', 'Android Profiler', 'ADB']
    },
    {
      title: 'Programming Languages',
      color: '#00D4FF',
      skills: ['Java (Basic)', 'Python (Basic)']
    },
    {
      title: 'Database',
      color: '#7B61FF',
      skills: ['MySQL']
    },
    {
      title: 'Dev Tools & IDEs',
      color: '#7A8AA0',
      skills: ['Git', 'Eclipse', 'VS Code']
    },
    {
      title: 'Platforms Tested',
      color: '#00D4FF',
      skills: ['Web', 'Android', 'iOS', 'Unity', 'Unreal Engine', 'Blockchain', 'AR/VR', 'Electron', 'Admin Panels']
    },
    {
      title: 'Operating Systems',
      color: '#00E676',
      skills: ['Windows', 'Linux']
    },
    {
      title: 'Methodologies',
      color: '#7B61FF',
      skills: ['Agile', 'Test Case Design', 'Defect Life Cycle', 'Sprint-Based Testing', 'Test Plan', 'Test Strategy', 'CI/CD Awareness']
    }
  ];

  const proficiencyBars = [
    { skill: 'Manual Testing', level: 95 },
    { skill: 'API Testing', level: 85 },
    { skill: 'Security Testing', level: 80 },
    { skill: 'Performance Testing', level: 80 },
    { skill: 'Automation (Selenium/Playwright)', level: 70 },
  ];

  return (
    <section id="skills" className="relative py-32 px-6 bg-[#0F1318]/30">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Skills & Arsenal
          </h2>
          <p className="text-center text-[#7A8AA0] mb-16 max-w-2xl mx-auto">
            Tools, technologies, and testing disciplines I work with
          </p>
        </FadeInSection>

        <div className="space-y-8 mb-16">
          {skillCategories.map((category, i) => (
            <FadeInSection key={i}>
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: category.color }}>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="px-4 py-2 bg-[#0F1318] border rounded-full text-sm transition-all hover:scale-105"
                      style={{
                        borderColor: category.color,
                        boxShadow: `0 0 0px ${category.color}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 12px ${category.color}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 0px ${category.color}`;
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection>
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Skill Proficiency
          </h3>
          <div className="max-w-3xl mx-auto space-y-6">
            {proficiencyBars.map((item, i) => (
              <ProgressBar key={i} skill={item.skill} level={item.level} delay={i * 0.1} />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

function ProgressBar({ skill, level, delay }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="text-[#E8EDF5]">{skill}</span>
        <span className="text-[#00D4FF]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{level}%</span>
      </div>
      <div className="h-2 bg-[#1C2130] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full relative"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ delay, duration: 1, ease: 'easeOut' }}
        >
          <div className="absolute right-0 top-0 w-2 h-full bg-white/50 blur-sm" />
        </motion.div>
      </div>
    </div>
  );
}

// Experience Timeline
function ExperienceTimeline() {
  const experiences = [
    {
      role: 'Quality Assurance Engineer',
      company: 'Abhiwan Technologies Pvt. Ltd.',
      duration: 'Oct 2023 – Present',
      location: 'Delhi, India',
      badge: 'Current Role',
      badgeColor: '#00D4FF',
      isCurrent: true,
      description: 'Sole QA engineer across 14+ live products spanning gaming, blockchain, AI, AR/VR, and web platforms. Independently managed full QA lifecycle from test planning to release sign-off.',
      achievements: [
        'End-to-end testing across Unity, Unreal Engine, blockchain, AR/VR, and AI platforms',
        'Security testing with OWASP ZAP + DDoS simulation',
        'Performance benchmarking with Apache JMeter and k6',
        'Validated NFT minting flows, crypto wallet integrations, and smart contract events',
        'Delivered 200+ reproducible bug reports',
        'Suggested UX/performance improvements incorporated into production builds'
      ]
    },
    {
      role: 'Software Testing Training',
      company: 'QSPIDERS, Noida',
      duration: 'Jan 2025 – Jun 2025',
      location: 'Noida, India',
      badge: 'Certified Training',
      badgeColor: '#00E676',
      isCurrent: false,
      description: '',
      achievements: [
        'Manual Testing, Selenium, Postman, JIRA, Agile methodology',
        'Real-world test execution and defect reporting'
      ]
    },
    {
      role: 'B.Tech — Computer Science & Engineering',
      company: 'Goel Institute of Technology and Management, Lucknow',
      duration: '2025',
      location: 'Lucknow, India',
      badge: 'Education',
      badgeColor: '#FFB300',
      isCurrent: false,
      description: 'CGPA: 7.45',
      achievements: [
        'Published research paper in JETIR (May 2025) on ML-enabled cancer detection'
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Career Timeline
          </h2>
          <p className="text-center text-[#7A8AA0] mb-16 max-w-2xl mx-auto">
            From training ground to owning quality at scale
          </p>
        </FadeInSection>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#1C2130]" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <FadeInSection key={i}>
                <div className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className={`bg-[#0F1318] border rounded-lg p-6 ${exp.isCurrent ? 'border-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.2)]' : 'border-[#1C2130]'}`}>
                      <div className="inline-block px-3 py-1 rounded-full text-xs mb-3" style={{
                        backgroundColor: `${exp.badgeColor}20`,
                        color: exp.badgeColor,
                        border: `1px solid ${exp.badgeColor}`
                      }}>
                        {exp.badge}
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {exp.role}
                      </h3>
                      <div className="text-[#00D4FF] mb-1">{exp.company}</div>
                      <div className="text-sm text-[#7A8AA0] mb-4">
                        {exp.duration} | {exp.location}
                      </div>
                      {exp.description && (
                        <p className="text-[#7A8AA0] mb-4">{exp.description}</p>
                      )}
                      <ul className="space-y-2 text-sm text-[#7A8AA0]">
                        {exp.achievements.map((achievement, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-[#00D4FF]">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="md:w-1/2" />
                  <div className="absolute left-0 md:left-1/2 top-8 w-4 h-4 rounded-full bg-[#00D4FF] -translate-x-[7px] border-4 border-[#0A0C10]" />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Projects Section (continued in next part due to length)
type Project = {
  name: string;
  domain: string;
  platform: string;
  domainColor: string;
  description: string;
  testingTypes: string[];
  tools: string[];
  contributions: string[];
  impact: string;
  category: string;
};

function ProjectsSection({ selectedFilter, setSelectedFilter, selectedProject, setSelectedProject }: any) {
  const filters = ['All', 'Gaming', 'Blockchain/NFT', 'AI/ML', 'AR/VR', 'Web', 'EdTech', 'Desktop'];

  const projects: Project[] = [
    {
      name: 'FairPriceRoof',
      domain: 'AI / LLM',
      platform: 'Web',
      domainColor: '#7B61FF',
      description: 'AI-powered roofing estimation platform connecting contractors and consumers using LLM + RAG architecture.',
      testingTypes: ['Functional', 'API', 'Regression', 'UAT', 'E2E'],
      tools: ['Postman', 'Fiddler', 'JIRA', 'Lighthouse', 'OWASP ZAP'],
      contributions: [
        'Validated LLM prompt accuracy and RAG retrieval quality',
        'Tested dynamic pricing logic',
        'Verified contractor-consumer matching flows',
        'Conducted API response validation for all AI endpoints'
      ],
      impact: 'Ensured AI output consistency and platform reliability prior to launch',
      category: 'AI/ML'
    },
    {
      name: 'AIIMS Game & Admin Panel',
      domain: 'Healthcare / Gaming',
      platform: 'Unreal Engine',
      domainColor: '#00E676',
      description: 'Unreal Engine-based cognitive focus game for ADHD-affected children developed with AIIMS.',
      testingTypes: ['Functional', 'Regression', 'Usability', 'System', 'Admin Panel Testing'],
      tools: ['JIRA', 'Bugzilla', 'Android Studio', 'ADB'],
      contributions: [
        'Tested gameplay mechanics and session management',
        'Validated clinical progress tracking',
        'Tested admin dashboard workflows',
        'Ensured age-appropriate UX for child users',
        'Verified data accuracy across sessions'
      ],
      impact: 'Delivered a medically sensitive product with zero critical defects at launch',
      category: 'Gaming'
    },
    {
      name: 'Echelon Tactics & Admin Panel',
      domain: 'AR / Multiplayer Gaming',
      platform: 'Unity (Android)',
      domainColor: '#00D4FF',
      description: 'Multiplayer AR mobile game with real-time combat built in Unity for Android.',
      testingTypes: ['Functional', 'Compatibility', 'Multiplayer Sync', 'API', 'Regression', 'Admin Panel'],
      tools: ['Android Studio', 'ADB', 'Android Profiler', 'JIRA', 'Postman'],
      contributions: [
        'Tested AR marker detection accuracy',
        'Validated real-time multiplayer session sync',
        'Performed combat mechanics QA',
        'Tested admin panel for player management and analytics'
      ],
      impact: 'Identified 15+ critical multiplayer sync issues before release',
      category: 'AR/VR'
    },
    {
      name: 'Drip Flip & Admin Panel',
      domain: 'Blockchain / Crypto',
      platform: 'Web',
      domainColor: '#FFB300',
      description: 'Blockchain and crypto reward-based web game with smart contract integration.',
      testingTypes: ['Functional', 'API', 'Security', 'Blockchain Flow', 'Regression', 'Admin Panel'],
      tools: ['Postman', 'Fiddler', 'OWASP ZAP', 'JIRA'],
      contributions: [
        'Validated token reward distribution accuracy',
        'Tested wallet integration flows',
        'Verified smart contract event triggers',
        'Security-tested transaction endpoints with OWASP ZAP'
      ],
      impact: 'Prevented multiple token distribution vulnerabilities from reaching production',
      category: 'Blockchain/NFT'
    },
    {
      name: 'Diamond Hooves',
      domain: 'NFT / Gaming',
      platform: 'Web',
      domainColor: '#7B61FF',
      description: 'NFT-based horse racing reward gaming platform.',
      testingTypes: ['Functional', 'API', 'Regression', 'NFT Flow', 'Compatibility'],
      tools: ['Postman', 'Fiddler', 'JIRA', 'Bugzilla'],
      contributions: [
        'Verified NFT ownership and rarity logic',
        'Tested reward redemption flows',
        'Validated wallet connectivity across browsers',
        'Tested game event triggers linked to NFT attributes'
      ],
      impact: 'Ensured NFT integrity and reward system accuracy across all user roles',
      category: 'Blockchain/NFT'
    },
    {
      name: 'Ultimate Domination',
      domain: 'NFT / Web Gaming',
      platform: 'Unity (Web)',
      domainColor: '#00D4FF',
      description: 'Unity-based NFT web strategy game with marketplace integration.',
      testingTypes: ['Functional', 'Regression', 'Compatibility', 'NFT Flow', 'Cross-Browser'],
      tools: ['JIRA', 'Postman', 'Fiddler', 'Lighthouse'],
      contributions: [
        'Tested gameplay loop and progression',
        'Validated NFT asset rendering',
        'Tested marketplace buy/sell/trade flows',
        'Cross-browser compatibility across Chrome, Firefox, Safari, Edge'
      ],
      impact: 'Identified rendering inconsistencies across browsers affecting 30% of users',
      category: 'Gaming'
    },
    {
      name: 'Walkers CNFT',
      domain: 'Blockchain / Fitness',
      platform: 'Mobile + Web',
      domainColor: '#00E676',
      description: 'Cardano blockchain-based NFT walking reward app — earn CNFTs by walking.',
      testingTypes: ['Functional', 'API', 'Performance', 'Mobile', 'Blockchain Flow'],
      tools: ['Android Studio', 'ADB', 'Android Profiler', 'Postman', 'JIRA'],
      contributions: [
        'Validated step-tracking accuracy against device sensors',
        'Tested CNFT reward issuance via blockchain events',
        'Verified wallet sync',
        'Performance profiled on low-end Android devices'
      ],
      impact: 'Ensured step-to-reward pipeline reliability for real-money CNFT rewards',
      category: 'Blockchain/NFT'
    },
    {
      name: 'Enric Generals & Admin Panel',
      domain: 'Gaming / Quiz',
      platform: 'Unity (Web + Mobile)',
      domainColor: '#FFB300',
      description: 'Unity-based competitive quiz gaming platform with leaderboard and multiplayer.',
      testingTypes: ['Functional', 'Regression', 'Multiplayer', 'Admin Panel', 'Performance'],
      tools: ['JIRA', 'Postman', 'Android Studio'],
      contributions: [
        'Tested quiz logic and answer validation',
        'Verified leaderboard ranking accuracy',
        'Validated multiplayer session handling',
        'Tested admin content management workflows'
      ],
      impact: 'Zero scoring logic bugs reported post-launch',
      category: 'Gaming'
    },
    {
      name: 'Kako Kids Game',
      domain: 'EdTech / Localization',
      platform: 'Unity',
      domainColor: '#7B61FF',
      description: 'Kurdish-language learning game for children built on Unity.',
      testingTypes: ['Functional', 'Usability', 'Localization', 'Audio', 'Regression'],
      tools: ['JIRA', 'Android Studio', 'ADB'],
      contributions: [
        'Verified Kurdish language content accuracy',
        'Tested audio-visual synchronization',
        'Performed age-appropriate UX testing',
        'Validated progression and reward logic for young users'
      ],
      impact: 'Ensured culturally accurate and child-safe content delivery',
      category: 'EdTech'
    },
    {
      name: 'VR Homes & Admin Panel',
      domain: 'AR/VR / Real Estate',
      platform: 'Web + VR',
      domainColor: '#00D4FF',
      description: 'Virtual reality-based interactive home walkthrough platform for real estate.',
      testingTypes: ['Functional', 'Compatibility', 'VR', 'Usability', 'Admin Panel'],
      tools: ['JIRA', 'Postman', 'Lighthouse'],
      contributions: [
        'Validated 3D environment navigation',
        'Tested property listing accuracy',
        'Verified VR headset compatibility',
        'Tested admin panel for listing management'
      ],
      impact: 'Delivered smooth VR experience across headset and desktop modes',
      category: 'AR/VR'
    },
    {
      name: 'Thumps Up Biryani Hunt',
      domain: 'Web / Promotional',
      platform: 'Web',
      domainColor: '#FFB300',
      description: 'Coca-Cola India branded promotional web game — find the best biryani.',
      testingTypes: ['Functional', 'Region-Specific', 'Compatibility', 'Promo Code', 'Cross-Browser'],
      tools: ['JIRA', 'Lighthouse', 'Fiddler'],
      contributions: [
        'Validated promotional code eligibility logic',
        'Tested region-specific rules for contest compliance',
        'Cross-browser rendering tests',
        'Verified prize-flow and user registration'
      ],
      impact: 'Delivered zero post-launch promotional errors for a national brand campaign',
      category: 'Web'
    },
    {
      name: 'Chetnamanch & Admin Panel',
      domain: 'Web / Local News',
      platform: 'Web',
      domainColor: '#00E676',
      description: 'Hyperlocal digital news platform for Noida region with CMS backend.',
      testingTypes: ['Functional', 'Regression', 'Usability', 'Admin Panel', 'Mobile Responsiveness'],
      tools: ['JIRA', 'Lighthouse', 'Fiddler'],
      contributions: [
        'Tested article publishing and CMS workflows',
        'Validated user roles and permissions',
        'Mobile responsiveness across devices',
        'Search and filter functionality validation'
      ],
      impact: 'Improved content publishing reliability by identifying 10+ workflow bugs',
      category: 'Web'
    },
    {
      name: 'Shishka Sanchay',
      domain: 'EdTech / Desktop',
      platform: 'Electron',
      domainColor: '#7B61FF',
      description: 'Electron-based school management and billing software for institutions.',
      testingTypes: ['Functional', 'System', 'Regression', 'Performance', 'Desktop'],
      tools: ['JIRA', 'Bugzilla'],
      contributions: [
        'Tested billing workflow end-to-end',
        'Validated student record CRUD operations',
        'Report generation accuracy testing',
        'Desktop performance validation',
        'Data integrity across modules'
      ],
      impact: 'Ensured financial accuracy across all billing and fee collection workflows',
      category: 'Desktop'
    },
    {
      name: 'Abhiwan Portfolio Website',
      domain: 'Web / Corporate',
      platform: 'Web',
      domainColor: '#00D4FF',
      description: 'Corporate portfolio site for Abhiwan Technologies.',
      testingTypes: ['Functional', 'Usability', 'Performance', 'Cross-Browser', 'SEO Audit'],
      tools: ['Lighthouse', 'JIRA', 'Fiddler'],
      contributions: [
        'Full QA validation pass',
        'Performance audit with Lighthouse',
        'Cross-browser testing',
        'Delivered structured UX improvement recommendations adopted by dev team'
      ],
      impact: 'Improved Lighthouse performance score by 22 points post-recommendations',
      category: 'Web'
    }
  ];

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter(p => p.category === selectedFilter);

  return (
    <section id="projects" className="relative py-32 px-6 bg-[#0F1318]/30">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Projects Tested
          </h2>
          <p className="text-center text-[#7A8AA0] mb-12 max-w-2xl mx-auto">
            14+ real-world products tested across 7 domains
          </p>
        </FadeInSection>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2 rounded-full transition-all ${
                selectedFilter === filter
                  ? 'bg-[#00D4FF] text-[#0A0C10]'
                  : 'bg-[#0F1318] text-[#7A8AA0] border border-[#1C2130] hover:border-[#00D4FF]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <FadeInSection key={i}>
              <div
                className="bg-[#0F1318] border border-[#1C2130] rounded-lg p-6 hover:border-[#00D4FF] transition-all hover:scale-105 cursor-pointer"
                style={{ borderTopColor: project.domainColor, borderTopWidth: '3px' }}
                onClick={() => setSelectedProject(project)}
              >
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {project.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 rounded text-xs" style={{
                    backgroundColor: `${project.domainColor}20`,
                    color: project.domainColor
                  }}>
                    {project.domain}
                  </span>
                  <span className="px-2 py-1 rounded text-xs bg-[#1C2130] text-[#7A8AA0]">
                    {project.platform}
                  </span>
                </div>
                <p className="text-sm text-[#7A8AA0] mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-[#00D4FF] text-sm">
                  View Details <ChevronRight size={16} />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80" onClick={() => setSelectedProject(null)}>
          <motion.div
            className="bg-[#0F1318] border border-[#00D4FF] rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                {selectedProject.name}
              </h2>
              <button onClick={() => setSelectedProject(null)} className="text-[#7A8AA0] hover:text-[#00D4FF]">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded" style={{
                backgroundColor: `${selectedProject.domainColor}20`,
                color: selectedProject.domainColor
              }}>
                {selectedProject.domain}
              </span>
              <span className="px-3 py-1 rounded bg-[#1C2130] text-[#7A8AA0]">
                {selectedProject.platform}
              </span>
              <span className="px-3 py-1 rounded bg-[#00D4FF]/10 text-[#00D4FF]">
                QA Engineer (Sole)
              </span>
            </div>

            <p className="text-[#7A8AA0] mb-6">{selectedProject.description}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-[#00D4FF]">Testing Types</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.testingTypes.map((type, i) => (
                    <span key={i} className="px-3 py-1 bg-[#00D4FF]/10 border border-[#00D4FF] rounded text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-[#7B61FF]">Tools Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1 bg-[#7B61FF]/10 border border-[#7B61FF] rounded text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-[#00E676]">Key Contributions</h3>
                <ul className="space-y-2">
                  {selectedProject.contributions.map((contrib, i) => (
                    <li key={i} className="flex gap-2 text-[#7A8AA0]">
                      <span className="text-[#00E676]">•</span>
                      <span>{contrib}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-[#FFB300]">Impact / Outcome</h3>
                <p className="text-[#7A8AA0]">{selectedProject.impact}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

// Testing Domains Section
function TestingDomains() {
  const domains = [
    { icon: Gamepad2, title: 'Game Testing', description: 'Unity & Unreal Engine games, gameplay logic, physics, multiplayer sync, in-game economies, NFT mechanics', color: '#00D4FF' },
    { icon: Link2, title: 'Blockchain & Web3', description: 'NFT minting, crypto wallet flows, smart contract events, CNFT reward systems, DeFi game mechanics', color: '#FFB300' },
    { icon: Brain, title: 'AI & LLM Testing', description: 'Prompt accuracy, RAG pipeline validation, LLM response quality, AI pricing logic, contractor-matching flows', color: '#7B61FF' },
    { icon: Eye, title: 'AR/VR Testing', description: 'AR marker detection, VR environment navigation, headset compatibility, 3D rendering validation', color: '#00D4FF' },
    { icon: Globe, title: 'Web & Mobile', description: 'Functional, regression, cross-browser, responsive testing across web and Android/iOS apps', color: '#00E676' },
    { icon: Lock, title: 'Security Testing', description: 'OWASP ZAP scanning, DDoS simulation, vulnerability assessment, auth flow testing', color: '#FF3D3D' },
    { icon: Activity, title: 'Performance Testing', description: 'Load/stress testing with JMeter and k6, Lighthouse audits, Android profiling', color: '#FFB300' },
    { icon: GraduationCap, title: 'EdTech & Accessibility', description: 'Child-safe UX, localization, age-appropriate content validation, learning flow testing', color: '#7B61FF' },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Testing Domains
          </h2>
          <p className="text-center text-[#7A8AA0] mb-16 max-w-2xl mx-auto">
            Platforms and ecosystems I've battle-tested
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, i) => (
            <FadeInSection key={i}>
              <div className="bg-[#0F1318] border-t-4 rounded-lg p-6 hover:scale-105 transition-all" style={{ borderTopColor: domain.color }}>
                <domain.icon size={40} className="mb-4" style={{ color: domain.color }} />
                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Syne, sans-serif', color: domain.color }}>
                  {domain.title}
                </h3>
                <p className="text-sm text-[#7A8AA0]">{domain.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    {
      icon: '🧪',
      title: 'Freelance QA',
      description: 'One-off testing projects, feature testing, pre-launch QA',
      pricing: 'Project-based pricing',
      bestFor: 'Startups, indie developers, small teams'
    },
    {
      icon: '📋',
      title: 'Contract QA',
      description: 'Ongoing QA support for fixed duration (1–6 months)',
      pricing: 'Dedicated availability, integrated into your team',
      bestFor: 'Product companies, funded startups'
    },
    {
      icon: '⏱️',
      title: 'Part-Time QA',
      description: 'Regular part-time QA coverage (hourly or daily)',
      pricing: 'Flexible scheduling',
      bestFor: 'Early-stage products, side projects'
    },
    {
      icon: '🎯',
      title: 'Project-Based QA',
      description: 'Complete QA for a defined project or release',
      pricing: 'Full test plan → execution → sign-off',
      bestFor: 'Game releases, dApp launches, product v1s'
    },
    {
      icon: '💡',
      title: 'QA Consulting',
      description: 'QA strategy, process setup, tool selection',
      pricing: 'Test plan design, team guidance',
      bestFor: 'Companies building their QA function'
    }
  ];

  const specializations = [
    'Gaming', 'Blockchain', 'AI/LLM', 'AR/VR', 'Web', 'Mobile', 'Security', 'Performance'
  ];

  return (
    <section id="services" className="relative py-32 px-6 bg-[#0F1318]/30">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <FadeInSection>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#00E676] animate-pulse" />
            <span className="text-[#00E676] font-bold text-xl">AVAILABLE FOR HIRE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            QA Services
          </h2>
          <p className="text-center text-[#7A8AA0] mb-16 max-w-2xl mx-auto">
            Available for freelance, contract, and consulting engagements
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, i) => (
            <FadeInSection key={i}>
              <div className="bg-[#0F1318] border-l-4 border-[#00D4FF] rounded-lg p-6 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-[#7A8AA0] mb-4">{service.description}</p>
                <p className="text-sm text-[#00D4FF] mb-2">{service.pricing}</p>
                <p className="text-xs text-[#3D4F63] mb-4">Best for: {service.bestFor}</p>
                <button className="text-[#00D4FF] flex items-center gap-2 hover:gap-3 transition-all">
                  Get in Touch <ChevronRight size={16} />
                </button>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection>
          <p className="text-center text-[#7A8AA0] mb-4">I specialize in:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {specializations.map((spec, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-[#00D4FF]/10 border border-[#00D4FF] rounded-full text-sm hover:shadow-[0_0_12px_rgba(0,212,255,0.4)] transition-all"
              >
                {spec}
              </span>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// Education Section
function EducationSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ fontFamily: 'Syne, sans-serif' }}>
            Education & Certifications
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeInSection>
            <div className="bg-[#0F1318] border border-[#00D4FF] rounded-lg p-8">
              <div className="text-[#00D4FF] text-sm mb-2">EDUCATION</div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                B.Tech — Computer Science & Engineering
              </h3>
              <div className="text-[#7A8AA0] mb-4">
                Goel Institute of Technology and Management, Lucknow
              </div>
              <div className="flex gap-4 mb-6" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <span className="text-[#00E676]">Year: 2025</span>
                <span className="text-[#FFB300]">CGPA: 7.45</span>
              </div>
              <div className="bg-[#7B61FF]/10 border border-[#7B61FF] rounded p-4">
                <p className="text-sm text-[#7A8AA0]">
                  <strong className="text-[#7B61FF]">Research:</strong> JETIR2505617 — ML-Enabled Cancer Detection (May 2025)
                </p>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="bg-[#0F1318] border border-[#00E676] rounded-lg p-8">
              <div className="text-[#00E676] text-sm mb-2">TRAINING & CERTIFICATION</div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Software Testing Training
              </h3>
              <div className="text-[#7A8AA0] mb-4">
                QSPIDERS, Noida
              </div>
              <div className="mb-6" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <span className="text-[#00E676]">Jan 2025 – Jun 2025</span>
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {['Manual Testing', 'Test Case Design', 'Bug Reporting', 'Selenium WebDriver', 'Postman', 'JIRA', 'Agile'].map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-[#00E676]/10 border border-[#00E676] rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// Resume Section
function ResumeSection() {
  return (
    <section className="relative py-32 px-6 bg-[#0F1318]/30">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Want the full picture?
          </h2>
          <p className="text-[#7A8AA0] mb-12">
            Download my resume to see my complete experience, projects, and skills in one place.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-white rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all flex items-center gap-3 mx-auto mb-6">
            Download Resume (PDF) <Download size={20} />
          </button>
          <a href="https://linkedin.com/in/himanshu1125" target="_blank" rel="noopener noreferrer" className="text-[#7A8AA0] hover:text-[#00D4FF] flex items-center gap-2 justify-center transition-colors">
            Or view my LinkedIn profile <ExternalLink size={16} />
          </a>
        </FadeInSection>
      </div>
    </section>
  );
}

// Hire Me CTA
function HireMeCTA({ scrollToSection }: any) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 via-[#7B61FF]/20 to-transparent animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeInSection>
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            Let's Build Something<br/>Defect-Free.
          </h2>
          <p className="text-lg text-[#7A8AA0] mb-12 max-w-2xl mx-auto">
            I'm available for freelance QA, contract testing, part-time roles,
            and consulting engagements. Let's talk about how I can bring
            quality to your next product.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-[#00D4FF] text-[#0A0C10] rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all flex items-center gap-2"
            >
              Hire Me Now <ChevronRight size={20} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-[#7A8AA0] text-[#7A8AA0] rounded-lg font-bold text-lg hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all"
            >
              Let's Talk
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {['Freelance', 'Contract', 'Part-Time', 'Project-Based', 'Consulting'].map((type, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-[#00E676]">✓</span>
                <span className="text-[#7A8AA0]">{type}</span>
              </span>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Freelance QA',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ fontFamily: 'Syne, sans-serif' }}>
            Get In Touch
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12">
          <FadeInSection>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF] flex items-center justify-center">
                  <Phone size={20} className="text-[#00D4FF]" />
                </div>
                <div>
                  <div className="text-sm text-[#7A8AA0]">Phone</div>
                  <a href="tel:+917267037336" className="text-[#E8EDF5] hover:text-[#00D4FF]">+91-7267037336</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF] flex items-center justify-center">
                  <Mail size={20} className="text-[#00D4FF]" />
                </div>
                <div>
                  <div className="text-sm text-[#7A8AA0]">Email</div>
                  <a href="mailto:himanshusrivastava2511@gmail.com" className="text-[#E8EDF5] hover:text-[#00D4FF]">himanshusrivastava2511@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF] flex items-center justify-center">
                  <Linkedin size={20} className="text-[#00D4FF]" />
                </div>
                <div>
                  <div className="text-sm text-[#7A8AA0]">LinkedIn</div>
                  <a href="https://linkedin.com/in/himanshu1125" target="_blank" rel="noopener noreferrer" className="text-[#E8EDF5] hover:text-[#00D4FF]">linkedin.com/in/himanshu1125</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF] flex items-center justify-center">
                  <MapPin size={20} className="text-[#00D4FF]" />
                </div>
                <div>
                  <div className="text-sm text-[#7A8AA0]">Location</div>
                  <div className="text-[#E8EDF5]">Delhi, India (Open to remote worldwide)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-[#00E676]/10 border border-[#00E676] rounded-lg">
                <div className="w-3 h-3 rounded-full bg-[#00E676] animate-pulse" />
                <span className="text-[#00E676]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Available for opportunities
                </span>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-[#7A8AA0]">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0F1318] border border-[#1C2130] rounded-lg focus:border-[#00D4FF] focus:outline-none focus:shadow-[0_0_12px_rgba(0,212,255,0.2)] transition-all text-[#E8EDF5]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#7A8AA0]">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0F1318] border border-[#1C2130] rounded-lg focus:border-[#00D4FF] focus:outline-none focus:shadow-[0_0_12px_rgba(0,212,255,0.2)] transition-all text-[#E8EDF5]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#7A8AA0]">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0F1318] border border-[#1C2130] rounded-lg focus:border-[#00D4FF] focus:outline-none focus:shadow-[0_0_12px_rgba(0,212,255,0.2)] transition-all text-[#E8EDF5]"
                >
                  <option value="Freelance QA">Freelance QA</option>
                  <option value="Contract Role">Contract Role</option>
                  <option value="Full-Time Role">Full-Time Role</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#7A8AA0]">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 bg-[#0F1318] border border-[#1C2130] rounded-lg focus:border-[#00D4FF] focus:outline-none focus:shadow-[0_0_12px_rgba(0,212,255,0.2)] transition-all text-[#E8EDF5] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-[#00D4FF] text-[#0A0C10] rounded-lg font-bold hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                Send Message <ChevronRight size={18} />
              </button>
            </form>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer({ scrollToSection }: any) {
  return (
    <footer className="relative py-12 px-6 border-t border-[#1C2130]">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-bold text-lg mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              Himanshu Srivastava
            </div>
            <div className="text-sm text-[#7A8AA0]">QA Engineer & SDET</div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            {['About', 'Skills', 'Experience', 'Projects', 'Services', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[#7A8AA0] hover:text-[#00D4FF] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex gap-4 md:justify-end">
            <a href="https://linkedin.com/in/himanshu1125" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0F1318] border border-[#1C2130] flex items-center justify-center hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all">
              <Linkedin size={18} />
            </a>
            <a href="mailto:himanshusrivastava2511@gmail.com" className="w-10 h-10 rounded-full bg-[#0F1318] border border-[#1C2130] flex items-center justify-center hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-[#3D4F63] pt-8 border-t border-[#1C2130]">
          © 2025 Himanshu Srivastava · Built for quality, designed with purpose
        </div>
      </div>
    </footer>
  );
}

// Utility Components
function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
