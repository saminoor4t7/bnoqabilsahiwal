// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    loadHeader();
    
    // Load services
    loadServices();
    
    // Load footer
    loadFooter();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize donation system
    initDonation();
    
    // Initialize contact form
    initContactForm();
});

function loadHeader() {
    const topHeader = document.getElementById('top-header');
    const mainHeader = document.getElementById('main-header');
    
    topHeader.innerHTML = `
        <div class="container">
            <div class="contact-info">
                <span><i class="fas fa-phone-alt"></i> +92 40 111 111 111</span>
                <span><i class="fas fa-envelope"></i> info@alkhidmatsahiwal.org</span>
                <span><i class="fas fa-map-marker-alt"></i> Sahiwal, Pakistan</span>
            </div>
            <div class="social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
        </div>
    `;
    
    mainHeader.innerHTML = `
        <div class="container">
            <div class="header-content">
                <div class="logo-container">
                    <div class="logo">
                        <i class="fas fa-hands-helping"></i>
                    </div>
                    <div class="logo-text">
                        <h1>Alkhidmat <span>Sahiwal</span></h1>
                        <p>Serving Humanity | Serving Pakistan</p>
                    </div>
                </div>
                
                <button class="mobile-menu-btn" id="mobile-menu-btn">
                    <i class="fas fa-bars"></i>
                </button>
                
                <nav class="main-nav" id="main-nav">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#donate">Donate</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#about">About Us</a></li>
                        <a href="#donate" class="btn nav-btn">Donate Now</a>
                    </ul>
                </nav>
            </div>
        </div>
    `;
}

function loadServices() {
    const services = [
        {
            icon: 'fas fa-hospital',
            title: 'Healthcare Services',
            description: 'Free medical camps, ambulance services, and healthcare facilities for the underprivileged communities in Sahiwal district.'
        },
        {
            icon: 'fas fa-graduation-cap',
            title: 'Education & Orphan Care',
            description: 'Educational support, scholarships, and orphan sponsorship programs to ensure every child has access to quality education.'
        },
        {
            icon: 'fas fa-hands-helping',
            title: 'Emergency Relief',
            description: 'Quick response and relief operations during natural disasters, floods, and emergencies in Sahiwal region.'
        },
        {
            icon: 'fas fa-tint',
            title: 'Clean Water Projects',
            description: 'Installation of water filtration plants and provision of clean drinking water to communities in need.'
        },
        {
            icon: 'fas fa-utensils',
            title: 'Food Distribution',
            description: 'Regular food distribution drives and Ramadan ration packages for impoverished families in Sahiwal.'
        },
        {
            icon: 'fas fa-home',
            title: 'Community Development',
            description: 'Skill development programs, vocational training, and sustainable community development initiatives.'
        }
    ];
    
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <div class="service-content">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <a href="#" class="service-btn">
                    Learn More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');
}

function loadFooter() {
    const footer = document.getElementById('main-footer');
    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <h3>Alkhidmat <span>Sahiwal</span></h3>
                    <p>A chapter of Alkhidmat Foundation Pakistan, serving humanity in Sahiwal district since 1990.</p>
                    <div class="footer-social">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Our Services</a></li>
                        <li><a href="#donate">Donate</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Volunteer</a></li>
                    </ul>
                </div>
                
                <div class="footer-contact">
                    <h4>Contact Info</h4>
                    <p><i class="fas fa-map-marker-alt"></i> Main Office: Civil Lines, Sahiwal, Pakistan</p>
                    <p><i class="fas fa-phone-alt"></i> +92 40 111 111 111</p>
                    <p><i class="fas fa-envelope"></i> info@alkhidmatsahiwal.org</p>
                    <p><i class="fas fa-clock"></i> Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
            </div>
            
            <div class="copyright">
                <p>&copy; ${new Date().getFullYear()} Alkhidmat Sahiwal. All Rights Reserved.</p>
                <p>A chapter of Alkhidmat Foundation Pakistan</p>
            </div>
        </div>
    `;
    // In scripts/main.js - update the loadFooter function
function loadFooter() {
    const footer = document.getElementById('main-footer');
    footer.innerHTML = `
        <!-- ... existing footer content ... -->
        
        <div class="footer-leadership">
            <div class="container">
                <div class="leadership-info">
                    <h4>Patron-in-Chief</h4>
                    <p>Hafiz Naeem ur Rehman <small>(Ameer, Jamaat-e-Islami Pakistan)</small></p>
                    
                    <h4>Chairman - Alkhidmat Sahiwal</h4>
                    <p>Mr. Tayyab Mehmood Baloch</p>
                    
                    <div class="leadership-note">
                        <p><i class="fas fa-handshake"></i> Under the dedicated leadership of Mr. Tayyab Mehmood Baloch</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
}