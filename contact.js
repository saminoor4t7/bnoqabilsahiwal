// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name') || '',
                email: formData.get('email') || '',
                message: formData.get('message') || ''
            };
            
            // Simple validation
            if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showMessage('Sending your message...', 'info');
            
            setTimeout(() => {
                showMessage('Thank you for your message! We will contact you soon.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Add styles
        const styles = `
            .form-message {
                padding: 15px;
                margin: 15px 0;
                border-radius: 5px;
                font-weight: 600;
                text-align: center;
            }
            
            .form-message.success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .form-message.error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            .form-message.info {
                background-color: #d1ecf1;
                color: #0c5460;
                border: 1px solid #bee5eb;
            }
        `;
        
        // Add styles if not already added
        if (!document.getElementById('form-message-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'form-message-styles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        }
        
        // Insert message
        const form = document.getElementById('contact-form');
        form.insertBefore(messageElement, form.firstChild);
        
        // Auto remove success messages
        if (type === 'success') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
}