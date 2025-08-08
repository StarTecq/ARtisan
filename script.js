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
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailInput.classList.add('form-error');
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        emailInput.classList.remove('form-error');
        const submitBtn = notifyForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing Up...';
        submitBtn.disabled = true;
        try {
            
            const formspreeEndpoint = 'https://formspree.io/f/mkgzpeyl'; 
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                showMessage(`Thank you! We'll notify ${email} when we launch.`, 'success');
                emailInput.value = '';
            } else {
                showMessage('Something went wrong. Please try again later.', 'error');
            }
        } catch (error) {
            showMessage('Something went wrong. Please try again later.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    
    emailInput.addEventListener('input', () => {
        emailInput.classList.remove('form-error');
        if (formMessage.textContent.includes('Please enter a valid email')) {
            formMessage.textContent = '';
        }
    });

    
    function showMessage(message, type = 'success') {
        formMessage.textContent = message;
        formMessage.className = `mt-4 h-5 ${type === 'error' ? 'text-red-600' : 'text-green-600'}`;
        
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'mt-4 text-green-600 h-5';
        }, 5000);
    }

    
    
});
