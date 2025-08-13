 // Scroll Progress Indicator
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('scrollIndicator').style.width = scrolled + '%';
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animated counter for stats
        const observerOptions = {
            threshold: 0.7
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animate numbers
                    const numberElement = entry.target.querySelector('.stat-number');
                    if (numberElement) {
                        const target = parseInt(numberElement.dataset.target);
                        let current = 0;
                        const increment = target / 100;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            numberElement.textContent = Math.ceil(current) + (target === 98 ? '%' : '+');
                        }, 20);
                    }
                }
            });
        }, observerOptions);

        // Observe stat items
        document.querySelectorAll('.stat-item').forEach(item => {
            observer.observe(item);
        });

        // Add scroll effect to navbar
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const navbar = document.getElementById('navbar');
            
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
            
            lastScrollTop = scrollTop;
        });

        // Add hover effect to feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add particle effect on button click
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.left = (e.clientX - rect.left) + 'px';
                particle.style.top = (e.clientY - rect.top) + 'px';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.background = 'white';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                particle.style.animation = 'particle-explosion 0.5s ease-out forwards';
                
                this.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 500);
            });
        });

        // Add CSS for particle animation
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes particle-explosion {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(20);
                }
            }
        `;
        document.head.appendChild(particleStyle);

        // Add typing effect to hero title (optional enhancement)
        function addTypingEffect() {
            const title = document.querySelector('.hero h1');
            const text = title.textContent;
            title.textContent = '';
            title.style.borderRight = '2px solid #6366f1';
            
            let i = 0;
            const timer = setInterval(() => {
                title.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(timer);
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        }

        // Uncomment the line below if you want the typing effect
        // addTypingEffect();

        // Add mobile menu functionality
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Enhanced scroll animations for feature cards
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            cardObserver.observe(card);
        });