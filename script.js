// Modal Functions
function openForm(formType) {
    const modal = document.getElementById('formModal');
    const clarityForm = document.getElementById('clarityForm');
    const growthForm = document.getElementById('growthForm');
    const contentForm = document.getElementById('contentForm');
    const consultationForm = document.getElementById('consultationForm');

    // Hide all forms
    clarityForm.style.display = 'none';
    growthForm.style.display = 'none';
    contentForm.style.display = 'none';
    consultationForm.style.display = 'none';

    // Show selected form
    if (formType === 'clarity') {
        clarityForm.style.display = 'block';
    } else if (formType === 'growth') {
        growthForm.style.display = 'block';
    } else if (formType === 'content') {
        contentForm.style.display = 'block';
    } else if (formType === 'consultation') {
        consultationForm.style.display = 'block';
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeForm() {
    const modal = document.getElementById('formModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('formModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeForm();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeForm();
    }
});

// Form Submission Handler
function handleSubmit(event, formType) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Collect checkbox values
    const checkboxes = event.target.querySelectorAll('input[type="checkbox"]:checked');
    const checkboxValues = Array.from(checkboxes).map(cb => cb.value);
    if (checkboxValues.length > 0) {
        data.selectedServices = checkboxValues;
    }

    // Log form data (in production, send to backend)
    console.log(`${formType} Form Submitted:`, data);

    // Show success message
    showSuccessMessage(formType);

    // Reset form
    event.target.reset();

    // Close modal after delay
    setTimeout(() => {
        closeForm();
    }, 2500);
}

function showSuccessMessage(formType) {
    const messages = {
        clarity: 'Thank you! I\'ll review your request and get back to you within 24 hours to schedule your clarity session.',
        growth: 'Application received! I\'ll review your details and reach out within 48 hours to discuss next steps.',
        content: 'Thank you for your interest! I\'ll be in touch soon to discuss your content needs.',
        consultation: 'Consultation request received! I\'ll analyze your LinkedIn profile and send you a detailed review within 48 hours.'
    };

    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #2563EB, #7C3AED);
        color: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        font-weight: 600;
        font-size: 1.05rem;
        box-shadow: 0 20px 50px rgba(37, 99, 235, 0.4);
        z-index: 10000;
        max-width: 500px;
        text-align: center;
        animation: slideUp 0.4s ease;
        line-height: 1.6;
    `;
    successDiv.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
        ${messages[formType] || 'Form submitted successfully! I\'ll be in touch soon.'}
    `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 3500);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe offering cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.offering-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe testimonial
    const testimonial = document.querySelector('.testimonial');
    if (testimonial) {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(30px)';
        testimonial.style.transition = 'all 0.6s ease';
        observer.observe(testimonial);
    }
});

// Add parallax effect to hero background
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground && scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Form validation enhancement
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#EF4444';
                field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';

                setTimeout(() => {
                    field.style.borderColor = '';
                    field.style.boxShadow = '';
                }, 2000);
            }
        });

        if (!isValid) {
            e.preventDefault();
            showErrorMessage('Please fill in all required fields');
        }
    });

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value.trim()) {
                this.style.borderColor = '#10B981';
            }
        });

        input.addEventListener('focus', function () {
            this.style.borderColor = '';
        });
    });
});

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #EF4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    errorDiv.textContent = message;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Preload images
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// Add smooth hover effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});
