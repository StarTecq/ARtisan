document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const notifyForm = document.getElementById('notify-form');
    const formMessage = document.getElementById('form-message');
    const emailInput = document.getElementById('email-input');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    notifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailInput.classList.add('form-error');
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Remove error styling if email is valid
        emailInput.classList.remove('form-error');

        // Show loading state
        const submitBtn = notifyForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing Up...';
        submitBtn.disabled = true;

        try {
            // Here you would normally send to your backend/email service
            // For now, we'll simulate an API call
            await simulateEmailSignup(email);
            
            showMessage(`Thank you! We'll notify ${email} when we launch.`, 'success');
            emailInput.value = '';
            
            // Store email in localStorage for demo purposes
            const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('subscribers', JSON.stringify(subscribers));
            }
            
        } catch (error) {
            showMessage('Something went wrong. Please try again later.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Clear error styling when user starts typing
    emailInput.addEventListener('input', () => {
        emailInput.classList.remove('form-error');
        if (formMessage.textContent.includes('Please enter a valid email')) {
            formMessage.textContent = '';
        }
    });

    // Helper function to show messages with different styles
    function showMessage(message, type = 'success') {
        formMessage.textContent = message;
        formMessage.className = `mt-4 h-5 ${type === 'error' ? 'text-red-600' : 'text-green-600'}`;
        
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'mt-4 text-green-600 h-5';
        }, 5000);
    }

    // Simulate API call to email service
    async function simulateEmailSignup(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate occasional failures for demo
                if (Math.random() > 0.9) {
                    reject(new Error('Network error'));
                } else {
                    resolve({ success: true, email });
                }
            }, 1000);
        });
    }
});
