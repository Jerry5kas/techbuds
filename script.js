// TechBuds JavaScript functionality - Modern & Enhanced

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    setupNavigation();
    setupScrollAnimations();
    setupContactForm();
    setupMobileMenu();
    setupSmoothScrolling();
    setupIntersectionObserver();
    setupPortfolioFilter();
    setupParticleEffects();
    setupModernInteractions();
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu a');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            }
        });
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for scroll animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll animations setup
function setupScrollAnimations() {
    // Add animate-on-scroll class to elements that should animate
    const elementsToAnimate = document.querySelectorAll(
        '.grid > div, .text-center, .space-y-6 > div, .space-y-8 > div'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-loading');
    
    try {
        // Simulate API call (replace with actual API endpoint)
        const response = await simulateAPICall(formData);
        
        if (response.success) {
            showSuccessMessage('Thank you! Your message has been sent successfully.');
            form.reset();
        } else {
            showErrorMessage('Sorry, there was an error sending your message. Please try again.');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
    }
}

// Simulate API call (replace with actual API integration)
function simulateAPICall(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate successful response
            resolve({ success: true });
        }, 2000);
    });
}

// Show success message
function showSuccessMessage(message) {
    const form = document.getElementById('contact-form');
    const existingMessage = form.querySelector('.success-message, .error-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    form.appendChild(successDiv);
    
    // Trigger animation
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 100);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 5000);
}

// Show error message
function showErrorMessage(message) {
    const form = document.getElementById('contact-form');
    const existingMessage = form.querySelector('.success-message, .error-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    form.appendChild(errorDiv);
    
    // Trigger animation
    setTimeout(() => {
        errorDiv.classList.add('show');
    }, 100);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        errorDiv.classList.remove('show');
        setTimeout(() => {
            errorDiv.remove();
        }, 300);
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization: Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-secondary transition-all duration-300 opacity-0 pointer-events-none z-50';
    scrollToTopBtn.id = 'scroll-to-top';
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    }, 100));
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
    addScrollToTop();
});

// API Integration Example (for future use)
class APIService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
    
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

// Example usage for future API integration:
// const api = new APIService('https://your-api-endpoint.com');
// 
// // In your form submission:
// const response = await api.post('/contact', {
//     name: formData.get('name'),
//     email: formData.get('email'),
//     message: formData.get('message')
// });

// Portfolio Filter Functionality
function setupPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-white', 'text-gray-600');
            });
            
            // Add active class to clicked button
            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('bg-white', 'text-gray-600');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach((item, index) => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.5s ease-out';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Particle Effects Setup
function setupParticleEffects() {
    // Particle effects are initialized in the HTML file
    // This function can be used for additional particle customization
    console.log('Particle effects initialized');
}

// Modern Interactions
function setupModernInteractions() {
    // Add modern hover effects to cards
    const cards = document.querySelectorAll('.modern-card, .portfolio-item, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
}

// Ripple Effect Function
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced Scroll Animations
function setupEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.animate-stagger');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements with enhanced animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-stagger');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
    setupEnhancedScrollAnimations();
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        APIService,
        debounce,
        throttle,
        setupPortfolioFilter,
        createRippleEffect,
        optimizePerformance
    };
}

