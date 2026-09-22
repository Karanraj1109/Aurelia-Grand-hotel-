document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. PRELOADER
    ========================================= */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800); // Gives time for the brand animation to complete
    });

    /* =========================================
       2. NAVBAR SCROLL & MOBILE MENU
    ========================================= */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu nav a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* =========================================
       3. PARALLAX EFFECT FOR HERO & FEATURES
    ========================================= */
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        let scroll = window.scrollY;
        requestAnimationFrame(() => {
            parallaxBgs.forEach(bg => {
                // Adjust parallax speed (0.4)
                let yPos = scroll * 0.4;
                bg.style.transform = `translateY(${yPos}px)`;
            });
        });
    });

    /* =========================================
       4. SCROLL REVEAL (INTERSECTION OBSERVER)
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       5. EXPERIENCES TABS LOGIC
    ========================================= */
    const expData = [
        {
            title: "Private Spa Ritual",
            desc: "Experience ancient healing techniques passed down through generations, utilizing organic botanicals harvested directly from our gardens.",
            img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Sunrise Yoga",
            desc: "Greet the day with a guided flow in our open-air bamboo pavilion, perfectly positioned to catch the first light over the valley.",
            img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Jungle Dining",
            desc: "A private gastronomic journey set beneath the stars. Enjoy a bespoke menu crafted by our executive chef, surrounded by the sounds of the forest.",
            img: "https://images.unsplash.com/photo-1533142278061-0570b548b8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Balinese Ceremony",
            desc: "Participate in an authentic water purification ritual (Melukat) at our temple, guided by a local Pemangku (priest).",
            img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Sunset Cocktails",
            desc: "Sip on artisanal mixology featuring local spirits and exotic fruits while watching the sky transform into vibrant shades of orange and purple.",
            img: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    const expBtns = document.querySelectorAll('.exp-btn');
    const expTitle = document.getElementById('exp-title');
    const expDesc = document.getElementById('exp-desc');
    const expImg = document.getElementById('exp-img');
    const expContentArea = document.querySelector('.exp-content-area');

    expBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            expBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            // Fade out
            expContentArea.style.opacity = '0';
            
            setTimeout(() => {
                const data = expData[btn.dataset.index];
                expTitle.textContent = data.title;
                expDesc.textContent = data.desc;
                expImg.src = data.img;
                
                // Fade in
                expContentArea.style.opacity = '1';
            }, 300); // Matches CSS transition duration
        });
    });

    /* =========================================
       6. GALLERY LIGHTBOX
    ========================================= */
    const galleryImgs = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const nextBtn = document.querySelector('.lightbox-next');
    const prevBtn = document.querySelector('.lightbox-prev');
    
    let currentImgIndex = 0;

    // Open Lightbox
    galleryImgs.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImgIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    const updateLightboxImage = () => {
        // Swap out the small image url for a larger quality if desired, here we just use the same
        lightboxImg.src = galleryImgs[currentImgIndex].src;
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const nextImage = () => {
        currentImgIndex = (currentImgIndex + 1) % galleryImgs.length;
        updateLightboxImage();
    };

    const prevImage = () => {
        currentImgIndex = (currentImgIndex - 1 + galleryImgs.length) % galleryImgs.length;
        updateLightboxImage();
    };

    // Listeners
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    /* =========================================
       7. TESTIMONIAL CAROUSEL
    ========================================= */
    const slides = document.querySelectorAll('.testim-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let index = (currentSlide + 1) % slides.length;
        showSlide(index);
    };

    // Auto rotate
    const startSlideShow = () => {
        slideInterval = setInterval(nextSlide, 6000);
    };

    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); // reset timer on manual click
            showSlide(index);
            startSlideShow();
        });
    });

    startSlideShow();

});
