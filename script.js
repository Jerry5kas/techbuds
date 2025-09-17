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
    setupRealTimeData();
    setupClientInteractions();
    setupTestimonialInteractions();
    setupModernInteractions();
    optimizePerformance();
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
        
        // Add phone number formatting
        const phoneInput = contactForm.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Format phone number as user types
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    e.target.value = value;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('border-red-500', 'focus:ring-red-500');
    field.classList.add('border-white/20', 'focus:ring-primary');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    if (!isValid) {
        field.classList.remove('border-white/20', 'focus:ring-primary');
        field.classList.add('border-red-500', 'focus:ring-red-500');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-400 text-sm mt-1';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// Clear field error on input
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('border-red-500', 'focus:ring-red-500');
    field.classList.add('border-white/20', 'focus:ring-primary');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Handle form submission with Formspree
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate all fields before submission
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
        const isValid = validateField({ target: input });
        if (!isValid) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showErrorMessage('Please fill in all required fields correctly.');
        return;
    }
    
    const formData = new FormData(form);
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75');
    
    try {
        // Submit to Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showSuccessMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
            form.reset();
        } else {
            const data = await response.json();
            if (data.errors) {
                showErrorMessage('Please check your form and try again.');
            } else {
                showErrorMessage('Sorry, there was an error sending your message. Please try again.');
            }
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75');
    }
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
    
    // Initialize with all projects visible
    portfolioItems.forEach(item => {
        item.style.display = 'block';
    });
    
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
            
            // Filter projects with smooth animation
            portfolioItems.forEach((item, index) => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    // Show item with staggered animation
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100); // Staggered delay
                } else {
                    // Hide item with fade out
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Log filter action for debugging
            console.log(`Filter applied: ${filter}`);
            const visibleItems = Array.from(portfolioItems).filter(item => 
                item.style.display !== 'none'
            );
            console.log(`Visible projects: ${visibleItems.length}`);
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === '1') {
            filterButtons[0].click(); // All Projects
        } else if (e.key === '2') {
            filterButtons[1].click(); // Web Apps
        } else if (e.key === '3') {
            filterButtons[2].click(); // Mobile Apps
        } else if (e.key === '4') {
            filterButtons[3].click(); // E-commerce
        }
    });
    
    // Debug function to check project categories
    function debugProjectCategories() {
        console.log('=== Portfolio Project Categories ===');
        portfolioItems.forEach((item, index) => {
            const title = item.querySelector('h3')?.textContent || 'Unknown';
            const category = item.getAttribute('data-category');
            console.log(`Project ${index + 1}: ${title} - Category: ${category}`);
        });
    }
    
    // Call debug function on load
    debugProjectCategories();
}

// Particle Effects Setup
function setupParticleEffects() {
    // Particle effects are initialized in the HTML file
    // This function can be used for additional particle customization
    console.log('Particle effects initialized');
}

// Real-time Data Updates
function setupRealTimeData() {
    // Animate statistics on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all counter elements
    const counters = document.querySelectorAll('#projectsCompleted, #satisfactionRate, #responseTime, #uptime, #clientCount, #countryCount');
    counters.forEach(counter => {
        statsObserver.observe(counter);
    });

    // Simulate real-time updates every 30 seconds
    setInterval(updateRealTimeStats, 30000);
}

// Animate counter numbers
function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const isHours = target.includes('hrs');
    const isUptime = target.includes('.');
    
    let finalNumber;
    if (isPercentage) {
        finalNumber = parseInt(target.replace('%', ''));
    } else if (isPlus) {
        finalNumber = parseInt(target.replace('+', ''));
    } else if (isHours) {
        finalNumber = parseInt(target.replace('hrs', ''));
    } else if (isUptime) {
        finalNumber = parseFloat(target.replace('%', ''));
    } else {
        finalNumber = parseInt(target);
    }

    let current = 0;
    const increment = finalNumber / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        
        let displayValue;
        if (isUptime) {
            displayValue = current.toFixed(1) + '%';
        } else if (isPercentage) {
            displayValue = Math.floor(current) + '%';
        } else if (isPlus) {
            displayValue = Math.floor(current) + '+';
        } else if (isHours) {
            displayValue = Math.floor(current) + 'hrs';
        } else {
            displayValue = Math.floor(current);
        }
        
        element.textContent = displayValue;
    }, 30);
}

// Update real-time statistics
function updateRealTimeStats() {
    // Simulate small variations in stats
    const projectsElement = document.getElementById('projectsCompleted');
    const satisfactionElement = document.getElementById('satisfactionRate');
    const responseElement = document.getElementById('responseTime');
    const uptimeElement = document.getElementById('uptime');
    
    if (projectsElement) {
        const currentProjects = parseInt(projectsElement.textContent.replace('+', ''));
        const newProjects = currentProjects + Math.floor(Math.random() * 3);
        projectsElement.textContent = newProjects + '+';
    }
    
    if (satisfactionElement) {
        const currentSatisfaction = parseInt(satisfactionElement.textContent.replace('%', ''));
        const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newSatisfaction = Math.max(95, Math.min(100, currentSatisfaction + variation));
        satisfactionElement.textContent = newSatisfaction + '%';
    }
    
    if (responseElement) {
        const currentResponse = parseInt(responseElement.textContent.replace('hrs', ''));
        const variation = Math.floor(Math.random() * 3) - 1;
        const newResponse = Math.max(1, Math.min(4, currentResponse + variation));
        responseElement.textContent = newResponse + 'hrs';
    }
    
    if (uptimeElement) {
        const currentUptime = parseFloat(uptimeElement.textContent.replace('%', ''));
        const variation = (Math.random() * 0.2) - 0.1; // -0.1 to 0.1
        const newUptime = Math.max(99.5, Math.min(100, currentUptime + variation));
        uptimeElement.textContent = newUptime.toFixed(1) + '%';
    }
}

// Enhanced Client Card Interactions
function setupClientInteractions() {
    const clientCards = document.querySelectorAll('#clients .group');
    
    clientCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
        
        // Add click interaction for future expansion
        card.addEventListener('click', function() {
            const companyName = this.querySelector('h4').textContent;
            console.log(`Clicked on ${companyName} - Future: Show detailed case study`);
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced Testimonial Interactions
function setupTestimonialInteractions() {
    const testimonialCards = document.querySelectorAll('#testimonials .group');
    
    testimonialCards.forEach(card => {
        // Add staggered animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
        
        // Add hover effects for quote icons
        const quoteIcon = card.querySelector('.absolute.top-6.right-6');
        if (quoteIcon) {
            card.addEventListener('mouseenter', function() {
                quoteIcon.style.opacity = '0.4';
                quoteIcon.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                quoteIcon.style.opacity = '0.2';
                quoteIcon.style.transform = 'scale(1)';
            });
        }
    });
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
    
    // Optimize font loading performance
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            console.log('Fonts loaded successfully');
        });
    }
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

