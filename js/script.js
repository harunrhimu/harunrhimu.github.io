// Function to handle smooth scrolling and active link update on click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor jump

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Smooth scroll to the target section, adjusting for a fixed header/navigation bar (80px offset)
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update active class for the clicked navigation link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Highlight active section in navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section'); // Select all section elements
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Determine the current section based on scroll position, considering a fixed header offset
        if (pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active class for the navigation link corresponding to the current section
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Existing code for resume section buttons - KEEP THIS PART
const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idex) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idex].classList.add('active');
    });
});


// নিউ পার্ট

document.addEventListener('DOMContentLoaded', function() {
    const serviceBoxes = document.querySelectorAll('.services-box');
    
    // Close popup functionality
    function closePopup(popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Open popup on service box click (but not on close button or popup content)
    serviceBoxes.forEach((box) => {
        box.addEventListener('click', function(e) {
            // Don't open popup if clicking on close button or inside popup content
            if (e.target.classList.contains('popup-close') || 
                e.target.closest('.popup-content') || 
                e.target.closest('.popup-btn')) {
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            const popup = box.querySelector('.service-popup');
            if (popup) {
                popup.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Handle all close button clicks using event delegation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('popup-close')) {
            e.preventDefault();
            e.stopPropagation();
            const popup = e.target.closest('.service-popup');
            if (popup) {
                closePopup(popup);
            }
        }
    });
    
    // Close popup when clicking on popup background (outside content)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('service-popup')) {
            closePopup(e.target);
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activePopup = document.querySelector('.service-popup.active');
            if (activePopup) {
                closePopup(activePopup);
            }
        }
    });
    
    // Handle quote button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('popup-btn')) {
            e.preventDefault();
            e.stopPropagation();
            
            const popup = e.target.closest('.service-popup');
            const serviceName = popup.closest('.services-box').querySelector('h3').textContent;
            
            // Close popup first
            closePopup(popup);
            
            // Scroll to contact section
            setTimeout(() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Pre-fill subject field if it exists
                    setTimeout(() => {
                        const subjectField = document.querySelector('input[placeholder="email subject"]');
                        if (subjectField) {
                            subjectField.value = `Quote Request: ${serviceName}`;
                        }
                    }, 1000);
                }
            }, 100);
        }
    });
});
