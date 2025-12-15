// scripts/leadership.js
class LeadershipManager {
    constructor() {
        this.init();
    }

    init() {
        this.initChairmanPhoto();
        this.initMessageModal();
        this.initScheduleButtons();
        this.initContactButtons();
    }

    initChairmanPhoto() {
        const chairmanPhoto = document.querySelector('.chairman-photo');
        if (!chairmanPhoto) return;

        // Click to enlarge photo
        chairmanPhoto.addEventListener('click', () => {
            this.enlargePhoto(chairmanPhoto.src);
        });

        // Add Facebook badge if not already present
        const photoContainer = chairmanPhoto.parentElement;
        if (!photoContainer.querySelector('.facebook-badge')) {
            const facebookBadge = document.createElement('div');
            facebookBadge.className = 'facebook-badge';
            facebookBadge.innerHTML = '<i class="fab fa-facebook"></i> Follow';
            photoContainer.appendChild(facebookBadge);
        }

        // Handle image loading errors
        chairmanPhoto.addEventListener('error', () => {
            this.handleImageError(chairmanPhoto);
        });
    }

    initMessageModal() {
        const messageBtn = document.querySelector('.view-message-btn');
        if (messageBtn) {
            messageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showChairmanMessage();
            });
        }
    }

    initScheduleButtons() {
        // Handle buttons with onclick attribute
        const scheduleBtns = document.querySelectorAll('.schedule-meeting-btn, .btn-primary[onclick*="showScheduleForm"], .btn[onclick*="scheduleMeeting"]');
        scheduleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showScheduleForm();
            });
        });
    }

    initContactButtons() {
        const contactBtn = document.querySelector('a[href="#contact"]');
        if (contactBtn && contactBtn.textContent.includes('Contact Chairman')) {
            contactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToContactForm();
            });
        }
    }

    handleImageError(imgElement) {
        // Create canvas fallback image
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, 400, 400);
        gradient.addColorStop(0, '#0056A4');
        gradient.addColorStop(1, '#003366');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
        
        // Draw initials
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 100px Montserrat, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('TM', 200, 200);
        
        // Add decorative circle
        ctx.beginPath();
        ctx.arc(200, 200, 150, 0, Math.PI * 2);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#FF6B00';
        ctx.stroke();
        
        // Replace broken image with canvas
        imgElement.src = canvas.toDataURL();
        imgElement.style.objectFit = 'cover';
    }

    enlargePhoto(photoUrl) {
        // Create modal HTML
        const modalHTML = `
            <div class="photo-modal" id="photo-modal">
                <div class="photo-modal-content">
                    <span class="close-photo">&times;</span>
                    <img src="${photoUrl}" alt="Tayyab Mehmood Baloch - Chairman Alkhidmat Sahiwal">
                    <div class="photo-caption">
                        <h4>Tayyab Mehmood Baloch</h4>
                        <p>Chairman, Alkhidmat Foundation Sahiwal</p>
                        <a href="https://www.facebook.com/TayyabBaloch.swl" target="_blank" class="btn-facebook">
                            <i class="fab fa-facebook"></i> View Facebook Profile
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add modal styles
        this.addModalStyles();
        
        // Setup modal functionality
        this.setupPhotoModal();
    }

    addModalStyles() {
        if (document.getElementById('modal-styles')) return;

        const styles = `
            .photo-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3000;
                opacity: 0;
                animation: fadeIn 0.3s forwards;
            }

            @keyframes fadeIn {
                to { opacity: 1; }
            }

            .photo-modal-content {
                max-width: 90%;
                max-height: 90%;
                position: relative;
            }

            .photo-modal img {
                max-width: 100%;
                max-height: 90vh;
                border-radius: 10px;
                display: block;
            }

            .close-photo {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
                background: rgba(0,0,0,0.5);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s;
            }

            .close-photo:hover {
                background: rgba(0,0,0,0.8);
            }

            .photo-caption {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 15px;
                text-align: center;
                border-radius: 0 0 10px 10px;
            }

            .photo-caption h4 {
                margin: 0 0 5px;
                font-size: 18px;
            }

            .photo-caption p {
                margin: 0 0 10px;
                font-size: 14px;
                opacity: 0.9;
            }

            .btn-facebook {
                display: inline-block;
                background: #4267B2;
                color: white;
                padding: 8px 15px;
                border-radius: 5px;
                text-decoration: none;
                font-size: 14px;
                transition: background 0.3s;
            }

            .btn-facebook:hover {
                background: #365899;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.id = 'modal-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    setupPhotoModal() {
        const modal = document.getElementById('photo-modal');
        if (!modal) return;

        const closeBtn = modal.querySelector('.close-photo');
        
        // Close on X click
        closeBtn.addEventListener('click', () => {
            this.closeModal(modal);
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
            }
        });
    }

    closeModal(modal) {
        modal.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    showChairmanMessage() {
        const modalHTML = `
            <div class="message-modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>Message from Chairman</h3>
                    <div class="modal-message">
                        <p>Dear valued supporters,</p>
                        <p>As Chairman of Alkhidmat Sahiwal, I'm committed to transparency and accessibility. 
                           Feel free to reach out with any questions or suggestions about our humanitarian work.</p>
                        <p><strong>Tayyab Mehmood Baloch</strong></p>
                        <p><em>Chairman, Alkhidmat Foundation Sahiwal</em></p>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add message modal styles
        this.addMessageModalStyles();
        this.setupMessageModal();
    }

    addMessageModalStyles() {
        const styles = `
            .message-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3000;
            }
            
            .message-modal .modal-content {
                background: white;
                padding: 40px;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                position: relative;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            
            .message-modal h3 {
                color: #0056A4;
                margin-bottom: 20px;
                font-size: 28px;
            }
            
            .modal-message {
                line-height: 1.8;
                color: #333;
            }
            
            .modal-message p {
                margin-bottom: 15px;
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 28px;
                cursor: pointer;
                color: #666;
                transition: color 0.3s;
            }
            
            .close-modal:hover {
                color: #FF6B00;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
        
        // Store reference to remove later
        this.messageModalStyles = styleElement;
    }

    setupMessageModal() {
        const modal = document.querySelector('.message-modal');
        const closeBtn = modal.querySelector('.close-modal');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
            if (this.messageModalStyles) {
                this.messageModalStyles.remove();
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                if (this.messageModalStyles) {
                    this.messageModalStyles.remove();
                }
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal) {
                modal.remove();
                if (this.messageModalStyles) {
                    this.messageModalStyles.remove();
                }
            }
        });
    }

    scrollToContactForm() {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        window.scrollTo({
            top: contactSection.offsetTop - 100,
            behavior: 'smooth'
        });

        // Add highlight animation
        const form = contactSection.querySelector('form');
        if (form) {
            form.classList.add('highlight');
            setTimeout(() => {
                form.classList.remove('highlight');
            }, 2000);
        }
    }

    showScheduleForm() {
        const today = new Date().toISOString().split('T')[0];
        
        const formHTML = `
            <div class="schedule-modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3><i class="fas fa-calendar-alt"></i> Schedule Meeting with Chairman</h3>
                    <p>Request a meeting with Mr. Tayyab Mehmood Baloch</p>
                    
                    <form id="meeting-form" class="meeting-form">
                        <div class="form-group">
                            <label for="meeting-name">Your Name *</label>
                            <input type="text" id="meeting-name" required placeholder="Enter your full name">
                        </div>
                        
                        <div class="form-group">
                            <label for="meeting-email">Your Email *</label>
                            <input type="email" id="meeting-email" required placeholder="Enter your email">
                        </div>
                        
                        <div class="form-group">
                            <label for="meeting-phone">Your Phone *</label>
                            <input type="tel" id="meeting-phone" required placeholder="Enter your phone number">
                        </div>
                        
                        <div class="form-group">
                            <label for="meeting-org">Organization</label>
                            <input type="text" id="meeting-org" placeholder="Your organization (if any)">
                        </div>
                        
                        <div class="form-group">
                            <label for="meeting-purpose">Purpose of Meeting *</label>
                            <select id="meeting-purpose" required>
                                <option value="">Select purpose</option>
                                <option value="donation">Large Donation</option>
                                <option value="partnership">Partnership/Collaboration</option>
                                <option value="volunteer">Volunteer Program</option>
                                <option value="project">Project Discussion</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="meeting-date">Preferred Date</label>
                            <input type="date" id="meeting-date" min="${today}">
                        </div>
                        
                        <div class="form-group">
                            <label for="meeting-message">Message</label>
                            <textarea id="meeting-message" rows="4" placeholder="Briefly describe what you'd like to discuss"></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-paper-plane"></i> Submit Request
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', formHTML);
        
        // Add schedule modal styles
        this.addScheduleModalStyles();
        this.setupScheduleModal();
    }

    addScheduleModalStyles() {
        const styles = `
            .schedule-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 4000;
            }
            
            .schedule-modal .modal-content {
                background: white;
                padding: 30px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            }
            
            .schedule-modal h3 {
                color: #0056A4;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .schedule-modal h3 i {
                color: #FF6B00;
            }
            
            .meeting-form {
                margin-top: 20px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
                color: #333;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-family: 'Open Sans', sans-serif;
                font-size: 16px;
            }
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #0056A4;
            }
            
            @keyframes highlight {
                0% { box-shadow: 0 0 0 0 rgba(255, 107, 0, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(255, 107, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 107, 0, 0); }
            }
            
            .highlight {
                animation: highlight 2s;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
        
        // Store reference to remove later
        this.scheduleModalStyles = styleElement;
    }

    setupScheduleModal() {
        const modal = document.querySelector('.schedule-modal');
        const form = document.getElementById('meeting-form');
        const closeBtn = modal.querySelector('.close-modal');
        
        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitMeetingRequest(form);
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            this.closeScheduleModal();
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeScheduleModal();
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal) {
                this.closeScheduleModal();
            }
        });
    }

    submitMeetingRequest(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Here you would typically send data to a server
        console.log('Meeting request data:', data);
        
        // Show success message
        alert('Thank you! Your meeting request has been submitted. We will contact you soon.');
        
        // Close modal
        this.closeScheduleModal();
    }

    closeScheduleModal() {
        const modal = document.querySelector('.schedule-modal');
        if (modal) {
            modal.remove();
        }
        if (this.scheduleModalStyles) {
            this.scheduleModalStyles.remove();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LeadershipManager();
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeadershipManager;
}