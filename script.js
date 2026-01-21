// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ========== ACTIVE NAVIGATION INDICATOR ==========
const navIndicator = document.querySelector('.nav-indicator');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  let currentActive = '';
  const navHeight = document.querySelector('.nav').offsetHeight;
  
  // Find which section is in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      currentActive = section.getAttribute('id');
    }
  });
  
  // Update active link styles and indicator position
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    if (link.getAttribute('href') === `#${currentActive}`) {
      link.classList.add('active');
      
      // Position indicator under active link
      if (navIndicator && window.innerWidth >= 768) {
        const linkRect = link.getBoundingClientRect();
        const navRect = document.querySelector('.nav-links').getBoundingClientRect();
        
        navIndicator.style.width = linkRect.width + 'px';
        navIndicator.style.left = (linkRect.left - navRect.left) + 'px';
      }
    }
  });
}

// Update indicator on scroll
window.addEventListener('scroll', updateActiveLink);

// Initialize indicator on page load
window.addEventListener('load', updateActiveLink);

// Update indicator on resize
window.addEventListener('resize', updateActiveLink);

// ========== HAMBURGER MENU END ==========

// Glowing Cursor Trail Effect
let lastTrailTime = 0;
const trailDelay = 30; // Milliseconds between trail particles

document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();
  
  if (currentTime - lastTrailTime > trailDelay) {
    createCursorTrail(e.clientX, e.clientY);
    lastTrailTime = currentTime;
  }
});

function createCursorTrail(x, y) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  
  // Random size between 4-10px for variation
  const size = Math.random() * 6 + 4;
  trail.style.width = size + 'px';
  trail.style.height = size + 'px';
  
  // Offset from cursor for spread effect
  const offsetX = (Math.random() - 0.5) * 20;
  const offsetY = (Math.random() - 0.5) * 20;
  
  trail.style.left = (x + offsetX - size / 2) + 'px';
  trail.style.top = (y + offsetY - size / 2) + 'px';
  
  document.body.appendChild(trail);
  
  // Remove after animation completes
  setTimeout(() => {
    trail.remove();
  }, 1000);
}

// Resume Modal Functionality
const resumeBtn = document.getElementById('resume-btn');
const resumeModal = document.getElementById('resume-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalOverlay = document.querySelector('.modal-overlay');

if (resumeBtn && resumeModal) {
  resumeBtn.addEventListener('click', () => {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Animated Background - Subtle Mouse Movement Parallax
const animatedBg = document.querySelector('.animated-background');
if (animatedBg) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    
    animatedBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for Fade-up Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all elements with fade-up class
document.querySelectorAll('.fade-up').forEach(element => {
  observer.observe(element);
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };
    
    console.log('Form submitted:', formData);
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  const navHeight = document.querySelector('.nav').offsetHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 50;
    const sectionHeight = section.offsetHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--foreground)';
    }
  });
});

// Navbar Background on Scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.boxShadow = 'var(--shadow-md)';
  } else {
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Parallax Effect for Hero Image
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    heroImage.style.transform = `translateY(${rate}px)`;
  });
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Image Loading with Fade-in
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.5s ease';
  
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });
  
  // If image is already loaded (cached)
  if (img.complete) {
    img.style.opacity = '1';
  }
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Button Click Animations
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Scroll to Top functionality (optional)
let scrollToTopBtn;

function createScrollToTopButton() {
  scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  `;
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--primary);
    color: var(--primary-foreground);
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    transition: all 0.3s ease;
    z-index: 999;
  `;
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-4px)';
    scrollToTopBtn.style.boxShadow = 'var(--shadow-xl)';
  });
  
  scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = 'var(--shadow-lg)';
  });
  
  document.body.appendChild(scrollToTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollToTopBtn.style.display = 'flex';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });
}

// Initialize scroll to top button
createScrollToTopButton();

// Form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
  input.addEventListener('blur', function() {
    if (this.value.trim() === '' && this.hasAttribute('required')) {
      this.style.borderColor = 'hsl(0, 72%, 55%)';
    } else {
      this.style.borderColor = 'var(--border)';
    }
  });
  
  input.addEventListener('input', function() {
    if (this.style.borderColor === 'hsl(0, 72%, 55%)') {
      this.style.borderColor = 'var(--border)';
    }
  });
});

// Email validation
const emailInput = document.getElementById('email');
if (emailInput) {
  emailInput.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value) && this.value !== '') {
      this.style.borderColor = 'hsl(0, 72%, 55%)';
    }
  });
}

// Lazy loading for images (optional enhancement)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add animation delay to multiple fade-up elements
const fadeUpElements = document.querySelectorAll('.fade-up');
fadeUpElements.forEach((element, index) => {
  element.style.animationDelay = `${index * 0.1}s`;
});

// Console welcome message
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #9333ea;');
console.log('%cLike what you see? Let\'s connect!', 'font-size: 14px; color: #6b21a8;');
console.log('%c📧 hello@johndoe.com', 'font-size: 12px; color: #a855f7;');
