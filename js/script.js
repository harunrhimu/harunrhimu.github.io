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

// Existing code for portfolio carousel (if any) - KEEP THIS PART
// Make sure this part is also included if it was present in your original script.js
// For example:
// const arrowRight = document.querySelectorAll('.portfolio-box .navigation .arrow-right');
// const arrowLeft = document.querySelectorAll('.portfolio-box .navigation .arrow-left');
// let index = 0;
// const activePortfolio = () =>{
//     const imgSlide = document.querySelectorAll('.portfolio-carousel .img-slide');
//     const portfolioDetails = document.querySelectorAll('.portfolio-detail');
//     imgSlide.style.transform = `translateX(calc(${index * -100}% -${index *2}rem))`;
//     portfolioDetails.forEach(detail =>{
//         detail.classList.remove('active');
//     })
//     portfolioDetails[index].classList.add('active')
// }
// arrowRight.addEventListener('click', () => {
//     if(index < imgSlide.length -1){
//         index++;
//         activePortfolio();
//     }
// });
// arrowLeft.addEventListener('click', () => {
//     if(index > 0){
//         index--;
//         activePortfolio();
//     }
// });