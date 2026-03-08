/* ── script.js ── Hemant Sardana Portfolio */

/* ─── Dark / Light Mode Toggle ─── */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

// Always default to dark mode on initial load
const savedTheme = 'dark';
html.setAttribute('data-theme', savedTheme);
localStorage.setItem('hs-theme', 'dark');

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('hs-theme', next);
});

/* ─── Navbar Scroll Effect ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── Hamburger Mobile Menu ─── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ─── Intersection Observer: Reveal on Scroll ─── */
const revealElements = document.querySelectorAll(
  '.project-card, .cert-card, .skill-item, .contact-card, .about-grid, .stat-card, .achievement-card'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger reveal
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (i % 6) * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

/* ─── Section Header Reveal ─── */
const sectionHeaders = document.querySelectorAll('.section-header');
const headerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        headerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

sectionHeaders.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  headerObserver.observe(el);
});

/* ─── Smooth Cursor Parallax on Hero Orbs ─── */
const orbs = document.querySelectorAll('.hero-orb');
let mouseX = 0, mouseY = 0;
let currentX = [0, 0, 0], currentY = [0, 0, 0];
const speeds = [0.015, 0.025, 0.02];
const directions = [[1, 1], [-1, 1], [1, -1]];

document.getElementById('hero').addEventListener('mousemove', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  mouseX = (e.clientX - rect.left - rect.width / 2);
  mouseY = (e.clientY - rect.top - rect.height / 2);
});

function animateOrbs() {
  orbs.forEach((orb, i) => {
    currentX[i] += (mouseX * speeds[i] * directions[i][0] - currentX[i]) * 0.08;
    currentY[i] += (mouseY * speeds[i] * directions[i][1] - currentY[i]) * 0.08;
    orb.style.transform = `translate(${currentX[i]}px, ${currentY[i]}px)`;
  });
  requestAnimationFrame(animateOrbs);
}
animateOrbs();

/* ─── Active Nav Link Highlight ─── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY;
  const viewportMid = scrollY + window.innerHeight * 0.35;

  let currentId = '';
  sections.forEach(section => {
    if (section.offsetTop <= viewportMid) {
      currentId = section.getAttribute('id');
    }
  });

  navItems.forEach(a => {
    a.style.color = '';
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${currentId}`) {
      a.style.color = 'var(--text)';
      a.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ─── Typing animation for hero title (subtle) ─── */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.style.opacity = '0';
  setTimeout(() => {
    heroTitle.style.transition = 'opacity 0.6s ease';
    heroTitle.style.opacity = '1';
  }, 350);
}

/* ─── Project card tilt on hover ─── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── About Card Stack Parallax ─── */
const aboutStack = document.querySelector('.about-card-stack');
if (aboutStack) {
  aboutStack.addEventListener('mousemove', (e) => {
    const rect = aboutStack.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update CSS variables for the spotlight effect
    const cards = aboutStack.querySelectorAll('.about-card');
    cards.forEach(card => {
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    // Suble tilt for the whole container
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    aboutStack.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  aboutStack.addEventListener('mouseleave', () => {
    aboutStack.style.transform = '';
  });
}

/* ─── Stats counter animation ─── */
function animateCounter(el, target, suffix = '') {
  const duration = 1500;
  const start = performance.now();

  function step(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease out cubic

    if (typeof target === 'number') {
      el.textContent = Math.round(ease * target) + suffix;
    }
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.getAttribute('data-count');
        if (text) animateCounter(el, parseInt(text), el.getAttribute('data-suffix') || '');
        statsObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-number').forEach(el => {
  const text = el.textContent.trim();
  if (text === '10+') {
    el.setAttribute('data-count', '10');
    el.setAttribute('data-suffix', '+');
    el.textContent = '0+';
    statsObserver.observe(el);
  } else if (text === '4+') {
    el.setAttribute('data-count', '4');
    el.setAttribute('data-suffix', '+');
    el.textContent = '0+';
    statsObserver.observe(el);
  } else if (text === '5+') {
    el.setAttribute('data-count', '5');
    el.setAttribute('data-suffix', '+');
    el.textContent = '0+';
    statsObserver.observe(el);
  }
});

/* ─── Achievement Modal Logic ─── */
const modalData = {
  infosys: {
    icon: '🎯',
    title: 'iOS Development Intern — 3rd Place National',
    org: 'Infosys Limited',
    content: `
      <div class="modal-detail-item"><strong>🏆 National Rank:</strong> Secured 3rd Place among 100+ intern teams across India.</div>
      <div class="modal-detail-item"><strong>🛠️ Role/Tech:</strong> Team Lead & iOS Developer (Swift, SwiftUI, MapKit, CoreLocation, API Integration).</div>
      <div class="modal-detail-item"><strong>📈 Impact:</strong> Led a team of 10 developers to build 'FleetTrack', a production-ready fleet management system for real-time logistics tracking.</div>
      <div class="modal-detail-item"><strong>👨‍🚀 Leadership:</strong> Optimized delivery timelines by serving as Scrum Master and managing the full product development lifecycle.</div>
    `
  },
  vishwakarma: {
    icon: '🏆',
    title: 'Vishwakarma Awards — Top 6 Finalist',
    org: 'IIT Hyderabad',
    content: `
      <div class="modal-detail-item"><strong>🏆 Achievement:</strong> National Top 6 Finalist at the prestigious Vishwakarma Awards.</div>
      <div class="modal-detail-item"><strong>🛠️ Role/Tech:</strong> Innovation Lead (IoT, pH/TDS Sensors, Custom iOS Dashboard).</div>
      <div class="modal-detail-item"><strong>📈 Result:</strong> Developed 'Hydro Harvesters', an automated hydroponic system reducing water usage by 80%.</div>
    `
  },
  ideathon: {
    icon: '💡',
    title: '2nd Place — Ideathon',
    org: 'CGC Jhanjheri',
    content: `
      <div class="modal-detail-item"><strong>🏆 Achievement:</strong> 2nd Place Winner among numerous national competing teams.</div>
      <div class="modal-detail-item"><strong>🛠️ Role/Tech:</strong> Product Strategist (Scalable Tech Models, Business Pitching).</div>
      <div class="modal-detail-item"><strong>📈 Result:</strong> Presented a transformative tech-driven solution for industrial automation bottlenecks.</div>
    `
  },
  ackathon: {
    icon: '💻',
    title: '1st Place — Ackathon',
    org: 'Chitkara University',
    content: `
      <div class="modal-detail-item"><strong>🏆 Achievement:</strong> 1st Place Champion in a high-intensity 48-hour coding marathon.</div>
      <div class="modal-detail-item"><strong>🛠️ Role/Tech:</strong> iOS Lead (SwiftUI, Firebase, Rapid Prototyping).</div>
      <div class="modal-detail-item"><strong>📈 Result:</strong> Engineered a fully functional MVP with seamless UX and real-time backend integration.</div>
    `
  },
  sustainathon: {
    icon: '🌱',
    title: '1st Place — Sustainathon',
    org: 'Chitkara University',
    content: `
      <div class="modal-detail-item"><strong>🏆 Achievement:</strong> 1st Place Winner for technical innovation in sustainability.</div>
      <div class="modal-detail-item"><strong>🛠️ Role/Tech:</strong> Solution Architect (Data Analytics, Carbon Footprint Tracking).</div>
      <div class="modal-detail-item"><strong>📈 Result:</strong> Developed a waste-reduction platform with practical, measurable environmental impact.</div>
    `
  },
  opengarage: {
    icon: '🏠',
    title: '1st Place — Open Garage',
    org: 'Chitkara University',
    content: `
      <div class="modal-detail-item"><strong>🏆 Achievement:</strong> 1st Place Winner in the Open Garage innovation track.</div>
      <div class="modal-detail-item"><strong>🛠️ Role/Tech:</strong> Hardware-Software Specialist (IoT integration, Rapid Prototyping).</div>
      <div class="modal-detail-item"><strong>📈 Result:</strong> Built a unique tool addressing industrial automation through innovative hardware-software sync.</div>
    `
  },
  fleettrack: {
    icon: '🚗',
    title: 'FleetTrack',
    org: 'Fleet Management App',
    content: `
      <div class="modal-detail-item"><strong>🏆 Highlight:</strong> Top 3 @ Infosys — Ranked 3rd among 100+ national intern teams.</div>
      <div class="modal-detail-item"><strong>🛠️ Tech Stack:</strong> SwiftUI, MapKit, CoreLocation, REST APIs, Firebase</div>
      <div class="modal-detail-item"><strong>👨‍💼 Role:</strong> Team Lead & iOS Developer — managed a team of 10 engineers across the full development lifecycle.</div>
      <div class="modal-detail-item"><strong>📈 Overview:</strong> A production-ready mobile platform for real-time vehicle tracking, driver behaviour monitoring, route optimisation, and fleet analytics. Designed to serve logistics and delivery use cases at enterprise scale.</div>
      <div class="modal-detail-item"><strong>✨ Key Features:</strong> Live GPS tracking on interactive maps, driver trip history, automated alert notifications, analytics dashboard, and admin controls for fleet managers.</div>
      <div class="modal-detail-item"><strong>🔗 Links:</strong> <a href="https://github.com/EknoorChitkara/FleetTrack" target="_blank">GitHub Repository</a></div>
    `
  },
  clubhub: {
    icon: '🏫',
    title: 'ClubHub',
    org: 'University Platform · Technix iOS App',
    content: `
      <div class="modal-detail-item"><strong>🛠️ Tech Stack:</strong> Swift, UIKit, Firebase, REST APIs</div>
      <div class="modal-detail-item"><strong>👨‍💼 Role:</strong> iOS Developer — responsible for UI architecture, API integration, and real-time data handling.</div>
      <div class="modal-detail-item"><strong>📈 Overview:</strong> A comprehensive campus engagement iOS application that connects students with university clubs, events, and announcements in real time. Built to streamline club management and boost student participation.</div>
      <div class="modal-detail-item"><strong>✨ Key Features:</strong> Club discovery & registration, event scheduling, real-time push notifications, member management panel, and an admin dashboard for club coordinators.</div>
      <div class="modal-detail-item"><strong>🔗 Links:</strong> <a href="https://github.com/iOS-DC/technix-iOS-app" target="_blank">GitHub Repository</a></div>
    `
  },
  smartspend: {
    icon: '💰',
    title: 'SmartSpend Buddy',
    org: 'Finance UI/UX · Kids App',
    content: `
      <div class="modal-detail-item"><strong>🛠️ Tech Stack:</strong> SwiftUI, Combine, Core Data, Charts framework</div>
      <div class="modal-detail-item"><strong>👨‍💼 Role:</strong> Lead iOS Developer — designed the full UI/UX and implemented all game-like interactions and financial logic.</div>
      <div class="modal-detail-item"><strong>📈 Overview:</strong> An interactive personal finance learning app built for children and teenagers. Gamifies budgeting, saving goals, and spending habits with visually engaging UI components to make money management fun and educational.</div>
      <div class="modal-detail-item"><strong>✨ Key Features:</strong> Animated spending tracker, savings goal jars, budget challenge mini-games, parent mode with spending controls, and progress rewards system.</div>
      <div class="modal-detail-item"><strong>🔗 Links:</strong> <a href="https://github.com/hemant2416/SmartSpendBuddy" target="_blank">GitHub Repository</a></div>
    `
  },
  hydro: {
    icon: '🌱',
    title: 'Hydro Harvesters',
    org: 'Smart Systems · IoT',
    content: `
      <div class="modal-detail-item"><strong>🏆 Highlight:</strong> National Top 6 Finalist at the Vishwakarma Awards, IIT Hyderabad.</div>
      <div class="modal-detail-item"><strong>🛠️ Tech Stack:</strong> Node.js, MQTT, Raspberry Pi, pH/TDS Sensors, MongoDB, Custom iOS Dashboard</div>
      <div class="modal-detail-item"><strong>👨‍💼 Role:</strong> Innovation Lead — architected the server-side data pipeline and IoT sensor communication layer.</div>
      <div class="modal-detail-item"><strong>📈 Overview:</strong> An automated hydroponic farming system that monitors and controls nutrient levels, water pH, and ambient conditions using IoT sensors. Reduces water consumption by up to 80% compared to traditional farming methods.</div>
      <div class="modal-detail-item"><strong>✨ Key Features:</strong> Real-time sensor data streaming, automated nutrient dispenser control, mobile dashboard for remote monitoring, historical data graphs, and alert thresholds for critical readings.</div>
      <div class="modal-detail-item"><strong>🔗 Links:</strong> <a href="https://github.com/KrishivDawra/The-Hydro-Harvesters" target="_blank">GitHub Repository</a></div>
    `
  },
  hometalk: {
    icon: '🏠',
    title: 'HomeTalk',
    org: 'Smart Home Automation Backend',
    content: `
      <div class="modal-detail-item"><strong>🛠️ Tech Stack:</strong> Node.js, Express.js, ESP8266, MQTT, WebSockets, SQLite</div>
      <div class="modal-detail-item"><strong>👨‍💼 Role:</strong> Backend Engineer — built the centralised command hub and device communication protocol.</div>
      <div class="modal-detail-item"><strong>📈 Overview:</strong> A centralised smart home automation bridge that connects and orchestrates multiple IoT devices. Handles concurrent commands, maintains device state persistence, and provides a unified API for controlling all connected home appliances.</div>
      <div class="modal-detail-item"><strong>✨ Key Features:</strong> Multi-device command scheduling, real-time device status via WebSockets, voice command integration hooks, scene automation (e.g., "Good Night" mode), and a REST API for third-party integrations.</div>
      <div class="modal-detail-item"><strong>🔗 Links:</strong> <a href="https://github.com/KrishivDawra/HomeTalk" target="_blank">GitHub Repository</a></div>
    `
  },
  gromore: {
    icon: '📈',
    title: 'Gromore',
    org: 'Backend Architecture · SaaS',
    content: `
      <div class="modal-detail-item"><strong>🛠️ Tech Stack:</strong> Node.js, Express.js, MongoDB, JWT Auth, REST APIs, Mongoose</div>
      <div class="modal-detail-item"><strong>👨‍💼 Role:</strong> Backend Developer — designed the database schema, API structure, and authentication system.</div>
      <div class="modal-detail-item"><strong>📈 Overview:</strong> A robust and scalable backend infrastructure for a growth-focused SaaS platform. Handles high-throughput data processing, secure user authentication, role-based access control, and scalable database management designed to grow with the product.</div>
      <div class="modal-detail-item"><strong>✨ Key Features:</strong> JWT-based authentication & refresh tokens, modular REST API design, rate-limiting & input sanitisation, MongoDB aggregation pipelines for analytics, and environment-based config management.</div>
      <div class="modal-detail-item"><strong>🔗 Links:</strong> <a href="https://github.com/KrishivDawra/GroMore" target="_blank">GitHub Repository</a></div>
    `
  },
  h3music: {
    icon: '🎵',
    title: 'H3 Music Player',
    org: 'Web Audio Application · Frontend',
    content: `
      <div class="modal-detail-item"><strong>🛠️ Tech Stack:</strong> HTML5, CSS3, Vanilla JavaScript, Web Audio API</div>
      <div class="modal-detail-item"><strong>👨‍💼 Role:</strong> Frontend Developer — built the entire UI, audio engine integration, and playlist management from scratch.</div>
      <div class="modal-detail-item"><strong>📈 Overview:</strong> A feature-rich, browser-based music player built entirely with vanilla web technologies. Delivers a smooth, app-like listening experience with custom audio controls, dynamic playlist management, and a polished visual interface — no frameworks needed.</div>
      <div class="modal-detail-item"><strong>✨ Key Features:</strong> Custom audio seek bar & volume control, playlist queue with drag-to-reorder, album art display, shuffle & repeat modes, keyboard shortcut support, and responsive layout for all screen sizes.</div>
      <div class="modal-detail-item"><strong>🔗 Links:</strong> <a href="https://github.com/HimanshiJolly/Music-player-website" target="_blank">GitHub Repository</a></div>
    `
  },
  oorja: {
    icon: '⚡',
    title: 'Oorja',
    org: 'Interactive Web Platform · Frontend',
    content: `
      <div class="modal-detail-item"><strong>🛠️ Tech Stack:</strong> React.js, Tailwind CSS, Framer Motion, Vite</div>
      <div class="modal-detail-item"><strong>👨‍💼 Role:</strong> Frontend Developer — led UI design, component architecture, and animation implementation.</div>
      <div class="modal-detail-item"><strong>📈 Overview:</strong> A highly interactive and visually dynamic web platform focused on delivering premium user experiences. Built with performance and delight in mind — featuring smooth page transitions, micro-animations, and a fully responsive layout across all devices.</div>
      <div class="modal-detail-item"><strong>✨ Key Features:</strong> Page transition animations with Framer Motion, reusable component library, mobile-first responsive design, optimised Lighthouse performance scores, and a clean modern design system.</div>
      <div class="modal-detail-item"><strong>🔗 Links:</strong> <a href="https://github.com/KrishivDawra/Oorja" target="_blank">GitHub Repository</a></div>
    `
  },
  bedbuddy: {
    icon: '🏥',
    title: 'BedBuddy',
    org: 'Healthcare Management · Web App',
    content: `
      <div class="modal-detail-item"><strong>🛠️ Tech Stack:</strong> React.js, JavaScript, Node.js, Express, MongoDB</div>
      <div class="modal-detail-item"><strong>👨‍💼 Role:</strong> Full Stack Developer — built the allocation algorithm, real-time dashboard UI, and backend APIs.</div>
      <div class="modal-detail-item"><strong>📈 Overview:</strong> A real-time hospital bed management platform that optimises bed allocation during emergencies and high-demand periods. Helps hospital staff make faster, data-driven decisions by providing a live view of bed availability, patient status, and ward capacity.</div>
      <div class="modal-detail-item"><strong>✨ Key Features:</strong> Live bed availability dashboard, automated allocation suggestions, ward-wise capacity view, patient admission & discharge tracking, role-based access for staff vs. admins, and emergency priority queue.</div>
      <div class="modal-detail-item"><strong>🔗 Links:</strong> <a href="https://github.com/kartik941/BedBuddy" target="_blank">GitHub Repository</a></div>
    `
  }
};
const modal = document.getElementById('achievement-modal');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalOrg = document.getElementById('modal-org');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.achievement-card, .project-card.project-clickable').forEach(card => {
  card.addEventListener('click', (e) => {
    // If we click on a link, don't open the modal
    if (e.target.closest('a')) return;

    const id = card.getAttribute('data-modal');
    const data = modalData[id];

    if (data) {
      modalIcon.textContent = data.icon || '🏆';
      modalTitle.textContent = data.title;
      modalOrg.textContent = data.org || 'Project Details';
      modalBody.innerHTML = data.content;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop scrolling
    }
  });
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Resume scrolling
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

console.log('%c Hemant Sardana Portfolio 🚀', 'color: #0071e3; font-size: 18px; font-weight: bold;');
