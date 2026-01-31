 // ===== DOM Elements =====
        const header = document.getElementById('header');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const typewriterText = document.getElementById('typewriter');
        const scrollTopBtn = document.getElementById('scrollTop');
        const stat1 = document.getElementById('stat1');
        const stat2 = document.getElementById('stat2');
        const stat3 = document.getElementById('stat3');
        const templatesGrid = document.getElementById('templatesGrid');
        const newsletterSubmit = document.getElementById('newsletterSubmit');
        const newsletterEmail = document.getElementById('newsletterEmail');
        const designCanvas = document.getElementById('designCanvas');
        const previewLogo = document.getElementById('previewLogo');
        const previewName = document.getElementById('previewName');
        const previewTitle = document.getElementById('previewTitle');
        const previewPhone = document.getElementById('previewPhone');
        const previewEmail = document.getElementById('previewEmail');

        // ===== Enhanced Typewriter Effect =====
        const cardTypes = [
            "Business Cards",
            "Wedding Invitations",
            "Birthday Cards",
            "Corporate Stationery",
            "Event Tickets",
            "Holiday Greetings",
            "Thank You Cards",
            "Premium Invitations"
        ];

        let currentTypeIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeWriter() {
            const currentText = cardTypes[currentTypeIndex];

            if (isDeleting) {
                typewriterText.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                typewriterText.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && currentCharIndex === currentText.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTypeIndex = (currentTypeIndex + 1) % cardTypes.length;
                typingSpeed = 500;
            }

            setTimeout(typeWriter, typingSpeed);
        }

        // ===== Counter Animation =====
        function animateCounter(element, target, duration, suffix = '') {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + suffix;
                }
            }, 16);
        }

        // ===== Template Data & Rendering =====
        const templates = [
            { id: 1, category: 'business', name: 'Modern Executive', price: '$49', rating: 4.9, premium: true, description: 'Sleek professional design for corporate leaders' },
            { id: 2, category: 'personal', name: 'Elegant Celebration', price: '$29', rating: 4.7, premium: false, description: 'Beautiful design for special occasions' },
            { id: 3, category: 'event', name: 'Luxury Wedding Suite', price: '$129', rating: 5.0, premium: true, description: 'Complete wedding invitation package' },
            { id: 4, category: 'creative', name: 'Artistic Portfolio', price: '$39', rating: 4.8, premium: false, description: 'Creative design for artists and designers' },
            { id: 5, category: 'business', name: 'Startup Innovator', price: '$45', rating: 4.6, premium: false, description: 'Modern design for tech startups' },
            { id: 6, category: 'personal', name: 'Minimalist Personal', price: '$25', rating: 4.5, premium: false, description: 'Clean and simple personal card' },
            { id: 7, category: 'event', name: 'Corporate Gala', price: '$89', rating: 4.9, premium: true, description: 'Elegant design for corporate events' },
            { id: 8, category: 'creative', name: 'Photographer Portfolio', price: '$59', rating: 4.7, premium: true, description: 'Showcase for photography professionals' }
        ];

        const templateImages = [
            'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1556740738-6ebd604924b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        ];

        function renderTemplates(filter = 'all') {
            templatesGrid.innerHTML = '';
            const filteredTemplates = filter === 'all'
                ? templates
                : templates.filter(t => t.category === filter);

            filteredTemplates.forEach((template, index) => {
                const templateCard = document.createElement('div');
                templateCard.className = `gallery-item animate-fade-up delay-${(index % 4) + 1}`;

                templateCard.innerHTML = `
                    ${template.premium ? '<div class="gallery-item-badge">PREMIUM</div>' : ''}
                    <div class="gallery-preview">
                        <img src="${templateImages[template.id - 1]}" alt="${template.name}" class="template-img" loading="lazy">
                    </div>
                    <div class="gallery-info">
                        <h4>${template.name}</h4>
                        <p>${template.description}</p>
                        <div class="gallery-meta">
                            <div style="font-weight:700;color:var(--primary);font-size:1.2rem;">${template.price}</div>
                            <div style="display:flex;align-items:center;gap:5px;color:var(--warning);">
                                <i class="fas fa-star"></i>
                                <span>${template.rating}</span>
                            </div>
                        </div>
                        <button class="btn btn-outline" style="width:100%;margin-top:15px;" onclick="previewTemplate(${template.id})">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                    </div>
                `;

                templatesGrid.appendChild(templateCard);
            });
        }

        // ===== Interactive Preview Functions =====
        function previewTemplate(templateId) {
            const template = templates.find(t => t.id === templateId);
            if (!template) return;

            const categoryImages = {
                'business': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                'personal': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                'event': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                'creative': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            };

            designCanvas.style.backgroundImage = `url('${categoryImages[template.category] || categoryImages.business}')`;

            // Set logo icon based on category
            const logoIcons = {
                'business': 'fas fa-briefcase',
                'personal': 'fas fa-user-circle',
                'event': 'fas fa-calendar-alt',
                'creative': 'fas fa-paint-brush'
            };

            previewLogo.innerHTML = `<i class="${logoIcons[template.category] || 'fas fa-star'}"></i>`;
            previewLogo.style.background = 'rgba(99, 102, 241, 0.9)';

            // Animate the preview
            designCanvas.style.transform = 'scale(1.05)';
            designCanvas.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
            setTimeout(() => {
                designCanvas.style.transform = 'scale(1)';
                designCanvas.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            }, 300);

            showNotification(`Now previewing: ${template.name}`);
        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--gradient-primary);
                color: white;
                padding: 15px 25px;
                border-radius: var(--border-radius);
                box-shadow: var(--glass-shadow);
                z-index: 10000;
                animation: slideIn 0.3s ease;
                font-weight: 600;
            `;

            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // ===== Interactive Design Preview =====
        function initDesignPreview() {
            const names = ['Alex Morgan', 'Sarah Johnson', 'Michael Chen', 'Emma Wilson'];
            const titles = [
                'Creative Director<br>Digital Solutions Inc.',
                'Senior Developer<br>Tech Innovations LLC',
                'Marketing Specialist<br>Creative Minds Agency',
                'Event Planner<br>Luxury Events Worldwide'
            ];
            const phones = ['+1 (555) 123-4567', '+1 (555) 987-6543', '+1 (555) 456-7890', '+1 (555) 234-5678'];
            const emails = ['alex@digitalsolutions.com', 'sarah@luxuryevents.com', 'michael@techinnovations.com', 'emma@creativeminds.com'];
            const logoIcons = ['fas fa-briefcase', 'fas fa-code', 'fas fa-paint-brush', 'fas fa-calendar-alt'];
            const colors = ['rgba(99, 102, 241, 0.9)', 'rgba(16, 185, 129, 0.9)', 'rgba(245, 158, 11, 0.9)', 'rgba(236, 72, 153, 0.9)'];

            const professionalImages = [
                'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            ];

            let currentIndex = 0;

            function updatePreview() {
                currentIndex = (currentIndex + 1) % names.length;

                designCanvas.style.backgroundImage = `url('${professionalImages[currentIndex]}')`;

                previewLogo.innerHTML = `<i class="${logoIcons[currentIndex]}"></i>`;
                previewLogo.style.background = colors[currentIndex];
                previewName.textContent = names[currentIndex];
                previewTitle.innerHTML = titles[currentIndex];
                previewPhone.textContent = phones[currentIndex];
                previewEmail.textContent = emails[currentIndex];

                designCanvas.style.opacity = '0.8';
                designCanvas.style.transform = 'scale(1.02)';

                setTimeout(() => {
                    designCanvas.style.opacity = '1';
                    designCanvas.style.transform = 'scale(1)';
                }, 300);
            }

            // Initial setup
            updatePreview();

            // Rotate preview content every 5 seconds
            setInterval(updatePreview, 5000);
        }

        // ===== Header Scroll Effect =====
        function initHeaderScroll() {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                if (window.scrollY > 500) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });
        }

        // ===== Mobile Menu =====
        function initMobileMenu() {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });

            document.addEventListener('click', (e) => {
                if (mobileMenu.classList.contains('active') &&
                    !mobileMenu.contains(e.target) &&
                    !mobileMenuBtn.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }

        // ===== Smooth Scrolling =====
        function initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // ===== Template Filtering =====
        function initTemplateFiltering() {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');

                    const filter = e.target.dataset.filter;
                    renderTemplates(filter);
                });
            });
        }

        // ===== Gallery Navigation =====
        function initGalleryNavigation() {
            document.getElementById('prevTemplate').addEventListener('click', () => {
                const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
                const filteredTemplates = currentFilter === 'all'
                    ? templates
                    : templates.filter(t => t.category === currentFilter);

                const last = filteredTemplates.pop();
                filteredTemplates.unshift(last);

                renderTemplates(currentFilter);
            });

            document.getElementById('nextTemplate').addEventListener('click', () => {
                const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
                const filteredTemplates = currentFilter === 'all'
                    ? templates
                    : templates.filter(t => t.category === currentFilter);

                const first = filteredTemplates.shift();
                filteredTemplates.push(first);

                renderTemplates(currentFilter);
            });
        }

        // ===== Newsletter Form =====
        function initNewsletter() {
            newsletterSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                const email = newsletterEmail.value.trim();

                if (validateEmail(email)) {
                    const originalContent = newsletterSubmit.innerHTML;
                    newsletterSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                    setTimeout(() => {
                        newsletterSubmit.innerHTML = '<i class="fas fa-check"></i>';
                        newsletterSubmit.style.background = 'var(--secondary)';
                        showNotification('Thank you for subscribing! Check your email for confirmation.');
                        newsletterEmail.value = '';

                        setTimeout(() => {
                            newsletterSubmit.innerHTML = originalContent;
                            newsletterSubmit.style.background = '';
                        }, 2000);
                    }, 1500);
                } else {
                    showNotification('Please enter a valid email address.');
                    newsletterEmail.focus();
                }
            });
        }

        // ===== Form Validation =====
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // ===== Animated Stats =====
        function initAnimatedStats() {
            setTimeout(() => {
                animateCounter(stat1, 12543, 2000);
                animateCounter(stat2, 8920, 2000);
                animateCounter(stat3, 567, 2000);
            }, 1000);

            setTimeout(() => {
                animateCounter(document.getElementById('totalUsers'), 15420, 2000);
                animateCounter(document.getElementById('cardsCreated'), 89256, 2000);
                animateCounter(document.getElementById('countries'), 89, 2000);
                animateCounter(document.getElementById('satisfaction'), 98, 2000, '%');
            }, 2500);
        }

        // ===== Card Showcase Hover Animation =====
        function initCardShowcaseAnimation() {
            const showcase = document.querySelector('.card-showcase');
            const cards = document.querySelectorAll('.showcase-card');

            showcase.addEventListener('mouseenter', () => {
                cards.forEach(card => {
                    card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            });

            showcase.addEventListener('mouseleave', () => {
                cards.forEach(card => {
                    card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            });
        }

        // ===== Initialize Everything =====
        document.addEventListener('DOMContentLoaded', () => {
            // Start typewriter effect
            setTimeout(typeWriter, 1000);

            // Initialize all systems
            initHeaderScroll();
            initMobileMenu();
            initSmoothScroll();
            initTemplateFiltering();
            initGalleryNavigation();
            initNewsletter();
            initDesignPreview();
            initAnimatedStats();
            initCardShowcaseAnimation();

            // Render initial content
            renderTemplates();

            // Add intersection observer for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-up');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.feature-card, .pricing-card, .stat-item, .testimonial-card, .gallery-item').forEach(el => {
                observer.observe(el);
            });

            // Add keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.key === '/' && !e.target.matches('input, textarea')) {
                    e.preventDefault();
                    document.getElementById('templates').scrollIntoView({ behavior: 'smooth' });
                }

                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // ===== Window Resize Handler =====
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });