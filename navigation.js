// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-btn')) {
            mainNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for #home
            if (href === '#home') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    mainNav.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    
                    // Scroll to element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.getElementById('main-header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.padding = '15px 0';
        }
    });
}