// Donation functionality
function initDonation() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const donateNowBtn = document.getElementById('donate-now-btn');
    let selectedAmount = 0;
    
    // Handle amount button clicks
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            if (this.dataset.amount === 'custom') {
                customAmountInput.style.display = 'block';
                customAmountInput.focus();
                selectedAmount = 0;
            } else {
                customAmountInput.style.display = 'none';
                selectedAmount = parseInt(this.dataset.amount);
                updateDonateButton(selectedAmount);
            }
        });
    });
    
    // Handle custom amount input
    customAmountInput.addEventListener('input', function() {
        selectedAmount = parseInt(this.value) || 0;
        if (selectedAmount >= 100) {
            updateDonateButton(selectedAmount);
        }
    });
    
    // Handle donate button click
    donateNowBtn.addEventListener('click', function() {
        if (selectedAmount < 100) {
            alert('Minimum donation amount is ₹100');
            return;
        }
        
        const donationData = {
            amount: selectedAmount,
            timestamp: new Date().toISOString()
        };
        
        processDonation(donationData);
    });
    
    function updateDonateButton(amount) {
        donateNowBtn.innerHTML = `<i class="fas fa-heart"></i> Donate ₹${amount.toLocaleString()}`;
    }
    
    function processDonation(data) {
        // In a real application, this would connect to a payment gateway
        // For now, we'll show a confirmation message
        
        const modalHTML = `
            <div class="donation-modal">
                <div class="modal-content">
                    <h3>Thank You for Your Donation!</h3>
                    <p>You are donating: <strong>₹${data.amount.toLocaleString()}</strong></p>
                    <p>Your contribution will help us serve humanity better.</p>
                    <p>You will be redirected to our secure payment gateway...</p>
                    <div class="modal-buttons">
                        <button class="btn btn-secondary" id="cancel-donation">Cancel</button>
                        <button class="btn btn-primary" id="confirm-donation">Proceed to Payment</button>
                    </div>
                </div>
            </div>
        `;
        
        // Create and show modal
        const modal = document.createElement('div');
        modal.innerHTML = modalHTML;
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .donation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            }
            
            .donation-modal .modal-content {
                background: white;
                padding: 30px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                text-align: center;
            }
            
            .donation-modal h3 {
                color: var(--primary);
                margin-bottom: 20px;
            }
            
            .donation-modal p {
                margin-bottom: 15px;
                color: var(--dark);
            }
            
            .modal-buttons {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 25px;
            }
        `;
        document.head.appendChild(style);
        
        // Handle modal buttons
        document.getElementById('cancel-donation').addEventListener('click', function() {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        document.getElementById('confirm-donation').addEventListener('click', function() {
            alert(`Payment gateway integration would be here. Donation amount: ₹${data.amount}`);
            document.body.removeChild(modal);
            document.head.removeChild(style);
            
            // Reset donation form
            amountButtons.forEach(btn => btn.classList.remove('active'));
            customAmountInput.style.display = 'none';
            customAmountInput.value = '';
            selectedAmount = 0;
            donateNowBtn.innerHTML = '<i class="fas fa-heart"></i> Donate Now';
        });
    }
}