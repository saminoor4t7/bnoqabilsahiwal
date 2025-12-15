// scripts/leadership-photo.js
function loadChairmanPhoto() {
    const container = document.getElementById('chairman-photo-container');
    if (!container) return;
    
    // Create image element
    const img = document.createElement('img');
    img.alt = 'Tayyab Mehmood Baloch - Chairman Alkhidmat Sahiwal';
    img.className = 'chairman-photo';
    
    // Try to load from Facebook Graph API (this might not work due to privacy settings)
    const facebookUrl = 'https://graph.facebook.com/TayyabBaloch.swl/picture?type=large&redirect=true';
    
    // Try to load image
    const testImage = new Image();
    
    testImage.onload = function() {
        // If Facebook image loads successfully
        img.src = facebookUrl;
        container.innerHTML = '';
        container.appendChild(img);
        addPhotoFeatures(img);
    };
    
    testImage.onerror = function() {
        // Facebook image failed, use fallback
        createFallbackImage(container);
    };
    
    testImage.src = facebookUrl;
}

function createFallbackImage(container) {
    // Create a nice fallback with initials
    const fallbackHTML = `
        <div class="fallback-image">
            <div class="initials">TM</div>
            <div class="fallback-text">Tayyab Mehmood Baloch</div>
        </div>
    `;
    
    container.innerHTML = fallbackHTML;
    
    // Add fallback styles
    const style = document.createElement('style');
    style.textContent = `
        .fallback-image {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0056A4 0%, #003366 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
        }
        
        .initials {
            font-size: 80px;
            font-weight: bold;
            font-family: 'Montserrat', sans-serif;
            margin-bottom: 15px;
        }
        
        .fallback-text {
            font-size: 16px;
            opacity: 0.9;
            max-width: 80%;
            line-height: 1.4;
        }
    `;
    
    document.head.appendChild(style);
}

function addPhotoFeatures(img) {
    // Add click to enlarge
    img.addEventListener('click', function() {
        enlargePhoto(this.src);
    });
    
    // Add Facebook badge
    const badge = document.createElement('div');
    badge.className = 'photo-badge';
    badge.innerHTML = '<i class="fab fa-facebook"></i>';
    img.parentElement.appendChild(badge);
    
    // Add badge styles
    const badgeStyle = document.createElement('style');
    badgeStyle.textContent = `
        .photo-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(66, 103, 178, 0.9);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            cursor: pointer;
            z-index: 10;
            transition: transform 0.3s;
        }
        
        .photo-badge:hover {
            transform: scale(1.1);
        }
        
        .photo-badge a {
            color: white;
            text-decoration: none;
        }
    `;
    document.head.appendChild(badgeStyle);
    
    // Make badge clickable
    badge.addEventListener('click', function(e) {
        e.stopPropagation();
        window.open('https://www.facebook.com/TayyabBaloch.swl', '_blank');
    });
}

function enlargePhoto(photoUrl) {
    const modalHTML = `
        <div class="enlarge-modal" id="enlarge-modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${photoUrl}" alt="Tayyab Mehmood Baloch">
                <div class="modal-caption">
                    <h4>Tayyab Mehmood Baloch</h4>
                    <p>Chairman, Alkhidmat Foundation Sahiwal</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .enlarge-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }
        
        .enlarge-modal .modal-content {
            max-width: 90%;
            max-height: 90%;
            position: relative;
        }
        
        .enlarge-modal img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
            display: block;
        }
        
        .close-modal {
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
        }
        
        .modal-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 0 0 10px 10px;
        }
        
        .modal-caption h4 {
            margin: 0;
            font-size: 18px;
        }
        
        .modal-caption p {
            margin: 5px 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Setup modal functionality
    const modal = document.getElementById('enlarge-modal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', function() {
        modal.remove();
        modalStyle.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
            modalStyle.remove();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal) {
            modal.remove();
            modalStyle.remove();
        }
    });
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', loadChairmanPhoto);